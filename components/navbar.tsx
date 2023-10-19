'use client';

import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { SafeUser } from '@/types';

interface NavbarProps {
    currentUser?: SafeUser;
}

const Navbar: React.FC<NavbarProps> = async ({ currentUser }) => {
    const pathname = usePathname();

    const [loading, setLoading] = useState(false);
    const routes = [
        {
            href: `/`,
            label: 'Overview',
            active: pathname === `/`,
        },
        {
            href: `/billboards`,
            label: 'Billboards',
            active: pathname === `/billboards`,
        },
    ];
    const onSubmit = async () => {
        try {
            setLoading(true);
            await signOut({
                callbackUrl: '/login',
            });
        } catch (err) {}
    };
    return (
        <>
            <aside className="fixed top-0 left-0 z-30 hidden w-full h-screen p-4 transition border-r shrink-0 md:sticky md:block">
                <ScrollArea className="relative h-full overflow-hidden">
                    {currentUser?.email + '님 어서오세요'}
                    <Button disabled={loading} onClick={onSubmit}>
                        로그아웃
                    </Button>
                    <ThemeToggle />
                    <div className="flex flex-col gap-4 py-4">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    'text-sm font-medium transition-colors hover:text-primary',
                                    route.active
                                        ? 'text-black dark:text-white'
                                        : 'text-muted-foreground'
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
            </aside>
        </>
    );
};

export default Navbar;
