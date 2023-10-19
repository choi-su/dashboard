import prisma from '@/lib/prismadb';
import NextAuth from 'next-auth';
import bcrypt from 'bcrypt';
import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { signJwtAccessToken } from '@/lib/utils';
export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('아이디 또는 비밀번호를 입력해주세요');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error('검증되지 않은 유저입니다.');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error('비밀번호가 올바르지 않습니다.');
                }

                const accessToken = signJwtAccessToken(user);
                const result = {
                    ...user,
                    accessToken,
                };
                return result;
            },
        }),
    ],
    debug: process.env.NODE_ENV === 'development',
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,
        updateAge: 2 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
          return { ...token, ...user };
        },
    
        async session({ session, token }) {
          session.user = token as any;
          return session;
        },
      },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
