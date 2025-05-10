import mongoose from "mongoose";
import { config } from "dotenv";
import { EGenre } from "../v1/constants/enum";
import MovieModel from "../v1/schemas/movies.schema";
import configuration from "../common/configurations/config";

config();

const moviesData = [
  {
    title: "Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology",
    genres: [EGenre.SCIFI, EGenre.ACTION],
    releaseDate: new Date("2010-07-16"),
    director: "Christopher Nolan",
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
  },
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years",
    genres: [EGenre.DRAMA],
    releaseDate: new Date("1994-09-23"),
    director: "Frank Darabont",
    actors: ["Tim Robbins", "Morgan Freeman"],
  },
  {
    title: "Pulp Fiction",
    description: "Various interconnected stories of criminals in Los Angeles",
    genres: [EGenre.ACTION, EGenre.DRAMA],
    releaseDate: new Date("1994-10-14"),
    director: "Quentin Tarantino",
    actors: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
  },
];

async function seedMovies() {
  try {
    await mongoose.connect(configuration.mongoDbUrl);

    // Clear existing data
    await MovieModel.deleteMany({});

    // Insert new data
    await MovieModel.insertMany(moviesData);

    console.log("Movies seeded successfully");
  } catch (error) {
    console.error("Error seeding Movies:", error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the seeder
seedMovies();
