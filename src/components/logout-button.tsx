"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";

const LogoutBtn = () => {
  const [loading, setLoading] = useState(false); // To handle loading state while logging out
  const handleLogout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center justify-center p-0 bg-transparent border-none"
    >
      <LogOut className="text-[#05060c] text-2xl font-light" />
    </button>
  );
};

export default LogoutBtn;
