import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

// Extend the existing types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      provider?: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    provider?: string;
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        return passwordMatch ? user : null;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          // Explicitly set the callback URL
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`,
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("Sign-in callback triggered", {
        userId: user.id,
        provider: account?.provider,
        hasProfile: !!profile,
      });
      user.name = user.email?.slice(0, user.email?.indexOf("@") ?? 0);
      return true;
    },
    async jwt({ token, user, account, profile }) {
      console.log("JWT callback triggered", {
        hasToken: !!token,
        hasUser: !!user,
        hasAccount: !!account,
      });
      if (account && user) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id!;
        session.user.provider = token.provider;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  debug: true, // This will give us more detailed logs
  events: {
    async signIn(message) {
      console.log("Successful sign in", message);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
