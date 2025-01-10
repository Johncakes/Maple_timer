// components/FixedHeader.tsx
import { IconButton } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";

export default function MainHeader() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white text-white p-4 border-b-2 z-50">
      <div className="container flex justify-between items-center ">
        <div className="text-2xl font-bold text-blue-500">Maple Timer</div>
        <div>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
