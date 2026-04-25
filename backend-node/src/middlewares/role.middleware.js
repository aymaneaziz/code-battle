import { getAuth } from "@clerk/express";

export const isAdmin = (req, res, next) => {
  const { sessionClaims } = getAuth(req);

  if (sessionClaims?.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Accès interdit : Réservé aux admins" });
  }
  next();
};
