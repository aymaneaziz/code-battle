import { Loading } from "@/components/common/Loading";
import api from "@/service/GlobalApi";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { ProfileHeader } from "./components/ProfileHeader";
import { StatsGrid } from "./components/StatsGrid";
import { CombatStatsTable } from "./components/CombatStatsTable";
import { BadgesSection } from "./components/BadgesSection";
import { Skeleton } from "@/components/ui/skeleton";

export const PlayerProfile = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(true);

  // CORRECTION 1 : Utilisation de [ ] au lieu de { } pour useState
  const [profileData, setProfileData] = useState({
    username: "",
    displayName: "",
    location: "",
    bio: "",
    selectedAvatar: null, // Correspond au schema
    unlockedAvatars: [],
    preferences: {
      // Nom corrigé pour correspondre au schema et au map plus bas
      language: [],
      battlePreference: "",
      codingExperience: "",
    },
    badgesPlayer: [],
    stats: { elo: 400, level: 1 }, // Valeurs par défaut pour éviter undefined.stats
    hasAggreedToTerms: false,
  });

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const token = await getToken();

        const data = await api.get("/data/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfileData(data);
      } catch (err) {
        console.error("Failed to load profile data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user, getToken]);

  if (loading || !profileData.username) return <Loading />;

  return (
    <div className=" bg-slate-50 text-slate-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <ProfileHeader
          identity={{
            username: profileData.username,
            displayName: profileData.displayName,
            bio: profileData.bio,
            location: profileData.location,
            avatar: profileData.selectedAvatar,
          }}
          rankInfo={{
            elo: profileData.stats?.elo,
            level: profileData.stats?.level,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StatsGrid stats={profileData.stats} />
            <CombatStatsTable stats={profileData.stats} />
          </div>

          <div className="space-y-6">
            <BadgesSection badges={profileData.badgesPlayer} />

            {/* Section Preferred Stack épurée */}
            <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Preferred Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.preferences?.language?.map((lang) => (
                  <span
                    key={lang._id}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200"
                  >
                    {lang.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
