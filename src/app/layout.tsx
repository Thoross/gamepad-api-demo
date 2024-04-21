import "~/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Gamepad API Demo",
  description: "Connect a controller and see it's button mappings",
  icons: [{ rel: "icon", url: "/ps4/controller_playstation4.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-black`}>{children}</body>
    </html>
  );
}
