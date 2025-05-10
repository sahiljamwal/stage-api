import express from "express";
import myListController from "../controllers/my-list.controller";

const myListRouter = express.Router();

myListRouter.post("/", myListController.add);
myListRouter.delete("/:id", myListController.delete);
myListRouter.get("/", myListController.get);

export default myListRouter;
