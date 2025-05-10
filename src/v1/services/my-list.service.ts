import { cloneDeep } from "lodash";
import { EC } from "../../common/constants/errors";
import { EC as v1EC } from "../constants/errors";
import { BaseError } from "../../common/errors/base.error";
import {
  AuthorizationError,
  NotFoundError,
  SystemError,
} from "../../common/errors/custom.error";
import { EContentType, EPaginationQueryCodes } from "../constants/enum";
import { getPaginationQuery } from "../helpers/query.helper";
import WatchlistModel from "../schemas/watchlist.schema";
import { IUser } from "../types/model/user.type";
import { IWatchlist } from "../types/model/watchlist.type";
import { IAddToMyListPayload, IFetchListReq } from "../types/my-list.type";
import moviesService from "./movies.service";
import tvShowsService from "./tv-shows.service";
import { IPaginationResponse } from "../types/pagination.type";
import watchlistCacheHelper from "../helpers/watchlist-cache.helper";

class MyListService {
  constructor(
    private _movieService = moviesService,
    private _tvShowService = tvShowsService,
    private _model = WatchlistModel
  ) {}

  private _handleError = (error: Error) => {
    if (error instanceof BaseError) {
      throw error;
    } else {
      throw new SystemError(EC.ERROR_IN_API);
    }
  };

  public add = async (payload: IAddToMyListPayload, user: IUser) => {
    try {
      const { contentId, contentType } = payload;
      const { _id: userId } = user;

      let content = null;
      if (contentType === EContentType.MOVIE) {
        content = await this._movieService.getById(contentId);
      } else {
        content = await this._tvShowService.getById(contentId);
      }

      const existingContent = await this._model
        .findOne({ userId, contentId })
        .lean();

      if (existingContent) {
        return existingContent;
      }

      const created = await this._model.create({
        userId,
        contentId,
        contentType,
        title: content.title,
      });

      await watchlistCacheHelper.invalidate(userId.toString());

      return created;
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  public delete = async (watchlistId: string, user: IUser) => {
    try {
      const { _id: userId } = user;
      const content = await this._model.findOne({ _id: watchlistId }).lean();

      if (!content) {
        throw new NotFoundError(v1EC.CONTENT_NOT_FOUND_IN_WATCHLIST);
      }

      if (content.userId.toString() !== userId.toString()) {
        throw new AuthorizationError(v1EC.UNAUTHORIZED_TO_PERFORM_THIS_ACTION);
      }

      await watchlistCacheHelper.invalidate(userId.toString());

      return await this._model.deleteOne({ _id: watchlistId });
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  public get = async (
    query: IFetchListReq["query"],
    user: IUser
  ): Promise<IPaginationResponse<IWatchlist>> => {
    try {
      const { _id: userId } = user;
      const meta = getPaginationQuery<IWatchlist>(
        EPaginationQueryCodes.FETCH_USER_WATCHLIST,
        { query: cloneDeep(query), body: { user: cloneDeep(user) } }
      );

      const cached = watchlistCacheHelper.get(
        userId.toString(),
        query,
        meta.skip,
        meta.limit
      );
      if (cached) {
        console.log("Cache hit");
        return cached;
      }

      const [listItems, total] = await Promise.all([
        this._model
          .find(meta.query, meta.projection)
          .sort(meta.sort)
          .skip(meta.skip)
          .limit(meta.limit)
          .lean(),
        this._model.countDocuments(meta.query),
      ]);

      const result = { meta: { total }, data: listItems };

      watchlistCacheHelper.set(
        userId.toString(),
        query,
        meta.skip,
        meta.limit,
        result
      );

      return result;
    } catch (error) {
      return this._handleError(error as Error);
    }
  };
}

export default new MyListService();
