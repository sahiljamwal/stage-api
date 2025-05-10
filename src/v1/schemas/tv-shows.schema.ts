import { Model, model, Schema } from "mongoose";
import { IEpisode, ITvShow } from "../types/model/tv-shows.type";
import { EGenre } from "../constants/enum";

const episodeSchema = new Schema<IEpisode>({
  actors: { type: [String], required: true },
  director: { type: String, required: true },
  episodeNumber: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  seasonNumber: { type: Number, required: true },
});

const schema = new Schema<ITvShow>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    genres: { type: [String], enum: EGenre, default: [] },
    episodes: { type: [episodeSchema], default: [] },
  },
  { timestamps: true }
);

const TvShowModel = model<ITvShow, Model<ITvShow>>(
  "TvShow",
  schema,
  "tv-shows"
);
export default TvShowModel;
