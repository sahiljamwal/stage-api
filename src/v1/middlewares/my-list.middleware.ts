import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../common/errors/custom.error";
import { myListSchema } from "../helpers/joi-schema.helper";

export const validateAddToMyListReq = async (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    request.body = await myListSchema.create.validateAsync(request.body, {
      errors: { wrap: { label: "" } },
    });
    return next();
  } catch (error) {
    return next(new ValidationError((error as Error).message));
  }
};

export const validateDeleteFromMyListReq = async (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    request.params = await myListSchema.delete.validateAsync(request.params, {
      errors: { wrap: { label: "" } },
    });
    return next();
  } catch (error) {
    return next(new ValidationError((error as Error).message));
  }
};

export const validateFetchMyListReq = async (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    request.query = (await myListSchema.fetch.query.validateAsync(
      request.query,
      {
        errors: { wrap: { label: "" } },
      }
    )) as any;
    return next();
  } catch (error) {
    return next(new ValidationError((error as Error).message));
  }
};
