import {
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import i18n from "@/locales/config";

export default function Settings(props: {
  open: boolean;
  close: () => void;
  theme: string;
  setTheme: (theme: string) => void;
  language: string;
  setLanguage: (language: string) => void;
}) {
  const [prevLanguage, setPrevLanguage] = useState(props.language);
  const [prevTheme, setPrevTheme] = useState(props.theme);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setPrevLanguage(props.language);
    i18n.changeLanguage(event.target.value as string);
    props.setLanguage(i18n.language);
  };

  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    setPrevTheme(props.theme);
    props.setTheme(event.target.value as string);
    localStorage.setItem("theme", event.target.value as string);
  };

  const handleSave = () => {
    setPrevLanguage(props.language);
    setPrevTheme(props.theme);
    props.close();
  };
  const handleCancel = () => {
    i18n.changeLanguage(prevLanguage);
    props.setLanguage(prevLanguage);
    props.setTheme(prevTheme);
    props.close();
  };

  useEffect(() => {
    setPrevLanguage(props.language);
    setPrevTheme(props.theme);
  }, [props.open]);

  return (
    <Modal open={props.open} onClose={handleCancel}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-center bg-white dark:bg-zinc-800 rounded-lg w-11/12 md:w-1/2 ">
        <div className="flex flex-col p-4 space-y-2">
          <h1 className="text-2xl font-bold dark:text-white">
            {i18n.t("settings.title")}
          </h1>
          <div>
            <InputLabel id="LanguageLabel">
              {i18n.t("settings.language")}
            </InputLabel>
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
          <div>
            <InputLabel id="themeLabel">
              {i18n.t("settings.theme.title")}
            </InputLabel>
            <Select
              labelId="themeLabel"
              id="theme"
              value={props.theme}
              onChange={handleThemeChange}
              className="w-full"
            >
              <MenuItem value="light">
                {i18n.t("settings.theme.light")}
              </MenuItem>
              <MenuItem value="dark">{i18n.t("settings.theme.dark")}</MenuItem>
            </Select>
          </div>
          <div className="flex flex-row-reverse space-x-reverse space-x-2 mt-2">
            <Button
              style={{ textTransform: "none" }}
              variant="contained"
              onClick={handleSave}
            >
              {i18n.t("button.save")}
            </Button>
            <Button style={{ textTransform: "none" }} onClick={handleCancel}>
              {i18n.t("button.cancel")}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
