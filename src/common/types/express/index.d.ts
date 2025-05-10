import { Request } from "express";
import { IUser } from "../../../v1/types/model/user.type";

export {};

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}
