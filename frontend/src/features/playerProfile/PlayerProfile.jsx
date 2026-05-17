import { Loading } from "@/components/common/Loading";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Pencil, Save, Shield } from "lucide-react";

import { ProfileHeader } from "./components/ProfileHeader";
import { StatsGrid } from "./components/StatsGrid";
import { CombatStatsTable } from "./components/CombatStatsTable";
import { BadgesSection } from "./components/BadgesSection";
import { EditingSection } from "./components/EditingSection";
import { AddFriendDialog } from "./components/AddFriendDialog";
import { PreferredStack } from "./components/PreferredStack";
import { MatchHistorySection } from "./components/MatchHistorySection";

import { fetchProfile, updateProfile } from "./services/profileApi";
import MyProgressWidget from "../challenges/components/MyProgressWidget";

export const PlayerProfile = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const [formData, setFormData] = useState({
    displayName: "",
    location: "",
    bio: "",
    selectedAvatar: "",
  });

  const loadProfile = async () => {
    try {
      const token = await getToken();
      const data = await fetchProfile(token);
      setProfileData(data);
      setFormData({
        displayName: data.displayName || "",
        location: data.location || "",
        bio: data.bio || "",
        selectedAvatar: data.selectedAvatar?._id || "",
      });
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadProfile();
  }, [user, getToken]);

  const handleUpdate = async () => {
    try {
      setIsSubmitting(true);
      const token = await getToken();
      await updateProfile(formData, token);
      await loadProfile();

      setIsEditing(false);
      toast.success("Profile updated!");
    } catch {
      toast.error("Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !profileData) return <Loading />;

  const currentXp = profileData.stats?.xp ?? 0;
  const xpNeeded = profileData.level?.maxXp ?? 1;
  const xpPercentage = Math.min(100, (currentXp / xpNeeded) * 100);
  console.log(profileData);
  return (
    <div className="text-slate-900 bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="mx-auto space-y-6">
        {/* Actions Header */}
        <div className="flex justify-between items-center">
          <AddFriendDialog />
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="bg-white cursor-pointer"
              >
                <Pencil className="h-4 w-4 mr-2" /> Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="ghost"
                  disabled={isSubmitting}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                  className="bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                  disabled={isSubmitting}
                >
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Profile / Edit */}
        {isEditing ? (
          <EditingSection
            formData={formData}
            setFormData={setFormData}
            unlockedAvatars={profileData.unlockedAvatars}
          />
        ) : (
          <ProfileHeader
            identity={{
              userId: profileData.userId,
              username: profileData.username,
              displayName: profileData.displayName,
              bio: profileData.bio,
              location: profileData.location,
              avatar: profileData.selectedAvatar,
              createdAt: profileData.createdAt,
            }}
            rankInfo={{
              elo: profileData.stats?.elo,
              rank: profileData.rank,
              level: profileData.stats?.level,
              globalRank: profileData.stats?.globalRank,
            }}
          />
        )}

        {/* XP Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-slate-800">
            <div className="flex items-center gap-1 text-blue-600 font-bold text-[10px] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              <Shield size={14} strokeWidth={2.5} /> LVL{" "}
              {profileData.level?.levelNumber || 1}
            </div>
            <span>
              {currentXp} / {xpNeeded} XP
            </span>
            <span>LVL {(profileData.level?.levelNumber ?? 1) + 1}</span>
          </div>
          <Progress value={xpPercentage} className="h-2 bg-slate-100" />
        </div>

        {/* Stats + Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column Section: Takes up 2 full columns */}
          <div className="lg:col-span-2 space-y-6">
            <StatsGrid stats={profileData.stats} />

            {/* Combat Stats now spans beautifully across the whole left zone */}
            <CombatStatsTable stats={profileData.stats} />
          </div>

          {/* Right Column Section: Badges, Preferred Stack, and My Progress */}
          <div className="space-y-6 flex flex-col">
            <BadgesSection badges={profileData.badgesPlayer} />

            <PreferredStack preferences={profileData.preferences} />

            {/* My Progress fits naturally right under the stack, filling the whitespace gap */}
            <MyProgressWidget />
          </div>
        </div>

        {/* ── Match History ── */}
        <MatchHistorySection />
      </div>
    </div>
  );
};
