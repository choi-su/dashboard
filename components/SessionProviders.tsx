'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface SessionProviderProps {
    children: React.ReactNode;
}

const SessionProviders: React.FC<SessionProviderProps> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviders;
