import { NextFunction, Request, Response } from "express";
import myListService from "../services/my-list.service";
import { IFetchListReq } from "../types/my-list.type";

class MyListController {
  constructor(private _service = myListService) {}

  public add = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._service.add(request.body, request.user!);
      return response.status(201).send(data);
    } catch (error) {
      return next(error);
    }
  };

  public delete = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      await this._service.delete(request.params.contentListId, request.user!);
      return response.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  };

  public get = async (
    request: Request<any, any, any, IFetchListReq["query"]>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._service.get(request.query, request.user!);
      return response.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  };
}

export default new MyListController();
