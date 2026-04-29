// src/features/playerSetup/PlayerSetup.jsx
import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import IdentitySection from "./components/IdentitySection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import api from "../../service/GlobalApi";

import BattlePreferencesSection from "./components/BattlePreferencesSection";
import AvatarSelectorSection from "./components/AvatarSelectorSection";
import CodingProfileSection from "./components/CodingProfileSection";

export const PlayerSetup = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate(); // bach nredirectiw

  // state dyal formulaire
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    location: "",
    bio: "",
    avatarId: "",
    languageId: [],
    preferenceId: "",
    experienceId: "",

    hasAggreedToTerms: false,
  });

  // options li kayjibo mn backend
  const [options, setOptions] = useState({
    avatars: [],
    battlePreferences: [],
    codingExperiences: [],
    languages: [],
  });

  useEffect(() => {
    if (!user) return;

    const initializeData = async () => {
      try {
        const token = await getToken();

        // appel API bach njibo data
        const { data } = await api.get("/data/setup", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOptions(data);

        // remplissage par défaut
        setFormData((prev) => ({
          ...prev,
          username: user?.username || user?.fullName || "",
          displayName: user?.firstName || "",
          avatarId: data.avatars[0]?.avatarId || "",
          preferenceId: data.battlePreferences[0]?.preferenceId || "",
          experienceId: data.codingExperiences[0]?.experienceId || "",
          languageId: data.languages[0]?.languageId || "",
        }));
      } catch (err) {
        console.error("Failed to load setup data", err);
      }
    };

    initializeData();
  }, [user, getToken]);

  // fonction katupdate ayi champ
  const updateForm = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // inputs classique
  const handleInputChange = (e) => {
    updateForm(e.target.name, e.target.value);
  };

  // submit setup
  const onSubmit = (e) => {
    e.preventDefault();

    // hna normalement tsift data l backend
    console.log("Final Submission:", formData);

    // redirect l home
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-5 px-4 md:px-8">
      <div className="w-full ">
        {/* max-w-6xl bach tkhlih mytjbdch */}
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/*Avatar Section */}
          <Card className="lg:col-span-4 p-6 bg-white border-gray-200 shadow-lg h-fit">
            <AvatarSelectorSection
              avatars={options.avatars}
              selectedId={formData.avatarId}
              onSelect={updateForm}
            />
          </Card>

          <div className="lg:col-span-8 space-y-6">
            {/* Right: Form */}
            <Card className="p-6 bg-blue-50/50 border-blue-200">
              <p className="text-sm text-blue-700">
                Your credentials are encrypted by <b>Clerk</b>. Fill your{" "}
                <b>Game Identity</b>.
              </p>
            </Card>

            <Card className="p-8 bg-white border-gray-200 shadow-xl">
              <div className="space-y-10">
                <IdentitySection
                  formData={formData}
                  handleChange={handleInputChange}
                />

                <CodingProfileSection
                  languages={options.languages}
                  experiences={options.codingExperiences}
                  formData={formData}
                  onSelect={updateForm}
                />

                <BattlePreferencesSection
                  preferences={options.battlePreferences}
                  formData={formData}
                  onSelect={updateForm}
                  onInputChange={handleInputChange}
                />
              </div>

              {/* Actions */}
              {/* lkhat dyal lfo9 (bordure supérieure) wella gris clair */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                >
                  Skip Initialization
                </Button>

                <Button
                  type="submit"
                  size="lg"
                  // 7eyedna l glow zaye9 w darna shadow 3adi (shadow-md classique)
                  className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer text-white px-10 font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-md"
                >
                  Complete Setup
                </Button>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
};
