import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import customAdapter from "./customAdapter";
import prisma from "./db";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: customAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET
};
