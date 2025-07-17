// components/ClientLayout.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuth(); // triggers auto login

  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
    </>
  );
}
