import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import IdentitySection from "./components/IdentitySection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"; // Added for terms
import { Loading } from "@/components/common/Loading";

import api from "../../service/GlobalApi";

import BattlePreferencesSection from "./components/BattlePreferencesSection";
import AvatarSelectorSection from "./components/AvatarSelectorSection";
import CodingProfileSection from "./components/CodingProfileSection";
import { toast } from "sonner";

export const PlayerSetup = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate(); // bach nredirectiw
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // bach t insializz default value
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
          username:
            user?.username ||
            user?.fullName?.replace(/\s+/g, "").toLowerCase() ||
            "",
          displayName: user?.firstName || "",
          avatarId: data.avatars[0]?._id || "",
          preferenceId: data.battlePreferences[0]?._id || "",
          experienceId: data.codingExperiences[0]?._id || "",
          languageId: data.languages[0] ? [data.languages[0]._id] : [],
        }));
      } catch (err) {
        console.error("Failed to load setup data", err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [user, getToken]);

  if (loading) return <Loading />;

  // fonction katupdate ayi champ
  const updateForm = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // inputs classique
  const handleInputChange = (e) => {
    updateForm(e.target.name, e.target.value);
  };

  // bacht tsifet setupComleted : false l backend
  const handleSkip = async () => {
    try {
      const token = await getToken();
      await api.put(
        "/data/setup-comleted",
        { setupCompleted: false },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      navigate("/");
    } catch (err) {
      console.error("Skip failed", err);
      navigate("/"); // Redirect anyway to not block user
    }
  };
  // submit setup
  const onSubmit = async (e) => {
    e.preventDefault();
    // Rules: 3-18 chars, letters, numbers, underscores
    const displayNameRegex = /^[a-zA-Z0-9_]{3,18}$/;

    // Verification des champs obligatoires (Validation)
    if (!formData.username.trim()) {
      return toast.info("Username is required", {
        description: "Please choose a unique username for your profile.",
      });
    }
    if (!displayNameRegex.test(formData.displayName)) {
      return toast.info("Invalid Display Name", {
        description: "3-18 characters. Letters, numbers, and underscores only.",
      });
    }
    if (!formData.location.trim()) {
      return toast.info("Location is required", {
        description: "Tell us where you are coding from!",
      });
    }
    if (formData.bio && formData.bio.length > 40) {
      return toast.info("Bio too long", {
        description: `Your bio is ${formData.bio.length} characters. Please keep it under 120.`,
      });
    }
    try {
      setIsSubmitting(true);
      const token = await getToken();
      await api.post(
        "/data/setup",
        { ...formData, setupCompleted: true },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      console.log("Final Submission:", formData);
      toast.success("Profile created successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong during setup.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.hasAggreedToTerms && !isSubmitting;

  return (
    <div className="min-h-screen w-full flex items-center bg-slate-50/50 justify-center py-5 px-4 md:px-8">
      <div className="w-full ">
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

              {/* Terms and Conditions Section - Added here */}
              <div className="mt-8 flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  className={"cursor-pointer"}
                  checked={formData.hasAggreedToTerms}
                  onCheckedChange={(checked) =>
                    updateForm("hasAggreedToTerms", checked)
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 cursor-pointer select-none"
                >
                  I agree to the terms of service and privacy policy.
                </label>
              </div>

              {/* Actions */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleSkip} // Use handleSkip logic
                  className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                >
                  Skip Initialization
                </Button>

                <Button
                  type="submit"
                  size="lg"
                  disabled={!isFormValid} // Button disabled if terms not checked
                  className={`px-10 font-bold uppercase tracking-widest transition-all shadow-md 
                    ${
                      isFormValid
                        ? "bg-cyan-600 hover:bg-cyan-700 hover:scale-105 text-white cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  {isSubmitting ? "Processing..." : "Complete Setup"}
                </Button>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
};
