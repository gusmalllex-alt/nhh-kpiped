import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KPI Pediatric - Nong Han Hospital",
  description: "ระบบติดตามตัวชี้วัด ตึกเด็ก โรงพยาบาลหนองหาน",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${prompt.variable} font-sans antialiased bg-slate-50 text-slate-900`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
