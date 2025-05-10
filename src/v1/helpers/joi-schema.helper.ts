import Joi, { CustomHelpers } from "joi";
import { IAddToMyListPayload, IFetchListReq } from "../types/my-list.type";
import { EContentType } from "../constants/enum";
import { Types } from "mongoose";

// Custom validators
function validateObjectId(value: string, helpers: CustomHelpers) {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}

const addToListSchema = Joi.object<IAddToMyListPayload>({}).keys({
  contentId: Joi.string()
    .custom(validateObjectId)
    .required()
    .label("contentId"),
  contentType: Joi.string()
    .valid(...Object.values(EContentType))
    .required()
    .label("contentType"),
});

const myListParamsSchema = Joi.object<IFetchListReq["params"]>().keys({
  contentId: Joi.string()
    .custom(validateObjectId)
    .required()
    .label("contentId"),
});

const myListQuerySchema = Joi.object<IFetchListReq["query"]>().keys({
  page: Joi.number().optional().default(1).label("page"),
  limit: Joi.number().optional().default(10).label("limit"),
  filter: Joi.object<IFetchListReq["query"]["filter"]>()
    .keys({
      contentType: Joi.string()
        .valid(...Object.values(EContentType))
        .optional()
        .label("contentType"),
    })
    .optional()
    .default({})
    .label("filter"),
});

export const myListSchema = {
  create: addToListSchema,
  fetch: { query: myListQuerySchema },
  delete: myListParamsSchema,
};
