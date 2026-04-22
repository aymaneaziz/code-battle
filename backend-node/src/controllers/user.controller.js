import User from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";

const homeController = (req, res) => {
  res.send("Welcome to the User API");
};

const getUserController = (req, res) => {
  res.send(`Get user with ID: ${req.params.id}`);
};
const createUserController = (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    id: uuidv4(),
    username,
    email,
    password,
  });
  newUser
    .save()
    .then((user) => res.status(201).json(user))
    .catch((error) => res.status(400).json({ error: error.message }));
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
