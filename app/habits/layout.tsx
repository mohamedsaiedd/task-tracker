'use client'
import { Header } from '@/components/layout/header';
import { useUser } from '@auth0/nextjs-auth0';


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
const { user, isLoading } = useUser()

    return (
        <>
            <Header user={user} />
            {children}
        </>
    );
}