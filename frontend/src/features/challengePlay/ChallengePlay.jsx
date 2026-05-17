import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import {
  fetchChallengeDetails,
  runChallengeCode,
} from "./services/challengeApi";
import { Loading } from "@/components/common/Loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderPanel from "./components/HeaderPanel";
import EditorPanel from "./components/EditorPanel";
import TestCasesPanel from "./components/TestCasesPanel";
import ProblemPanel from "./components/ProblemPanel";
import ExecutionPanel from "./components/ExecutionPanel";
import { SUPPORTED_LANGUAGES } from "./services/languages";
import { estimateComplexity } from "./services/estimateComplexity";
import RewardModal from "./components/RewardModal";

const ChallengePlay = () => {
  const { challengeId } = useParams();
  const { getToken } = useAuth();

  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [languageId, setLanguageId] = useState(null);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeConsoleTab, setActiveConsoleTab] = useState("testcases");

  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [claimedRewards, setClaimedRewards] = useState({
    xp: 0,
    coins: 0,
    gems: 0,
  });

  // Derived code stats — updated on every code change
  const lineCount = code ? code.split("\n").length : 0;
  const complexity = estimateComplexity(code);

  // ── Load challenge ──────────────────────────────────────────────────────────
  useEffect(() => {
    const loadData = async () => {
      try {
        const token = await getToken();
        const data = await fetchChallengeDetails(challengeId, token);
        setChallenge(data);
        setTestCases(
          (data.problemId?.testCases ?? []).filter((tc) => !tc.isHidden),
        );

        const starterKeys = Object.keys(data.problemId?.starterCode ?? {});
        const langs = SUPPORTED_LANGUAGES.filter((l) =>
          starterKeys.includes(l.starterKey),
        );
        setAvailableLanguages(langs);
        if (langs.length > 0) setLanguageId(langs[0].id);
      } catch (err) {
        console.error("Error loading challenge:", err);
      }
    };
    loadData();
  }, [challengeId, getToken]);

  // ── Sync starter code ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!challenge?.problemId || languageId === null) return;
    const lang = SUPPORTED_LANGUAGES.find((l) => l.id === languageId);
    const dbKey = lang?.starterKey ?? "javascript";
    const starter = challenge.problemId.starterCode?.[dbKey];

    if (starter) {
      setCode(starter);
    } else {
      const prefix = ["python", "ruby", "bash", "elixir"].includes(dbKey)
        ? "#"
        : "//";
      setCode(
        `${prefix} No starter code for ${lang?.name ?? dbKey}.\n${prefix} Write your solution here.\n\n`,
      );
    }
  }, [languageId, challenge]);

  // ── Execute ─────────────────────────────────────────────────────────────────
  const handleRun = async (isSubmit = false) => {
    setLoading(true);
    try {
      const token = await getToken();

      // Separate seed cases from user-added custom cases
      const customCases = testCases.filter((tc) => tc.isCustom);

      const res = await runChallengeCode(
        {
          problemId: challenge.problemId._id,
          code,
          languageId,
          isSubmit,
          customCases,
        },
        token,
      );
      setResults(res.results);
      setActiveConsoleTab("execution");

      // Handle successful submissions
      if (isSubmit && res.allPassed) {
        setClaimedRewards({
          xp: res.rewards?.xp || challenge.xp || challenge.reward?.xp || 0,
          coins: res.rewards?.coins || challenge.reward?.coins || 0,
          gems: res.rewards?.gems || challenge.reward?.gems || 0,
        });
        setIsRewardModalOpen(true);
      }
    } catch (err) {
      console.error("Execution error:", err);
      alert("Error executing code: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!challenge) return <Loading />;

  return (
    <div className="flex flex-col lg:flex-row h-dvh bg-slate-50 lg:overflow-hidden overflow-y-auto">
      {/* ── Left: Editor + Console ──────────────────────────────────────────── */}

      <div className="flex flex-col lg:flex-1 p-4 lg:p-6 lg:pr-3 gap-4 lg:min-h-0 min-h-200 w-full">
        {/* Editor card */}
        <div className="flex-3 min-h-100 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
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

        {/* Console tabs  */}
        <Tabs
          value={activeConsoleTab}
          onValueChange={setActiveConsoleTab}
          className="flex flex-col gap-2 min-h-64 lg:flex-1"
        >
          <TabsList className="grid w-72 grid-cols-2 bg-slate-200/50 p-1 shrink-0">
            <TabsTrigger
              value="testcases"
              className="text-xs font-bold cursor-pointer data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
            >
              Test Cases
            </TabsTrigger>
            <TabsTrigger
              value="execution"
              className="text-xs font-bold cursor-pointer data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
            >
              Execution Results
            </TabsTrigger>
          </TabsList>

          {/* Card shell  */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
            {/* TestCases tab  */}
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

            {/* Execution tab */}
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
          </div>
        </Tabs>
      </div>

      {/* ── Right: Problem description ──────────────────────────────────────── */}
      <div className="w-full lg:w-112.5 flex-none p-4 lg:p-6 lg:pl-3 lg:overflow-y-auto bg-white lg:bg-transparent min-h-100 border-t lg:border-t-0 border-slate-200">
        <ProblemPanel challenge={challenge} />
      </div>
      <RewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        rewards={claimedRewards}
      />
    </div>
  );
};

export default ChallengePlay;
