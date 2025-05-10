import { Model, model, Schema } from "mongoose";
import { IWatchlist } from "../types/model/watchlist.type";
import { EContentType } from "../constants/enum";

const schema = new Schema<IWatchlist>(
  {
    addedOn: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contentId: { type: Schema.Types.ObjectId, required: true },
    contentType: {
      type: String,
      enum: EContentType,
      required: true,
    },
    thumbnailUrl: { type: String },
    title: { type: String, required: true },
  },
  {}
);

schema.index({ userId: 1, contentId: 1 }, { unique: true });
schema.index({ userId: 1, contentType: 1, addedOn: -1 });
schema.index({ userId: 1, addedOn: -1 });

const WatchlistModel = model<IWatchlist, Model<IWatchlist>>(
  "Watchlist",
  schema,
  "watchlists"
);
export default WatchlistModel;
