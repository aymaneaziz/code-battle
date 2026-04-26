import { useUser } from "@clerk/clerk-react";

export const PlayerSetup = () => {
  const user = useUser();
  console.log("PlayerSetup user:", user);

  // rani rire kandfch hna hhh rah hta ndiro meet ou 3awd goli wacha 5aso y3mr
  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4">Configuer votre profil</h1>
      <p className="mb-4">Bienvenue, {user?.user?.firstName}! Veuillez compléter votre profil pour commencer à jouer.</p>
      
      {/* Formulaire de configuration du profil */}
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="username">Nom d'utilisateur</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500" 
            placeholder="Choisissez un nom d'utilisateur"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="avatar">Avatar</label>
          <input 
            type="file" 
            id="avatar" 
            name="avatar" 
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Enregistrer</button>
      </form>
    </div>
  )
}
