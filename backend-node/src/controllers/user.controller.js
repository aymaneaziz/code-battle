const homeController = (req, res) => {
  res.send("Welcome to the User API");
};

const getUserController = (req, res) => {
  res.send(`Get user with ID: ${req.params.id}`);
};
const createUserController = (req, res) => {
  res.send("Create a new user");
};
const updateUserController = (req, res) => {
  res.send(`Update user with ID: ${req.params.id}`);
};
const deleteUserController = (req, res) => {
  res.send(`Delete user with ID: ${req.params.id}`);
};

export {
  homeController,
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController,
};
