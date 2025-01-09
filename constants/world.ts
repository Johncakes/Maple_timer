import i18n from "@/locales/config";

const WORLDS = (world: string) => {
  switch (world) {
    case "스카니아":
      return i18n.t("world.scania");
    case "루나":
      return i18n.t("world.luna");
    case "엘리시움":
      return i18n.t("world.elysium");
    case "크로아":
      return i18n.t("world.croa");
    case "베라":
      return i18n.t("world.bera");
    case "오로라":
      return i18n.t("world.aurora");
    default:
      return world;
  }
};

export { WORLDS };
