import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Swords } from "lucide-react";
import { useUserId } from "@/hooks/useUserId";
import wsClient from "@/service/wsClient";
import { SurrenderButton } from "./components/SurrenderButton";
import { WinModal } from "./components/winModal";
import { estimateComplexity } from "../challengePlay/services/estimateComplexity";
import { toast } from "sonner";
import { SUPPORTED_LANGUAGES } from "../challengePlay/services/languages";
import { runChallengeCode } from "../challengePlay/services/challengeApi";
import { getToken } from "@clerk/react";
import PlayerCardMatch from "./components/PlayerCardMatch";
import HeaderPanel from "../challengePlay/components/HeaderPanel";
import EditorPanel from "../challengePlay/components/EditorPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestCasesPanel from "../challengePlay/components/TestCasesPanel";
import ExecutionPanel from "../challengePlay/components/ExecutionPanel";
import ProblemPanelMatch from "./components/ProblemPanelMatch";

export const Match = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { opponentId, opponent, you, problem } = location.state || {};
  const userId = you?.userId || useUserId();
  console.log("me", you);
  console.log("problem", problem);

  // ── Editor & Challenge State ──────────────────────────────────────
  const [code, setCode] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [languageId, setLanguageId] = useState(null);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeRightTab, setActiveRightTab] = useState("problem");

  const [showWinModal, setShowWinModal] = useState(false);
  //  Refs to track if the match has already ended, to prevent double-sending SURRENDER
  const hasSurrenderedRef = useRef(false);
  const matchEndedRef = useRef(false);

  // Derived code stats
  const lineCount = code ? code.split("\n").length : 0;
  const complexity = estimateComplexity(code);

  // ── Initialize Problem Data ───────────────────────────────────────
  useEffect(() => {
    if (!problem) {
      navigate("/");
      toast.error("No problem data found for this match. Returning to home.");
      return;
    }
    setTestCases((problem.testCases ?? []).filter((tc) => !tc.isHidden));

    const starterKeys = Object.keys(problem.starterCode ?? {});
    const langs = SUPPORTED_LANGUAGES.filter((l) =>
      starterKeys.includes(l.starterKey),
    );
    setAvailableLanguages(langs);

    if (langs.length > 0) {
      setLanguageId(langs[0].id);
    }
  }, [problem, navigate]);

  // Sync Starter Code when Language Changes
  useEffect(() => {
    if (!problem || languageId === null) return;
    const lang = SUPPORTED_LANGUAGES.find((l) => l.id === languageId);
    const dbKey = lang?.starterKey ?? "javascript";
    const starter = problem.starterCode?.[dbKey];

    if (starter) {
      setCode(starter);
    } else {
      setCode(
        `// No starter code for ${lang?.name}.\n// Write your solution here.\n`,
      );
    }
  }, [languageId, problem]);

  // ── Handle Match Events & Navigation Blocking ─────────────────────────────
  useEffect(() => {
    if (!userId || !opponentId) return;

    // Push a fake history entry so back button can be intercepted
    window.history.pushState(null, null, window.location.pathname);

    // Listen for Opponent surrendering
    const handleOpponentSurrendered = () => {
      matchEndedRef.current = true;
      setShowWinModal(true);
    };

    // Prevent accidental Tab Close / Refresh
    const handleBeforeUnload = (e) => {
      if (!matchEndedRef.current && !hasSurrenderedRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    // Prevent Back Button
    const handlePopState = () => {
      if (matchEndedRef.current) return;

      const confirmed = window.confirm(
        "Leaving now counts as a surrender. Proceed?",
      );
      if (confirmed) {
        handleSurrender();
      } else {
        window.history.pushState(null, null, window.location.pathname);
      }
    };

    wsClient.on("OPPONENT_SURRENDERED", handleOpponentSurrendered);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    // This runs if the user navigates away via React Router (links, URL change)
    return () => {
      wsClient.off("OPPONENT_SURRENDERED", handleOpponentSurrendered);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [matchId, userId, opponentId]);

  const handleSurrender = () => {
    hasSurrenderedRef.current = true; // Block cleanup from double-sending
    wsClient.send({ type: "SURRENDER", matchId, userId, opponentId });
    navigate("/", { replace: true });
  };

  const handleWinModalClose = () => {
    setShowWinModal(false);
    navigate("/", { replace: true });
  };

  const handleRun = async (isSubmit = false) => {
    setLoading(true);
    try {
      const token = await getToken();
      // Separate seed cases from user-added custom cases
      const customCases = testCases.filter((tc) => tc.isCustom);

      // run this in backend to analyse
      const res = await runChallengeCode(
        {
          problemId: problem._id,
          code,
          languageId,
          isSubmit,
          customCases,
        },
        token,
      );
      setResults(res);
      setActiveRightTab("execution");
    } catch (err) {
      console.error("Execution error:", err);
      alert("Error executing code: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  if (!problem) return null;
  return (
    <>
      {/* Victory popup for the player whose opponent surrendered */}
      <WinModal open={showWinModal} onClose={handleWinModalClose} />

      <div className="h-screen w-full bg-slate-50 flex flex-col overflow-hidden">
        {/* ── TOP ARENA HEADER  ── */}
        <div className="flex-none h-32 w-full flex items-center justify-between p-4 gap-4 border-b border-slate-200">
          <PlayerCardMatch user={you} />

          <div className="flex flex-col items-center justify-center shrink-0 w-48 text-center gap-2">
            <h2 className="text-3xl font-black text-slate-800 italic flex items-center gap-2">
              <Swords className="text-indigo-500" /> VS
            </h2>
            <div className="bg-white border border-slate-200 px-6 py-2 rounded-xl shadow-sm">
              <span className="text-xl font-mono font-bold text-slate-900">
                12:47
              </span>
            </div>
          </div>

          <PlayerCardMatch user={opponent} isOpponent />
        </div>

        {/* ── BOTTOM BATTLE AREA ── */}
        <div className="flex-1 flex flex-col lg:flex-row p-4 gap-4 min-h-0">
          {/* Left Side: Editor */}
          <div className="flex-2 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-0">
            <HeaderPanel
              languageId={languageId}
              setLanguageId={setLanguageId}
              availableLanguages={availableLanguages}
              theme={theme}
              setTheme={setTheme}
              fontSize={fontSize}
              setFontSize={setFontSize}
              lineCount={lineCount}
              complexity={complexity}
            />
            <EditorPanel
              code={code}
              setCode={setCode}
              languageId={languageId}
              theme={theme}
              fontSize={fontSize}
            />
          </div>

          {/* Right Side: Problem & Tests & Execution */}
          <div className="flex-1 flex flex-col gap-4 min-h-0">
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <Tabs
                value={activeRightTab}
                onValueChange={setActiveRightTab}
                className="flex flex-col flex-1 min-h-0"
              >
                <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 shrink-0 rounded-none border-b border-slate-200">
                  <TabsTrigger
                    value="problem"
                    className="text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm cursor-pointer"
                  >
                    Problem
                  </TabsTrigger>
                  <TabsTrigger
                    value="testcases"
                    className="text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm cursor-pointer"
                  >
                    Test Cases
                  </TabsTrigger>
                  <TabsTrigger
                    value="execution"
                    className="text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm cursor-pointer"
                  >
                    Results
                  </TabsTrigger>
                </TabsList>

                {/* Problem Tab */}
                <TabsContent
                  value="problem"
                  className="flex-1 m-0 p-0 outline-none overflow-y-auto data-[state=inactive]:hidden"
                >
                  <div className="p-4">
                    <ProblemPanelMatch problem={problem} />
                  </div>
                </TabsContent>

                {/* Test Cases Tab */}
                <TabsContent
                  value="testcases"
                  className="flex-1 m-0 p-0 outline-none overflow-y-auto data-[state=inactive]:hidden"
                >
                  <TestCasesPanel
                    testCases={testCases}
                    setTestCases={setTestCases}
                    onRun={() => handleRun(false)}
                    onSubmit={() => handleRun(true)}
                    loading={loading}
                  />
                </TabsContent>

                {/* Execution Tab */}
                <TabsContent
                  value="execution"
                  className="flex-1 m-0 p-0 outline-none overflow-y-auto data-[state=inactive]:hidden"
                >
                  <ExecutionPanel
                    results={results}
                    onRun={() => handleRun(false)}
                    onSubmit={() => handleRun(true)}
                    loading={loading}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Bottom Actions / Surrender */}
            <div className="shrink-0 flex items-center justify-between bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 shadow-md">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔥</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                    Streak
                  </span>
                  <span className="text-xl font-black text-orange-600">
                    x{you.stats.currentStreak}
                  </span>
                </div>
              </div>
              <SurrenderButton onSurrender={handleSurrender} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
