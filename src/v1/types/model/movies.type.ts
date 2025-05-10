import { Types } from "mongoose";
import { EGenre } from "../../constants/enum";

export interface IMovie {
  _id: Types.ObjectId;
  title: string;
  description: string;
  genres: EGenre[];
  releaseDate: Date;
  director: string;
  actors: string[];
}
