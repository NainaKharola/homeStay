const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

const configurePassport = () => {
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const callbackURL =
    process.env.GOOGLE_CALLBACK_URL ||
    process.env.CALLBACK_URL ||
    "http://localhost:5000/api/auth/google/callback";

  if (clientID && clientSecret && clientID !== "your_google_client_id") {
    passport.use(
      new GoogleStrategy(
        {
          clientID,
          clientSecret,
          callbackURL,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
            const profileImage = profile.photos && profile.photos[0] ? profile.photos[0].value : "";

            if (!email) {
              return done(new Error("No email returned from Google profile"), null);
            }

            let user = await User.findOne({
              $or: [{ googleId: profile.id }, { email: email.toLowerCase() }],
            });

            if (user) {
              if (!user.googleId) {
                user.googleId = profile.id;
              }
              if (!user.profileImage && profileImage) {
                user.profileImage = profileImage;
              }
              await user.save();
            } else {
              user = await User.create({
                name: profile.displayName || email.split("@")[0],
                email: email.toLowerCase(),
                googleId: profile.id,
                profileImage,
              });
            }

            return done(null, user);
          } catch (error) {
            console.error("Passport Google Error:");
            console.error(error);
            return done(error, null);
          }
        }
      )
    );
  } else {
    console.log("Google OAuth credentials missing in environment variables. Passport Google Strategy not registered.");
  }
};

module.exports = configurePassport;
