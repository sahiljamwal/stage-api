import express from "express";
import myListController from "../controllers/my-list.controller";
import { validateUser } from "../middlewares/auth.middleware";
import {
  validateAddToMyListReq,
  validateDeleteFromMyListReq,
  validateFetchMyListReq,
} from "../middlewares/my-list.middleware";

const myListRouter = express.Router();

myListRouter.use(validateUser);
myListRouter.post("/", validateAddToMyListReq, myListController.add);
myListRouter.delete(
  "/:contentListId",
  validateDeleteFromMyListReq,
  myListController.delete
);
myListRouter.get("/", validateFetchMyListReq, myListController.get);

export default myListRouter;
