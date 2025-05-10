import configuration from "../common/configurations/config";
import mongoose from "mongoose";
import { EGenre } from "../v1/constants/enum";
import UserModel from "../v1/schemas/users.schema";

const usersData = [
  {
    _id: new mongoose.Types.ObjectId("681ef3592194900a40fa0a06"),
    username: "john_doe",
    preferences: {
      favoriteGenres: [EGenre.ACTION, EGenre.SCIFI],
      dislikedGenres: [EGenre.HORROR],
    },
    watchHistory: [
      {
        contentId: "breaking_bad_s01e01",
        watchedOn: new Date("2024-01-15"),
        rating: 5,
      },
      {
        contentId: "stranger_things_s01e01",
        watchedOn: new Date("2024-02-20"),
        rating: 4,
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId("681ef3592194900a40fa0a07"),
    username: "jane_smith",
    preferences: {
      favoriteGenres: [EGenre.DRAMA, EGenre.COMEDY],
      dislikedGenres: [EGenre.HORROR, EGenre.ACTION],
    },
    watchHistory: [
      {
        contentId: "stranger_things_s01e01",
        watchedOn: new Date("2024-03-01"),
        rating: 5,
      },
    ],
  },
];

async function seedUsers() {
  try {
    await mongoose.connect(configuration.mongoDbUrl);

    // Clear existing data
    await UserModel.deleteMany({});

    // Insert new data
    await UserModel.insertMany(usersData);

    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding Users:", error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the seeder
seedUsers();
