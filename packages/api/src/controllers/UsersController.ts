import { Request, Response } from "express";
import users from "src/data/users.json";

const getUsers = (req: Request, res: Response) => {
  const smeId = req.body.userData.smeId;
  const smeUsers = users
    .filter((user) => user.smeId === smeId)
    .map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    }));

  res.status(200).json(smeUsers);
};

const getCurrentUser = (req: Request, res: Response) => {
  const userId = req.body.userData.id;
  const currentUser = users
    .filter((user) => user.id === userId)
    .map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    }));

  res.status(200).json(currentUser[0]);
};

export const UsersController = {
  getUsers,
  getCurrentUser,
};
