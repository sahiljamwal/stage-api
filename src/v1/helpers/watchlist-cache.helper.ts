import qs from "qs";
import Cache from "../../common/utils/cache.util";
import { IFetchListReq } from "../types/my-list.type";

class WatchlistCache {
  private cache = Cache;
  private readonly prefix = "watchlist:user";
  private readonly defaultTTL = 60;

  constructor() {}

  private buildKey = (
    userId: string,
    query: IFetchListReq["query"],
    skip = 0,
    limit = 10
  ): string => {
    const queryStr = qs.stringify(query, {
      sort: (a, b) => a.localeCompare(b),
    });
    return `${this.prefix}:${userId}:query:${queryStr}:page:${skip}:limit:${limit}`;
  };

  public get = <T>(
    userId: string,
    query: IFetchListReq["query"],
    skip = 0,
    limit = 10
  ): any => {
    const key = this.buildKey(userId, query, skip, limit);
    return this.cache.get<T>(key);
  };

  public set = (
    userId: string,
    query: IFetchListReq["query"],
    skip: number,
    limit: number,
    data: any
  ): void => {
    const key = this.buildKey(userId, query, skip, limit);
    this.cache.set(key, data, this.defaultTTL);
  };

  public invalidate = (userId: string): void => {
    const keys = this.cache.keys();
    const pattern = `${this.prefix}:${userId}:`;
    keys.filter((k) => k.startsWith(pattern)).forEach((k) => this.cache.del(k));
  };
}

export default new WatchlistCache();
