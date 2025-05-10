import { Types } from "mongoose";
import { EGenre } from "../../constants/enum";

export interface ITvShow {
  _id: Types.ObjectId;
  title: string;
  description: string;
  genres: EGenre[];
  episodes: IEpisode[];
}

export interface IEpisode {
  episodeNumber: number;
  seasonNumber: number;
  releaseDate: Date;
  director: string;
  actors: string[];
}
