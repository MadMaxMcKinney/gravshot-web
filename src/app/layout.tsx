import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "Gravshot",
    description: "Code screenshots with serious gravity.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                {children}
                <Toaster position="top-center" />
            </body>
        </html>
    );
}
