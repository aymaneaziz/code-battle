import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";

import wsClient from "@/service/wsClient";
import { SUPPORTED_LANGUAGES } from "../challengePlay/services/languages";
import { estimateComplexity } from "../challengePlay/services/estimateComplexity";

import { MatchHeader } from "./components/MatchHeader";
import { MatchResultModal } from "./components/MatchResultModal";
import { SurrenderButton } from "./components/SurrenderButton";
import PlayerCardMatch from "./components/PlayerCardMatch";
import HeaderPanel from "../challengePlay/components/HeaderPanel";
import EditorPanel from "../challengePlay/components/EditorPanel";
import ProblemPanelMatch from "./components/ProblemPanelMatch";
import TestCasesPanel from "../challengePlay/components/TestCasesPanel";
import ExecutionPanel from "../challengePlay/components/ExecutionPanel";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMatchTimer } from "@/hooks/useMatchTimer";
import { useMatchState } from "@/hooks/useMatchState";
import { Flame } from "lucide-react";

export const Match = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ── Data from navigation state (set by VsScreen) ─────────────────────────
  const { opponentId, opponent, you, problem } = location.state ?? {};
  const userId = you?.userId;

  // ── Editor state ──────────────────────────────────────────────────────────
  const [code, setCode] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [languageId, setLanguageId] = useState(null);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [activeRightTab, setActiveRightTab] = useState("problem");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Surrender refs ────────────────────────────────────────────────────────
  const hasSurrenderedRef = useRef(false);
  const matchEndedRef = useRef(false);

  // ── Live match state ──────────────────────────────────────────────
  const { myHp, opponentHp, myCombo, submitResults, matchResult } =
    useMatchState(userId, opponentId);

  // ── Timer ─────────────────────────────────────────────────────────────────────
  const matchDurationMs = problem?.timeArenaS * 1000 ?? 45 * 60 * 1000;
  const { minutes, seconds } = useMatchTimer(
    matchDurationMs,
    matchId,
    userId,
    !!userId && !!matchId
  );

  // ── Editor stats ─────────────────────────────────────────────────────────
  const lineCount = code ? code.split("\n").length : 0;
  const complexity = estimateComplexity(code);

  // ── When submit results arrive  ───────────────────────────
  useEffect(() => {
    if (submitResults) {
      setActiveRightTab("execution");
      setIsSubmitting(false);
    }
  }, [submitResults]);

  // ──  When match ends  ─────────────────────────────
  useEffect(() => {
    if (matchResult) {
      matchEndedRef.current = true;
    }
  }, [matchResult]);

  // ── Problem init ───────────────────────────────────────────────
  useEffect(() => {
    if (!problem) {
      navigate("/");
      toast.error("No problem data. Returning to home.");
      return;
    }
    setTestCases((problem.testCases ?? []).filter((tc) => !tc.isHidden));

    const starterKeys = Object.keys(problem.starterCode ?? {});
    const langs = SUPPORTED_LANGUAGES.filter((l) =>
      starterKeys.includes(l.starterKey)
    );
    setAvailableLanguages(langs);
    if (langs.length > 0) setLanguageId(langs[0].id);
  }, [problem, navigate]);

  // ── Starter code sync  ─────────────────────────────────
  useEffect(() => {
    if (!problem || languageId === null) return;
    const lang = SUPPORTED_LANGUAGES.find((l) => l.id === languageId);
    const dbKey = lang?.starterKey ?? "javascript";
    const starter = problem.starterCode?.[dbKey];
    setCode(
      starter
        ? starter
        : `// No starter code for ${lang?.name}.\n// Write your solution here.\n`
    );
  }, [languageId, problem]);

  // ── Navigation blocking  ───────────────────────────────────
  useEffect(() => {
    if (!userId || !opponentId) return;

    window.history.pushState(null, null, window.location.pathname);

    const handleBeforeUnload = (e) => {
      if (!matchEndedRef.current && !hasSurrenderedRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    const handlePopState = () => {
      if (matchEndedRef.current) return;
      const confirmed = window.confirm(
        "Leaving now counts as a surrender. Proceed?"
      );
      if (confirmed) {
        doSurrender();
      } else {
        window.history.pushState(null, null, window.location.pathname);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [matchId, userId, opponentId]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const doSurrender = () => {
    hasSurrenderedRef.current = true;
    wsClient.send({ type: "SURRENDER", matchId, userId, opponentId });
  };

  //Send code via WebSocket instead of REST to track Hp etc..
  const handleRun = (isSubmit = false) => {
    if (!code || languageId === null) return;
    setIsSubmitting(true);

    wsClient.send({
      type: "SUBMIT_CODE",
      matchId,
      userId,
      code,
      languageId,
      isSubmit,
    });
  };

  const handleResultModalClose = () => {
    navigate("/", { replace: true });
  };

  if (!problem) return null;

  return (
    <>
      {/* Match result modal — handles win, loss, draw */}
      <MatchResultModal
        open={!!matchResult}
        result={matchResult}
        onClose={handleResultModalClose}
      />

      <div className="h-screen w-full bg-slate-50 flex flex-col overflow-hidden">
        {/* ── TOP ARENA HEADER ── */}
        <MatchHeader
          you={you}
          opponent={opponent}
          myHp={myHp}
          opponentHp={opponentHp}
          myCombo={myCombo}
          minutes={minutes}
          seconds={seconds}
          problem={problem}
        />

        {/* ── BOTTOM BATTLE AREA ── */}
        <div className="flex-1 flex flex-col lg:flex-row p-4 gap-4 min-h-0">
          {/* ── Left: Editor ─────────────────────────────────────────────── */}
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

          {/* ── Right: Problem / Test Cases / Results ─────────────────────── */}
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

                <TabsContent
                  value="problem"
                  className="flex-1 m-0 p-0 outline-none overflow-y-auto data-[state=inactive]:hidden"
                >
                  <div className="p-4">
                    <ProblemPanelMatch problem={problem} />
                  </div>
                </TabsContent>

                <TabsContent
                  value="testcases"
                  className="flex-1 m-0 p-0 outline-none overflow-y-auto data-[state=inactive]:hidden"
                >
                  <TestCasesPanel
                    testCases={testCases}
                    setTestCases={setTestCases}
                    onRun={() => handleRun(false)}
                    onSubmit={() => handleRun(true)}
                    loading={isSubmitting}
                  />
                </TabsContent>

                <TabsContent
                  value="execution"
                  className="flex-1 m-0 p-0 outline-none overflow-y-auto data-[state=inactive]:hidden"
                >
                  <ExecutionPanel
                    results={submitResults}
                    onRun={() => handleRun(false)}
                    onSubmit={() => handleRun(true)}
                    loading={isSubmitting}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* ── Bottom: Streak + Surrender ─────────────────────────────── */}
            <div className="shrink-0 flex items-center justify-between bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Flame className="h-6 w-6 text-orange-500 fill-orange-500" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                    Your current streak
                  </span>
                  <span className="text-xl font-black text-orange-600">
                    ×{you?.stats?.currentStreak ?? 0}
                  </span>
                </div>
              </div>

              <SurrenderButton onSurrender={doSurrender} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
