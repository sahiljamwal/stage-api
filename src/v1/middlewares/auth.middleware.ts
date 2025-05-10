import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../../common/errors/custom.error";
import { sample } from "lodash";
import userService from "../services/user.service";

const users = [
  "681ef3592194900a40fa0a06",
  //  "681ef3592194900a40fa0a07"
];

export const validateUser = async (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    // write token validation logic here
    // will randomly pick a userid from the array

    const user = sample(users);

    request.user = await userService.getUserById(user!);

    return next();
  } catch (error) {
    return next(new AuthenticationError((error as Error).message));
  }
};
