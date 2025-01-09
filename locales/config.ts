import i18n from "i18next";

import translationEN from "./en/translation.json";

import translationKO from "./ko/translation.json";

i18n.init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: translationEN,
    },
    ko: {
      translation: translationKO,
    },
  },
});

export default i18n;
