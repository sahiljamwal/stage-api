import { EC } from "../../common/constants/errors";
import { EC as v1EC } from "../constants/errors";
import { BaseError } from "../../common/errors/base.error";
import { NotFoundError, SystemError } from "../../common/errors/custom.error";
import MovieModel from "../schemas/movies.schema";

class Moviesservice {
  constructor(private _model = MovieModel) {}

  private _handleError = (error: Error) => {
    if (error instanceof BaseError) {
      throw error;
    } else {
      throw new SystemError(EC.ERROR_IN_API);
    }
  };

  public getById = async (movieId: string) => {
    try {
      const movie = await this._model.findOne({ _id: movieId }).lean();
      if (!movie) {
        throw new NotFoundError(v1EC.MOVIE_NOT_FOUND);
      }

      return movie;
    } catch (error) {
      return this._handleError(error as Error);
    }
  };
}

export default new Moviesservice();
