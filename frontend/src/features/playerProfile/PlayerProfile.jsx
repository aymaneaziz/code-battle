import { Loading } from "@/components/common/Loading";
import api from "@/service/GlobalApi";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Pencil, Save, X } from "lucide-react";

import { ProfileHeader } from "./components/ProfileHeader";
import { StatsGrid } from "./components/StatsGrid";
import { CombatStatsTable } from "./components/CombatStatsTable";
import { BadgesSection } from "./components/BadgesSection";
import { EditingSection } from "./components/EditingSection";
import { AddFriendDialog } from "./components/AddFriendDialog";
import { PreferredStack } from "./components/PreferredStack";

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

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        const data = await api.get("/data/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(data);
        setProfileData(data);
        setFormData({
          displayName: data.displayName || "",
          location: data.location || "",
          bio: data.bio || "",
          selectedAvatar: data.selectedAvatar?._id || "",
        });
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user, getToken]);

  const handleUpdate = async () => {
    try {
      setIsSubmitting(true);
      const token = await getToken();

      await api.put("/data/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await api.get("/data/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfileData(data);
      setIsEditing(false);
      toast.success("Profile updated!");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !profileData) return <Loading />;

  // XP Progress Calculation
  const currentXp = profileData.stats?.xp;
  const xpNeeded = 500;
  const xpPercentage = (currentXp / xpNeeded) * 100;

  return (
    <div className=" text-slate-900 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
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
                  className={"cursor-pointer"}
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

        {/* Main Sections */}
        {isEditing ? (
          <EditingSection
            formData={formData}
            setFormData={setFormData}
            unlockedAvatars={profileData.unlockedAvatars}
          />
        ) : (
          <ProfileHeader
            identity={{
              username: profileData.username,
              displayName: profileData.displayName,
              bio: profileData.bio,
              location: profileData.location,
              avatar: profileData.selectedAvatar,
              createdAt: profileData.createdAt,
            }}
            rankInfo={{
              elo: profileData.stats?.elo,
              level: profileData.stats?.level,
            }}
          />
        )}
        {/* Barre d'XP  */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-slate-800">
            <span>LVL {profileData.stats?.level}</span>
            <span>
              {currentXp} / {xpNeeded} XP
            </span>
            <span>LVL {profileData.stats?.level + 1}</span>
          </div>
          <Progress value={xpPercentage} className="h-2 bg-slate-100" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StatsGrid stats={profileData.stats} />
            <CombatStatsTable stats={profileData.stats} />
          </div>
          <div className="space-y-6">
            <BadgesSection badges={profileData.badgesPlayer} />
            <PreferredStack preferences={profileData.preferences} />
          </div>
        </div>
      </div>
    </div>
  );
};
