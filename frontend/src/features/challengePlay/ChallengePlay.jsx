import React, { useEffect, useState } from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { fetchChallengeDetails } from "./services/challengeApi";
import { Loading } from "@/components/common/Loading";

import HeaderPanel from "./components/HeaderPanel";
import EditorPanel from "./components/EditorPanel";
import TestCasesPanel from "./components/TestCasesPanel";
import ProblemPanel from "./components/ProblemPanel";
// Import ExecutionPanel if you want to toggle it with TestCases
import ExecutionPanel from "./components/ExecutionPanel";
import { SUPPORTED_LANGUAGES } from "./services/languages";

const ChallengePlay = () => {
  const { challengeId } = useParams();
  const { getToken } = useAuth();
  const location = useLocation();

  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [languageId, setLanguageId] = useState(63); // Default: JS
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [loading, setLoading] = useState(false);

  if (!location.state?.fromVault) return <Navigate to="/challenges" replace />;

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = await getToken();
        const data = await fetchChallengeDetails(challengeId, token);
        console.log(data);
        setChallenge(data);
        const visibleTestCases = (data.problemId.testCases || []).filter(
          (tc) => !tc.isHidden,
        );
        setTestCases(visibleTestCases);
      } catch (err) {
        console.error("Error loading challenge:", err);
      }
    };
    loadData();
  }, [challengeId, getToken]);

  // SMART STARTER CODE SYNC WITH FALLBACK
  useEffect(() => {
    // Make sure the challenge and problemId exist before trying to read them
    if (challenge?.problemId) {
      const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === languageId);

      // Map the current language to the exact keys used in your DB ("javascript", "python")
      // Assuming your SUPPORTED_LANGUAGES has a 'label' or 'starterKey' that matches the DB.
      const dbKey =
        currentLang?.starterKey ||
        currentLang?.label?.toLowerCase() ||
        "javascript";

      // Safely access: challenge.problemId.starterCode["javascript"]
      const fetchedStarterCode = challenge.problemId.starterCode?.[dbKey];

      if (fetchedStarterCode) {
        // If it exists in the DB, use it directly (handles the \n formatting automatically)
        setCode(fetchedStarterCode);
      } else {
        // Fallback: Generate a clean comment block if it's missing from the DB
        const hashComments = ["python", "ruby", "bash", "elixir"];
        const isHashComment = hashComments.includes(dbKey);
        const prefix = isHashComment ? "#" : "//";

        setCode(
          `${prefix} No starter code provided in DB for ${currentLang?.name || dbKey}.\n${prefix} Write your logic here...\n\n`,
        );
      }
    }
  }, [languageId, challenge]);

  if (!challenge) return <Loading />;

  return (
    // FIX: Using h-[100dvh] for mobile browsers and overflow-y-auto on mobile
    <div className="flex flex-col lg:flex-row h-dvh bg-slate-50 lg:overflow-hidden overflow-y-auto">
      {/* LEFT: Editor & Console */}
      {/* FIX: min-h-[800px] ensures it doesn't squash on mobile when stacked */}
      <div className="flex flex-col lg:flex-1 p-4 lg:p-6 lg:pr-3 gap-4 lg:min-h-0 min-h-200 w-full">
        {/* Editor Container */}
        <div className="flex-3 min-h-100 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <HeaderPanel
            languageId={languageId}
            setLanguageId={setLanguageId}
            theme={theme}
            setTheme={setTheme}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
          <EditorPanel
            code={code}
            setCode={setCode}
            languageId={languageId}
            theme={theme}
            fontSize={fontSize}
          />
        </div>

        {/* Console Container */}
        <div className="h-75 lg:flex-1 min-h-62.5 shrink-0">
          <TestCasesPanel
            testCases={testCases}
            setTestCases={setTestCases}
            onRun={() => {}}
            onSubmit={() => {}}
            loading={loading}
          />
        </div>
      </div>

      {/* RIGHT: Problem Panel */}
      {/* FIX: Let it take full width on mobile, and fixed width on desktop */}
      <div className="w-full lg:w-112.5 flex-none p-4 lg:p-6 lg:pl-3 lg:overflow-y-auto bg-white lg:bg-transparent min-h-100 border-t lg:border-t-0 border-slate-200">
        <ProblemPanel challenge={challenge} />
      </div>
    </div>
  );
};

export default ChallengePlay;
