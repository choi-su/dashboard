import './globals.css';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import SessionProviders from '@/components/SessionProviders';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ToastProvider } from '@/providers/ToastProvider';

export const metadata = {
    title: 'Dashboard',
    description: 'E-Commerce Dashboard',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProviders>
            <html lang="en">
                <body className={inter.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <ToastProvider />
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </SessionProviders>
    );
}
