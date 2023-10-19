import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import { redirect } from 'next/navigation';

const layout = async ({ children }: { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser();
    console.log(currentUser);
    if (currentUser) {
        return <div>이미 로그인 하셨습니다.</div>;
    }
    return <div>{children}</div>;
};

export default layout;
