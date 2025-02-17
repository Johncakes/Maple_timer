import {
  Button,
  ButtonGroup,
  MenuItem,
  Modal,
  PaletteMode,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import i18n from "@/locales/config";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Settings(props: {
  open: boolean;
  close: () => void;
  theme: string;
  setTheme: (theme: PaletteMode) => void;
  language: string;
  setLanguage: (language: string) => void;
}) {
  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value as string);
    props.setLanguage(i18n.language);
  };

  const handleThemeChange = (theme: PaletteMode) => {
    localStorage.setItem("theme", theme);
    props.setTheme(theme);
  };

  return (
    <Modal open={props.open} onClose={props.close}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-center bg-white dark:bg-zinc-800 rounded-lg w-11/12 md:w-1/2 ">
        <div className="flex flex-col p-4 space-y-2">
          <h1 className="text-2xl font-bold dark:text-white">
            {i18n.t("settings.title")}
          </h1>
          <div className="flex flex-col space-y-1">
            <text>{i18n.t("settings.theme.title")}</text>
            <ButtonGroup fullWidth>
              <Button
                style={{ textTransform: "none" }}
                variant={props.theme === "light" ? "contained" : "outlined"}
                color={props.theme === "light" ? "primary" : "secondary"}
                key="light"
                startIcon={<LightModeIcon />}
                size="small"
                sx={{ p: 1 }}
                onClick={() => handleThemeChange("light")}
              >
                {i18n.t("settings.theme.light")}
              </Button>
              <Button
                style={{ textTransform: "none" }}
                variant={props.theme === "dark" ? "contained" : "outlined"}
                color={props.theme === "dark" ? "primary" : "secondary"}
                key="dark"
                startIcon={<ModeNightIcon />}
                size="small"
                sx={{ p: 1 }}
                onClick={() => handleThemeChange("dark")}
              >
                {i18n.t("settings.theme.dark")}
              </Button>
            </ButtonGroup>
          </div>
          <div className="flex flex-col space-y-1">
            <text>{i18n.t("settings.language")}</text>
            <Select
              labelId="languageLabel"
              id="language"
              value={props.language}
              onChange={handleLanguageChange}
              className="w-full"
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ko">한국어</MenuItem>
            </Select>
          </div>
          <div className="flex flex-row-reverse space-x-reverse space-x-2 mt-2">
            <Button
              style={{ textTransform: "none" }}
              variant="text"
              onClick={props.close}
            >
              {i18n.t("button.save")}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
