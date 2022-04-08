import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.PROVIDER_GOOGLE_CLIENT_ID,
      clientSecret: process.env.PROVIDER_GOOGLE_CLIENT_SECRET,
    }),
  ],
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
