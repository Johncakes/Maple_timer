// components/FixedHeader.tsx
import { IconButton } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import i18n from "@/locales/config";

export default function MainHeader(props: {
  openEdit: () => void;
  openSettings: () => void;
}) {
  return (
    <header className="fixed top-0 left-0 w-full bg-white text-white p-4 border-b-2 z-50">
      <div className="container flex justify-between items-center ">
        <div className="text-2xl font-bold text-blue-500">
          {i18n.t("title")}
        </div>
        <div>
          <IconButton onClick={props.openEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={props.openSettings}>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
