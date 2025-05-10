import { EC } from "../../common/constants/errors";
import { BaseError } from "../../common/errors/base.error";
import { NotFoundError, SystemError } from "../../common/errors/custom.error";
import MovieModel from "../schemas/movies.schema";

class TvShowsService {
  constructor(private _model = MovieModel) {}

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
        throw new NotFoundError("TV Show not found");
      }

      return tvShow;
    } catch (error) {
      return this._handleError(error as Error);
    }
  };
}

export default new TvShowsService();
