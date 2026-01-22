
'use client';
import { useAuth, AuthProvider } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AppLayout from '@/components/layout/app-layout';


function StyleGuideContent({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
        router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return null; // or a loading skeleton
    }
    return (
        <AppLayout>
            {children}
        </AppLayout>
    );
}

export default function StyleGuideLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <StyleGuideContent>{children}</StyleGuideContent>
        </AuthProvider>
    );
}
