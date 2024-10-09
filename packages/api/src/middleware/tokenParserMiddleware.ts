import type { Request, Response, NextFunction } from "express";
import { badRequest } from "@hapi/boom";

const jwtDecode = (token?: string | string[]) => {
  if (!token || typeof token !== "string") {
    return null;
  }

  console.log('JWT token', token);

  try {
    const base64Payload = token.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64");
    return JSON.parse(payload.toString());
  } catch (error) {
    return null;
  }
};

type ParsedToken = {
  userData: {
    id: string;
    smeId: string;
    name: string;
    email: string;
    profileImage: string;
  };
  iat: number;
  exp: number;
};

/**
 * Extracts the token from the `authorization` header, parses and returns it.
 *
 * Throws `badRequest()` from `@hapi/boom`:
 * - when the headers are not found
 * - when the token is not able to be parsed by `jwtDecode()`
 *
 * @throws badRequest
 * @param req
 * @returns {ParsedToken} parsed token
 */
export const extractToken = (req: Request): ParsedToken => {
  const authHeader = req.headers.authorization;
  let token= "";

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring(7, authHeader.length);
  } else {
    throw badRequest("Expected authorization header");
  }

  const parsedToken = jwtDecode(token);

  if (!parsedToken || !parsedToken.userData.id || !parsedToken.userData.smeId) {
    throw badRequest("Token could not be parsed");
  }

  return parsedToken;
};

export const tokenParserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedToken = extractToken(req);
    if (parsedToken && parsedToken.exp * 1000 <= Date.now()) {
      res.status(401).json({ error: "TOKEN_EXPIRED", message: "LOGIN" });
    }
    req.body.userData = parsedToken.userData;
    return next();
  } catch (e) {
    return next(e);
  }
};
