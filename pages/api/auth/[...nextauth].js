import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// Uses Google to authenticate user. If authenticated, creates a JWT valid for 10 mins

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  debug: false,
  session: {
    jwt: true,
    maxAge: 60 * 10, // 10 minutes,
  },
};

export default (req, res) => NextAuth(req, res, options);
