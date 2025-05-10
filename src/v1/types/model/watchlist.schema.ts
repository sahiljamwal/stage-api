import { Types } from "mongoose";

export interface IWatchlist {
  _id: Types.ObjectId;
  contentId: Types.ObjectId;
  userId: Types.ObjectId;
  contentType: "movie" | "tv-show";
  addedOn: Date;
  thumbnailUrl?: string;
  title: string;
}
