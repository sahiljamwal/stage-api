import { Types } from "mongoose";
import { EGenre } from "../../constants/enum";

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  preferences: {
    favoriteGenres: EGenre[];
    dislikedGenres: EGenre[];
  };
  watchHistory: IWatchHistory[];
}

export interface IWatchHistory {
  contentId: string;
  watchedOn: Date;
  rating?: number;
}
