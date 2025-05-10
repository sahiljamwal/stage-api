import { EC } from "../../common/constants/errors";
import { BaseError } from "../../common/errors/base.error";
import { NotFoundError, SystemError } from "../../common/errors/custom.error";
import UserModel from "../schemas/users.schema";

class UserService {
  constructor(private _model = UserModel) {}

  private _handleError = (error: Error) => {
    if (error instanceof BaseError) {
      throw error;
    } else {
      throw new SystemError(EC.ERROR_IN_API);
    }
  };

  public getUserById = async (userId: string) => {
    try {
      const user = await this._model.findOne({ _id: userId }).lean();
      if (!user) {
        throw new NotFoundError("User not found");
      }

      return user;
    } catch (error) {
      return this._handleError(error as Error);
    }
  };
}

export default new UserService();
