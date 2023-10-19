'use client';

import { useEffect } from 'react';

import { useStoreModal } from '@/hooks/use-store-modal';
import { useSession } from 'next-auth/react';

const SetupPage = () => {
    const { data: session, status } = useSession();
    console.log(session, '세숀');
    return <div className="w-full h-screen"></div>;
};

export default SetupPage;
