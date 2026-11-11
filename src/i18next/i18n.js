import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import translationEN from "../public/locales/en/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
};
i18n.use(reactI18nextModule).init({
  resources,
  fallbackLng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;

//https://react.i18next.com/legacy-v9/step-by-step-guide
