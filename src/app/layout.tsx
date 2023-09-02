import "./globals.css";
import type { Metadata } from "next";
import { BiMenu, BiSolidUserCircle, BiSolidDownArrow } from "react-icons/bi";

export const metadata: Metadata = {
  title: "Learning api",
  description: "Learning api Toto Jati Wijayanto",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen">
        <nav className="bg-red-500 sticky flex flex-row justify-between p-3 px-10">
          <BiMenu size="2em" color="#fff" />
          <span className="flex flex-row items-center text-white gap-1">
            <BiSolidUserCircle size="2em" />
            <button className="flex flex-row items-center gap-2">
              User <BiSolidDownArrow size=".5em" />
            </button>
          </span>
        </nav>
        {children}
      </body>
    </html>
  );
}
