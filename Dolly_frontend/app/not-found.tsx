"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-8xl font-black">404</h1>

      <p className="mt-4 text-xl">This page wandered off.</p>
      <Link href="/">
        <Button className="mt-8">Go home</Button>
      </Link>
    </main>
  );
}
