// components/FixedHeader.tsx
import { AppBar, IconButton } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import i18n from "@/locales/config";

export default function MainHeader(props: {
  openEdit: () => void;
  openSettings: () => void;
}) {
  // <header className="fixed top-0 left-0 w-full bg-white dark:bg-zinc-800 dark:border-zinc-600 p-4 border-b-2 z-50">
  // </header>
  return (
    <AppBar
      position="sticky"
      className="p-4 bg-white shadow-none border-b-2 dark:border-zinc-700 dark:bg-stone-950"
    >
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
    </AppBar>
  );
}
