import configuration from "../common/configurations/config";
import mongoose from "mongoose";
import { EGenre } from "../v1/constants/enum";
import TvShowModel from "../v1/schemas/tv-shows.schema";

const tvShowsData = [
  {
    title: "Stranger Things",
    description: "A sci-fi horror series set in the 1980s",
    genres: [EGenre.DRAMA, EGenre.HORROR, EGenre.SCIFI],
    episodes: [
      {
        actors: ["Millie Bobby Brown", "Finn Wolfhard", "David Harbour"],
        director: "Matt Duffer",
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date("2016-07-15"),
      },
      {
        actors: ["Winona Ryder", "David Harbour", "Finn Wolfhard"],
        director: "Ross Duffer",
        episodeNumber: 2,
        seasonNumber: 1,
        releaseDate: new Date("2016-07-15"),
      },
    ],
  },
  {
    title: "Breaking Bad",
    description: "A high school chemistry teacher turned drug lord",
    genres: [EGenre.DRAMA, EGenre.ACTION],
    episodes: [
      {
        actors: ["Bryan Cranston", "Aaron Paul"],
        director: "Vince Gilligan",
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date("2008-01-20"),
      },
    ],
  },
];

async function seedTvShows() {
  try {
    await mongoose.connect(configuration.mongoDbUrl);

    // Clear existing data
    await TvShowModel.deleteMany({});

    // Insert new data
    await TvShowModel.insertMany(tvShowsData);

    console.log("TV Shows seeded successfully");
  } catch (error) {
    console.error("Error seeding TV Shows:", error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the seeder
seedTvShows();
