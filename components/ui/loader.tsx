'use client';

import { ClipLoader } from 'react-spinners';

interface LoaderProps {
    size?: number;
}

export const Loader: React.FC<LoaderProps> = ({ size = 50 }) => {
    return <ClipLoader color="#3498db" size={size} />;
};
