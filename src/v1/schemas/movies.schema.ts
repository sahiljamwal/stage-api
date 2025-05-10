import { Model, model, Schema } from "mongoose";
import { IMovie } from "../types/model/movies.type";
import { EGenre } from "../constants/enum";

const schema = new Schema<IMovie>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    genres: { type: [String], enum: EGenre, default: [] },
    releaseDate: { type: Date, required: true },
    director: { type: String, required: true },
    actors: { type: [String], required: true },
  },
  { timestamps: true }
);

const MovieModel = model<IMovie, Model<IMovie>>("Movie", schema, "movies");
export default MovieModel;
