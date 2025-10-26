import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoadingProvider from "@/components/LoadingProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GrandVenue Hall - Luxury Wedding Venue",
  description: "Premier luxury wedding venue offering exquisite events and unforgettable experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
