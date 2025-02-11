import {
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState, ReactNode, useEffect } from "react";
import i18n from "@/locales/config";

export default function Settings(props: { open: boolean; close: () => void }) {
  console.log(i18n.language);
  const [language, setLanguage] = useState(i18n.language);
  const [languageSelectText, setLanguageSelectText] = useState<string>(
    i18n.language
  );
  const [theme, setTheme] = useState("light");

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguageSelectText(event.target.value as string);
    i18n.changeLanguage(event.target.value as string);
  };

  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    setTheme(event.target.value as string);
  };

  const handleSave = () => {
    setLanguage(i18n.language);
    localStorage.setItem("i18nextLng", i18n.language);
    props.close();
  };
  const handleCancel = () => {
    i18n.changeLanguage(language);
    props.close();
  };

  useEffect(() => {
    setLanguageSelectText(i18n.language);
  }, [i18n.language]);

  return (
    <Modal open={props.open} onClose={handleCancel}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-center bg-white rounded-lg w-11/12 md:w-1/2 ">
        <div className="flex flex-col p-4">
          <h1 className="text-2xl font-bold mb-2">
            {i18n.t("settings.title")}
          </h1>
          <div>
            <InputLabel id="LanguageLabel">
              {i18n.t("settings.language")}
            </InputLabel>
            <Select
              labelId="languageLabel"
              id="language"
              label="Theme"
              value={languageSelectText}
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
              label="Theme"
              value={theme}
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
            <button
              className="p-2 min-w-20 rounded-xl text-white bg-blue-500"
              onClick={handleSave}
            >
              {i18n.t("button.save")}
            </button>
            <button
              className="text-gray-600 p-2 min-w-20 rounded-xl hover:bg-gray-200"
              onClick={handleCancel}
            >
              {i18n.t("button.cancel")}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
