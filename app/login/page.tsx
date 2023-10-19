'use client';
// import ClientOnly from '@/components/ClientOnly';
// import AuthProvider from '@/components/auth/AuthProvider';
// import React from 'react';

// const page = () => {
//     return <AuthProvider />;
// };

// export default page;

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import AuthProvider from '@/components/auth/AuthProvider';

export default function AuthenticationPage() {
    return (
        <>
            <div className="container relative grid flex-col items-center justify-center h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6 mr-2"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        Neft Inc
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;주식회사 느프에서 제작한
                                대시보드입니다.&rdquo;
                            </p>
                            <footer className="text-sm">최수렬</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                로그인
                            </h1>
                            {/* <p className="text-sm text-muted-foreground">
                                Enter your email below to create your account
                            </p> */}
                        </div>
                        <AuthProvider />
                        {/* <p className="px-8 text-sm text-center text-muted-foreground">
                            By clicking continue, you agree to our{' '}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p> */}
                    </div>
                </div>
            </div>
        </>
    );
}
