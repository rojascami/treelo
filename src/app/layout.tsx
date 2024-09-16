import type { Metadata } from "next";
import { Red_Hat_Text } from 'next/font/google';
import "@/styles/globals.scss";

const RedHatText = Red_Hat_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Product List App",
  description: "Product List App from Frontend Mentor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${RedHatText.className}`}>

        <div className="container">
          
         
        {children}
        </div>
      </body>
    </html>
  );
}
