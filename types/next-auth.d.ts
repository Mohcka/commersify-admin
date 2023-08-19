import { User as PrismaUser } from "@prisma/client";
import NextAuth, { DefaultSession, JWT } from "next-auth";

declare module "next-auth" {
  interface User extends PrismaUser {}
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: PrismaUser["id"];
      name: PrismaUser["name"];
      email: PrismaUser["email"];
      image: PrismaUser["image"];
    } & DefaultSession["user"];
  } 
}

declare module "next-auth/adapters" {
  interface AdapterUser extends PrismaUser {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id?: PrismaUser["id"];
    favoriteIds?: PrismaUser["favoriteIds"];
  }
}
