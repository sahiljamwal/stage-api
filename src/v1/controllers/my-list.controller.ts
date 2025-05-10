import { NextFunction, Request, Response } from "express";
import myListService from "../services/my-list.service";

class MyListController {
  constructor(private _service = myListService) {}

  public add = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._service.add();
      return response.status(201).send(data);
    } catch (error) {
      return next(error);
    }
  };

  public delete = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      await this._service.delete();
      return response.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  };

  public get = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._service.get();
      return response.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  };
}

export default new MyListController();
