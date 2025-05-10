import { SystemError } from "../../common/errors/custom.error";
import { EPaginationQueryCodes } from "../constants/enum";
import { EC } from "../constants/errors";
import { IWatchlist } from "../types/model/watchlist.type";
import { IFetchListReq } from "../types/my-list.type";
import { IPaginationMeta } from "../types/pagination.type";
import { IQueryHelperData } from "../types/query.type";

export const getPaginationQuery = <T>(
  code: EPaginationQueryCodes,
  queryHelperMetaData: IQueryHelperData
): IPaginationMeta<T> => {
  switch (code) {
    case EPaginationQueryCodes.FETCH_USER_WATCHLIST: {
      const {
        filter: { contentType },
        page,
        limit,
      } = queryHelperMetaData.query as IFetchListReq["query"];

      const { user } = queryHelperMetaData.body as any;

      return {
        limit,
        skip: (page - 1) * limit,
        sort: { addedOn: -1 },
        query: {
          userId: user._id,
          ...(contentType ? { contentType } : null),
        },
        projection: { __v: 0 },
      } as IPaginationMeta<IWatchlist>;
    }

    default:
      throw new SystemError(EC.UNSUPPORTED_PAGINATION_QUERY_CODE_PROVIDED);
  }
};
