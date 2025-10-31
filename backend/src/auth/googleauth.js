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
      console.log('Google OAuth callback invoked for profile:', { id: profile.id, email: profile.emails?.[0]?.value, displayName: profile.displayName });
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          throw new Error('No email returned from Google profile');
        }

        // Use an atomic upsert to avoid race conditions or duplicate-key errors.
        // Set a strong random password for OAuth-created users to satisfy the
        // schema requirement (password is required) while avoiding collisions.
        const crypto = await import('crypto');
        const randomPassword = crypto.randomBytes(32).toString('hex');

        const update = {
          $setOnInsert: {
            username: profile.displayName || email.split('@')[0],
            email,
            password: randomPassword,
          }
        };

        const opts = { upsert: true, new: true, setDefaultsOnInsert: true };
        let user = await User.findOneAndUpdate({ email }, update, opts);

        // If for some reason findOneAndUpdate returned null, try to fetch existing
        if (!user) {
          user = await User.findOne({ email });
          if (!user) throw new Error('Failed to create or retrieve user during Google OAuth');
        }

        return done(null, user);
      } catch (err) {
        console.error('Passport Google callback error:', err);
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
