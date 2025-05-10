import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import UserModel from "../v1/schemas/users.schema";
import MovieModel from "../v1/schemas/movies.schema";
import TvShowModel from "../v1/schemas/tv-shows.schema";
import WatchlistModel from "../v1/schemas/watchlist.schema";
import { EContentType, EGenre } from "../v1/constants/enum";

describe("My List API Integration Tests", () => {
  const testUser = {
    _id: new mongoose.Types.ObjectId("681ef3592194900a40fa0a06"),
    username: "test_user",
    preferences: {
      favoriteGenres: [EGenre.ACTION],
      dislikedGenres: [EGenre.HORROR],
    },
    watchHistory: [],
  };

  const testMovie = {
    _id: new mongoose.Types.ObjectId(),
    title: "Test Movie",
    description: "Test Description",
    genres: [EGenre.ACTION],
    releaseDate: new Date(),
    director: "Test Director",
    actors: ["Actor 1", "Actor 2"],
  };

  const testTvShow = {
    _id: new mongoose.Types.ObjectId(),
    title: "Test TV Show",
    description: "Test Description",
    genres: [EGenre.DRAMA],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date(),
        director: "Test Director",
        actors: ["Actor 1", "Actor 2"],
      },
    ],
  };

  beforeEach(async () => {
    await UserModel.create(testUser);
    await MovieModel.create(testMovie);
    await TvShowModel.create(testTvShow);
  });

  describe("POST /api/v1/my-list", () => {
    it("should add a movie to watchlist", async () => {
      const response = await request(app).post("/api/v1/my-list").send({
        contentId: testMovie._id.toString(),
        contentType: EContentType.MOVIE,
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "contentId",
        testMovie._id.toString()
      );
      expect(response.body).toHaveProperty("title", testMovie.title);
    });

    it("should add a TV show to watchlist", async () => {
      const response = await request(app).post("/api/v1/my-list").send({
        contentId: testTvShow._id.toString(),
        contentType: EContentType.TV_SHOW,
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "contentId",
        testTvShow._id.toString()
      );
      expect(response.body).toHaveProperty("title", testTvShow.title);
    });

    it("should return existing content if already in watchlist", async () => {
      // First addition
      await request(app).post("/api/v1/my-list").send({
        contentId: testMovie._id.toString(),
        contentType: EContentType.MOVIE,
      });

      // Second addition of same content
      const response = await request(app).post("/api/v1/my-list").send({
        contentId: testMovie._id.toString(),
        contentType: EContentType.MOVIE,
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "contentId",
        testMovie._id.toString()
      );
    });

    it("should return 404 for non-existent content", async () => {
      const response = await request(app).post("/api/v1/my-list").send({
        contentId: new mongoose.Types.ObjectId().toString(),
        contentType: EContentType.MOVIE,
      });

      expect(response.status).toBe(404);
    });
  });

  describe("GET /api/v1/my-list", () => {
    beforeEach(async () => {
      // Add some items to watchlist
      await WatchlistModel.create({
        userId: testUser._id,
        contentId: testMovie._id,
        contentType: EContentType.MOVIE,
        title: testMovie.title,
      });
    });

    it("should fetch watchlist with pagination", async () => {
      const response = await request(app).get("/api/v1/my-list").query({
        page: 1,
        limit: 10,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("meta.total");
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    it("should filter watchlist by content type", async () => {
      const response = await request(app)
        .get("/api/v1/my-list")
        .query({
          page: 1,
          limit: 10,
          filter: {
            contentType: EContentType.MOVIE,
          },
        });

      expect(response.status).toBe(200);
      expect(
        response.body.data.every(
          (item: any) => item.contentType === EContentType.MOVIE
        )
      ).toBeTruthy();
    });
  });

  describe("DELETE /api/v1/my-list/:id", () => {
    let watchlistItem: any;

    beforeEach(async () => {
      // Create watchlist item
      watchlistItem = await WatchlistModel.create({
        userId: testUser._id,
        contentId: testMovie._id,
        contentType: EContentType.MOVIE,
        title: testMovie.title,
      });
    });

    it("should delete content from watchlist", async () => {
      const response = await request(app).delete(
        `/api/v1/my-list/${watchlistItem._id}`
      );

      expect(response.status).toBe(204);

      // Verify deletion
      const deleted = await WatchlistModel.findById(watchlistItem._id);
      expect(deleted).toBeNull();
    });

    it("should return 404 for non-existent watchlist item", async () => {
      const response = await request(app).delete(
        `/api/v1/my-list/${new mongoose.Types.ObjectId()}`
      );

      expect(response.status).toBe(404);
    });

    it("should return 403 when trying to delete another user's content", async () => {
      // Create another user's watchlist item
      const otherWatchlistItem = await WatchlistModel.create({
        userId: new mongoose.Types.ObjectId(),
        contentId: testMovie._id,
        contentType: EContentType.MOVIE,
        title: testMovie.title,
      });

      const response = await request(app).delete(
        `/api/v1/my-list/${otherWatchlistItem._id}`
      );

      expect(response.status).toBe(403);
    });
  });
});
