import { EC } from "../../common/constants/errors";
import { BaseError } from "../../common/errors/base.error";
import { SystemError } from "../../common/errors/custom.error";

class MyListService {
  constructor() {}

  private _handleError = (error: Error) => {
    if (error instanceof BaseError) {
      throw error;
    } else {
      throw new SystemError(EC.ERROR_IN_API);
    }
  };

  public add = async () => {
    try {
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  public delete = async () => {
    try {
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  public get = async () => {
    try {
    } catch (error) {
      return this._handleError(error as Error);
    }
  };
}

export default new MyListService();
