"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold">✅ Payment successful!</h1>
      <p className="text-muted-foreground">Thank you for your purchase.</p>
      <Link href="/">Return to homepage</Link>
    </div>
  );
}
