import { Model, model, Schema } from "mongoose";
import { IUser, IWatchHistory } from "../types/model/user.type";
import { EGenre } from "../constants/enum";

const watchHistorySchema = new Schema<IWatchHistory>(
  {
    contentId: { type: String, required: true },
    watchedOn: { type: Date, required: true },
    rating: { type: Number, min: 1, max: 5 },
  },
  { _id: false }
);

const schema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    preferences: {
      favoriteGenres: {
        type: [String],
        enum: EGenre,
        default: [],
      },
      dislikedGenres: {
        type: [String],
        enum: EGenre,
        default: [],
      },
    },
    watchHistory: {
      type: [watchHistorySchema],
      default: [],
    },
  },
  { timestamps: true }
);

const UserModel = model<IUser, Model<IUser>>("User", schema, "users");
export default UserModel;
