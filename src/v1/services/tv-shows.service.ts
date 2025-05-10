import { EC } from "../../common/constants/errors";
import { EC as v1EC } from "../constants/errors";
import { BaseError } from "../../common/errors/base.error";
import { NotFoundError, SystemError } from "../../common/errors/custom.error";
import TvShowModel from "../schemas/tv-shows.schema";

class TvShowsService {
  constructor(private _model = TvShowModel) {}

  private _handleError = (error: Error) => {
    if (error instanceof BaseError) {
      throw error;
    } else {
      throw new SystemError(EC.ERROR_IN_API);
    }
  };

  public getById = async (tvshowId: string) => {
    try {
      const tvShow = await this._model.findOne({ _id: tvshowId }).lean();
      if (!tvShow) {
        throw new NotFoundError(v1EC.TV_SHOW_NOT_FOUND);
      }

      return tvShow;
    } catch (error) {
      return this._handleError(error as Error);
    }
  };
}

export default new TvShowsService();
