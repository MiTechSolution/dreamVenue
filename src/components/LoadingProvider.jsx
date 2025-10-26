'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loader from './Loader';

export default function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Show loader for initial page load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show loader on every route change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000); // loader duration per page
    return () => clearTimeout(timer);
  }, [pathname]); // triggers whenever route (page) changes

  if (isLoading) return <Loader />;

  return <>{children}</>;
}
