"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const userToken = localStorage.getItem('tokenArtical');
    if (!userToken) {
      router.replace('/signin');
    }
  }, [router]);

  return <>{children}</>;
}

export default ProtectedRoute;
