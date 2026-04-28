import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 🟢 navigation
import AvatarSelector from "./components/AvatarSelector";
import IdentitySection from "./components/IdentitySection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import api from "../../service/GlobalApi";

export const PlayerSetup = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate(); // bach nredirectiw

  // state dyal formulaire
  const [formData, setFormData] = useState({
    avatarId: "",
    username: "",
    displayName: "",
    address: "",
    languageId: "",
    preferenceId: "",
    experienceId: "",
    bio: "",
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
    <div className="container max-w-7xl py-10">
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Left: Avatar */}
        <Card className="lg:col-span-4 p-6 shadow-lg">
          <AvatarSelector
            avatars={options.avatars}
            selectedId={formData.avatarId}
            onSelect={updateForm}
          />
        </Card>

        {/* Right: Form */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6 bg-blue-50/50 border-blue-200">
            <p className="text-sm text-blue-700">
              Your credentials are encrypted by <b>Clerk</b>. Fill your{" "}
              <b>Game Identity</b>.
            </p>
          </Card>

          <Card className="p-8 shadow-md">
            <IdentitySection
              formData={formData}
              handleChange={handleInputChange}
            />

            {/* Actions */}
            <div className="mt-8 flex justify-between items-center">
              {/* Skip button */}
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/")}
                className="cursor-pointer"
              >
                Skip
              </Button>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="px-12 font-bold uppercase tracking-wider cursor-pointer"
              >
                Complete Setup
              </Button>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};
