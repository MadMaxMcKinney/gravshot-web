import type { Metadata } from "next";
import "./globals.css";

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
            <body className={`antialiased`}>{children}</body>
        </html>
    );
}
