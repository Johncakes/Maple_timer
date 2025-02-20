// components/FixedHeader.tsx
import { AppBar, IconButton } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import SettingsIcon from "@mui/icons-material/Settings";
import i18n from "@/locales/config";

export default function MainHeader(props: {
  showEdit: boolean;
  openEdit: () => void;
  openSettings: () => void;
}) {
  return (
    <AppBar
      position="sticky"
      className="p-4 shadow-none border-b-2 w-screen dark:border-zinc-700 items-center"
      color="default"
      sx={{ boxShadow: 0 }}
    >
      <div className="container flex justify-between items-center max-w-screen-md">
        <div className="text-2xl font-bold text-blue-500">
          {i18n.t("title")}
        </div>
        <div>
          <IconButton onClick={props.openEdit}>
            {props.showEdit ? <EditOffIcon /> : <EditIcon />}
          </IconButton>
          <IconButton onClick={props.openSettings}>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
    </AppBar>
  );
}
