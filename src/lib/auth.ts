import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "./db";

// Custom PrismaAdapter with overridden createUser method
const prismaAdapter = PrismaAdapter(prisma);

// @ts-ignore
// prismaAdapter.createUser = async (data) => {
//   const password = "testpwd";
//   const saltRounds = 10;

//   const hashedPassword = await bcrypt.hash(password, saltRounds);

//   console.log("Data: ", data);
//   return prisma.user.create({
//     data: {
//       username: data.email,
//       password: hashedPassword,
//       name: data.name,
//       email: data.email,
//       image: data.image,
//       createdAt: new Date(),
//     },
//   });
// };

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: prismaAdapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      // if (session.user) {
      //   session.user.id = user.id;
      // }
      return session;
    },
  },
};
