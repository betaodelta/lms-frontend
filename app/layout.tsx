// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "LMS",
  description: "Learn and grow with our courses",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
