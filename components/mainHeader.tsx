// components/FixedHeader.tsx
import React from "react";

export default function MainHeader() {
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 text-white p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Pet Time Tracker</div>
      </div>
    </header>
  );
}
