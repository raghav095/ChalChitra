import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  tmdbId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  overview: { type: String },
  posterPath: { type: String },
  backdropPath: { type: String },
  releaseDate: { type: String },
  voteAverage: { type: Number },
  // TMDB genre ids for the movie (e.g. [28, 12])
  genreIds: { type: [Number], default: [] },
  videoUrl: { type: String },
  source: { type: String },
}, { timestamps: true });

export const Movie = mongoose.model("Movie", movieSchema);