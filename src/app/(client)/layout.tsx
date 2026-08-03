import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";
import "../globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "Online Shopping | %s",
    default: "Online Shopping",
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
      <CurrencyProvider>
        <div className={`${poppins.variable} ${jetbrainsMono.variable} flex flex-col min-h-screen font-poppins`}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </CurrencyProvider>
    </ClerkProvider>
  );
}
