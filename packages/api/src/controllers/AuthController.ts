import { Request, Response } from "express";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
// import { unauthorized } from "@hapi/boom";
import users from "../data/users.json";

const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const INCORRECT_LOGIN = "Incorrect login or password";
  const UNAUTHORIZED = "Unauthorized";

  const user = users.find((user) => user.email === email);

  if (!user) {
    res.status(401).json({ error: UNAUTHORIZED, message: INCORRECT_LOGIN });
  } else if (!compareSync(password, user.password)) {
    res.status(401).json({ error: UNAUTHORIZED, message: INCORRECT_LOGIN });
  } else {
    const { password, ...userData } = user;
    const token = jwt.sign({ userData }, `${process.env.SECRET_KEY}`, {
      expiresIn: "7d",
    });

    res.status(200).json({ token });
  }
};

export const AuthController = {
  login,
};
