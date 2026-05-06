import React from "react";
import Editor from "@monaco-editor/react";
import { SUPPORTED_LANGUAGES } from "../services/languages";

const EditorPanel = ({ code, setCode, languageId, theme, fontSize }) => {
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === languageId);

  return (
    <div className="flex-1 w-full bg-white overflow-hidden relative">
      <Editor
        height="100%"
        width="100%"
        theme={theme}
        language={currentLang?.label || "javascript"}
        value={code}
        onChange={(val) => setCode(val || "")}
        options={{
          fontSize: fontSize,
          minimap: { enabled: false },
          fontFamily: "'Fira Code', monospace",
          scrollBeyondLastLine: false,
          automaticLayout: true, // Crucial for responsiveness
          padding: { top: 16, bottom: 16 },
          wordWrap: "on", // Helps on mobile so long lines don't require horizontal scrolling
        }}
      />
    </div>
  );
};

export default EditorPanel;
