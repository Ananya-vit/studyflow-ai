import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Prevents layout shifts during font loading
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Personalized metadata matching your app identity
export const metadata: Metadata = {
  title: "StudyFlow — The Modern Paradigm For Academic Throughput",
  description: "Work smarter with your own academic assistant. Upload documents to get personalized quizzes, smart flashcards, summaries, and customized study planners.",
  icons: {
    icon: "/favicon.ico", // Ensure you add your custom icon or generic favicon here
  },
};

// Separating viewport config is a Next.js best practice
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020617" }, // slate-950
    { media: "(prefers-color-scheme: light)", color: "#fbf9f4" }, // your warm light bg
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning // Prevents browser/server warnings due to dynamic theme switching class updates
    >
      <body className="bg-slate-950 text-slate-100 min-h-screen selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}