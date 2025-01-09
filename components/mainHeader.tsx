// components/FixedHeader.tsx
import React from "react";

export default function MainHeader() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white text-white p-4 border-b-2 z-50">
      <div className="container mx-4 flex justify-cemter items-center ">
        <div className="text-2xl font-bold text-blue-500">Maple Timer</div>
      </div>
    </header>
  );
}
