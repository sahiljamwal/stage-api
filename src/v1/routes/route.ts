import express from "express";
import myListRouter from "./my-list.route";

const v1Router = express.Router();

v1Router.use("/my-list", myListRouter);

export default v1Router;
