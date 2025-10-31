// googleauth.js
import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

console.log("GOOGLE_CLIENT_ID from googleauth.js:", process.env.GOOGLE_CLIENT_ID);

passport.use(
  new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // Make callback URL configurable via env so you can use different
        // OAuth redirect URIs for local dev and production.
        callbackURL: process.env.GOOGLE_CALLBACK_URL || "https://moviesmania-1.onrender.com/auth/google/callback",
      },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
            // Create user. If creation fails due to a race/unique-index, try
            // to recover by fetching the existing user by email.
            try {
              user = await User.create({
                username: profile.displayName,
                email: profile.emails[0].value,
                password: Math.random().toString(36),
              });
            } catch (createErr) {
              console.error('Error creating Google user, attempting fallback lookup', createErr.message);
              const fallback = await User.findOne({ email: profile.emails[0].value });
              if (fallback) {
                user = fallback;
              } else {
                throw createErr;
              }
            }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // or user._id if using MongoDB
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
