'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

interface ClientOnlyProps {
    children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
    const { data: session, status } = useSession();
    console.log(status, '상태');
    const loading = status === 'loading';
    // const [isMount , setIsMount] = useState(false)
    const loadingContent = <div>로딩중 입니당</div>;
    const unauthenticatedContent = <div>로그인후 사용해주세용</div>;
    if (loading) {
        return loadingContent;
    }
    // if (status === 'unauthenticated') {
    //     return unauthenticatedContent;
    // }
    return <div>{children}</div>;
};

export default ClientOnly;
