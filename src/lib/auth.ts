import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";

// Custom PrismaAdapter with overridden createUser method
const prismaAdapter = PrismaAdapter(prisma);

// @ts-ignore
prismaAdapter.createUser = async (data) => {
  return prisma.user.create({
    data: {
      name: data.name ? data.name : "",
      email: data.email,
      image: data.image,
      createdAt: new Date(),
    },
  });
};

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
    async session({ session, user }: { session: any, user: { id: string, email: string } }) {
      if (session.user) {
        session.user.id = user.id;
        // Check if the user's email is in the admin table
        const isAdmin = await prisma.admin.findUnique({
          where: {
            email: user.email,
          },
        });
        // If the user is found in the admin table, mark them as an admin in the session
        session.user.isAdmin = !!isAdmin;
      }
      return session;
    },
  },
};
