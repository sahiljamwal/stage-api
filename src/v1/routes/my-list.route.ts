import express from "express";
import myListController from "../controllers/my-list.controller";
import { validateUser } from "../middlewares/auth.middleware";

const myListRouter = express.Router();

myListRouter.use(validateUser);
myListRouter.post("/", myListController.add);
myListRouter.delete("/:id", myListController.delete);
myListRouter.get("/", myListController.get);

export default myListRouter;
