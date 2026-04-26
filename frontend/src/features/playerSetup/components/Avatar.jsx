import { useState, useEffect } from "react";

const Avatar = ({ avatars = [], handleChange }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  useEffect(() => {// hna kanselectew dak lavatar lewel f la liste bach ykon par defaut
    if (!selectedAvatar && avatars.length > 0) {
      setSelectedAvatar(avatars[0]);

      handleChange({
        target: {
          name: "avatarId",
          value: avatars[0].avatarId,
        },
      });
    }
  }, [avatars, selectedAvatar, handleChange]);

  const handleClick = (avatar) => {
    setSelectedAvatar(avatar);

    handleChange({
      target: {
        name: "avatarId",
        value: avatar.avatarId,
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full">
      <h2 className="text-2xl font-bold text-center">
        Choose Your Avatar
      </h2>

      <div className="w-5/6 aspect-square rounded-xl flex items-center justify-center font-semibold shadow-md border-2 border-black text-5xl bg-white">
        {selectedAvatar ? selectedAvatar.iconUrl : "?"}
      </div>

      <div className="flex flex-wrap gap-4 justify-center items-center w-full">
        {avatars.map((avatar) => (
          <button
            type="button"
            key={avatar.avatarId}
            onClick={() => handleClick(avatar)}
            className={`
              w-20 h-20 rounded-full overflow-hidden border-2
              shadow-md hover:shadow-lg transition-all duration-300 ease-in-out
              flex flex-col items-center justify-center
              ${
                selectedAvatar?.avatarId === avatar.avatarId
                  ? "border-blue-500 scale-110 cursor-not-allowed"
                  : "border-gray-300 hover:border-blue-400 hover:scale-105 cursor-pointer"
              }
            `}
          >
            <span className="text-xl">{avatar.iconUrl}</span>

            <p className="text-xs font-medium text-gray-700">
              {avatar.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Avatar;