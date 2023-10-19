import { redirect } from 'next/navigation';
import getCurrentUser from '../actions/getCurrentUser';
import Navbar from '@/components/navbar';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/login');
    }

    return (
        <div className="relative flex min-h-screen">
            <div className="flex-1">
                <div className=" flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                    <Navbar currentUser={currentUser} />

                    {children}
                </div>
            </div>
        </div>
    );
}
