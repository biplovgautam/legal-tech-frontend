"use client";

import React from "react";
import LogoutButton from "@/components/ui/LogoutButton";

export default function FirmDashboard() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Firm Admin Dashboard</h1>
        <LogoutButton />
      </div>
    </div>
  );
}
