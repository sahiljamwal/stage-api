import { Types } from "mongoose";
import { EContentType } from "../../constants/enum";

export interface IWatchlist {
  _id: Types.ObjectId;
  contentId: Types.ObjectId;
  userId: Types.ObjectId;
  contentType: EContentType;
  addedOn: Date;
  thumbnailUrl?: string;
  title: string;
}
