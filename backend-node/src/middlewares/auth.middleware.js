// Middleware qui vérifie si l'utilisateur est authentifié
// via Clerk avant d'accéder à la route protégée.
import { getAuth } from "@clerk/express";

export const protect = (req, res, next) => {
  const auth = getAuth(req);

  if (!auth.userId) {
    console.log("Auth failed. No userId found in token.");
    return res.status(401).json({ message: "Not authenticated" });
  }

  req.auth = auth; // On attache pour le controller
  next();
};
