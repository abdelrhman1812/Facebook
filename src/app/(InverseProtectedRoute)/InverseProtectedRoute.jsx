import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const InverseProtectedRoute = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const userToken = localStorage.getItem('tokenArtical');
        if (userToken) {
            // If tokenArtical exists, redirect to another route (e.g., '/')
            router.replace('/');
        }
    }, [router]);

    // Render children only if user is not authenticated
    return <>{children}</>;
};
