"use client";

import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-red-500">❌ Payment canceled</h1>
      <p>Please try again or contact support.</p>
      <Link href="/">Return to homepage</Link>
    </div>
  );
}
