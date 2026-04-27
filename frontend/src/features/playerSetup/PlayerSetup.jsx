import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

import Avatar from "./components/Avatar";

import PlayerIdentity from "./components/PlayerIdentity";

import api from "../../service/GlobalApi";

export const PlayerSetup = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [formData, setFormData] = useState({
    //hada fomulaire li ghadi nsiftoh l backend
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

  const handleChange = (e) => {
    // hadi func katbdle state nta3 formData kan3tiha les elements fils
    console.log("Input changed:", e.target.name, e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  //hna nstoki dok les listes li jbthom mn lbackend
  const [avatars, setAvatars] = useState([]);
  const [battlePreferences, setBattlePreferences] = useState([]);
  const [codingExperiences, setCodingExperiences] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchDefaultData = async () => {
      const token = await getToken();

      const resp = await api.get("/data/setup", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Default data fetched:", resp);
      setAvatars(resp.avatars);
      setBattlePreferences(resp.battlePreferences);
      setCodingExperiences(resp.codingExperiences);
      setLanguages(resp.languages);
      //ici kandir set l data bach formulaire y3mr b des valeurs par defaut
      setFormData((prev) => ({
        ...prev,
        username: user?.username || user?.fullName || "",
        displayName: user?.firstName || "",
        address: "",
        bio: "",
        hasAggreedToTerms: false,
        avatarId: resp.avatars[0]?.avatarId || "",
        preferenceId: resp.battlePreferences[0]?.preferenceId || "",
        experienceId: resp.codingExperiences[0]?.experienceId || "",
        languageId: resp.languages[0]?.languageId || "",
      }));
    };

    console.log("User detected", user);
    fetchDefaultData();
  }, [user]);

  return (
    <form className="flex flex-row gap-4" onSubmit={handleSubmit}>
      <div className="w-1/5 h h-full border-2 border-gray-300 rounded-lg p-4">
        <Avatar avatars={avatars} handleChange={handleChange} />
      </div>
      <div className="w-4/5 gap-4 flex flex-col">
        <div className="border-2 border-gray-300 rounded-lg p-4">
          <p>
            Your email and password are secured by <b>Clerk</b>. This page
            collects your <b>game identity</b>
          </p>
        </div>
        <div className="border-2 border-gray-300 rounded-lg p-4">
          <PlayerIdentity formData={formData} handleChange={handleChange} />
        </div>
        <button type="submit">Envoyer</button>
      </div>
    </form>
  );
};
