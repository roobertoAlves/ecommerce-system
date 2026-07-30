import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "../globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    template: "Online Shopping | %s",
    default: "Online Shopping ",
  },
  description:
    "Your one-stop online shopping destination for all your needs. Discover a wide range of products, from fashion and electronics to home essentials, all at competitive prices. Enjoy a seamless shopping experience with fast delivery and excellent customer service.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1f">{children}</main>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
