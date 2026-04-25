const errorClerk = (err, req, res, next) => {
  if (err?.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Invalid token" });
  }
  next(err);
};
export default errorClerk;
