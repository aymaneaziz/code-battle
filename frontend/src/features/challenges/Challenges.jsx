import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import ChallengeFilters from "./components/ChallengeFilters.jsx";
import ChallengeList from "./components/ChallengeList.jsx";
import DailyChallengeWidget from "./components/DailyChallengeWidget.jsx";
import MyProgressWidget from "./components/MyProgressWidget.jsx";
import { fetchChallenges } from "./services/challengeApi";
import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";

const Challenges = () => {
  const { getToken } = useAuth();

  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    difficulty: "All",
    status: "All",
    search: "",
  });

  useEffect(() => {
    const loadChallenges = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const data = await fetchChallenges(filters, token);

        setChallenges(data);
      } catch (error) {
        console.error("Error loading challenges");
      } finally {
        setLoading(false);
      }
    };

    loadChallenges();
  }, [filters, getToken]);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 p-6 md:p-8 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Challenge Vault
        </h1>
        <Button
          variant="outline"
          className="gap-2 font-semibold shadow-sm cursor-pointer"
        >
          <Dices className="w-4 h-4" />
          Random Challenge
        </Button>
      </div>

      {/* Filters */}
      <ChallengeFilters filters={filters} setFilters={setFilters} />

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <ChallengeList challenges={challenges} loading={loading} />
        </div>

        <div className="flex flex-col gap-6">
          <DailyChallengeWidget />
          <MyProgressWidget />
        </div>
      </div>
    </div>
  );
};

export default Challenges;
