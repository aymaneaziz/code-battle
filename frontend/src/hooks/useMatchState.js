import wsClient from "@/service/wsClient";
import { useEffect, useRef, useState } from "react";

export function useMatchState(userId, opponentId) {
  const [myHp, setMyHp] = useState(100);
  const [opponentHp, setOpponentHp] = useState(100);
  const [myCombo, setMyCombo] = useState(0);
  const [submitResults, setSubmitResults] = useState(null);
  const [matchResult, setMatchResult] = useState(null); // set when match ends

  // Track max combo seen (for XP display)
  const maxComboRef = useRef(0);

  useEffect(() => {
    if (!userId || !opponentId) return;

    const onHpUpdate = (data) => {
      const mine = data[userId];
      const opp = data[opponentId];
      if (mine) {
        setMyHp(mine.hp);
        setMyCombo(mine.combo);
        maxComboRef.current = Math.max(maxComboRef.current, mine.combo);
      }
      if (opp) setOpponentHp(opp.hp);
    };

    const onSubmitResult = (data) => {
      setSubmitResults(data.results);
    };

    const onMatchResult = (data) => {
      setMatchResult(data);
    };
    // HP_UPDATE    → { [userId]: { hp, combo }, [opponentId]: { hp, combo } }
    wsClient.on("HP_UPDATE", onHpUpdate);
    // SUBMIT_RESULT → { results, combo, damage, hp }
    wsClient.on("SUBMIT_RESULT", onSubmitResult);
    // MATCH_RESULT → { outcome, reason, eloDelta, newElo, xpEarned, xpBreakdown }
    wsClient.on("MATCH_RESULT", onMatchResult);

    return () => {
      wsClient.off("HP_UPDATE", onHpUpdate);
      wsClient.off("SUBMIT_RESULT", onSubmitResult);
      wsClient.off("MATCH_RESULT", onMatchResult);
    };
  }, [userId, opponentId]);

  return {
    myHp,
    opponentHp,
    myCombo,
    submitResults,
    matchResult,
    maxCombo: maxComboRef.current,
  };
}
