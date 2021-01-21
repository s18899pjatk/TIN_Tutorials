import React, { useState } from "react";
import LanguageSwitcherSelector from "./languageSwitcherSelector";

function LanguageSwitcher() {
  const [lang, setLang] = useState("en");

  const changeLanguageHandler = (lang) => {
    setLang(lang);
  };

  return (
    <div className="languageSwitcher">
      <LanguageSwitcherSelector
        lang={lang}
        handleChangeLanguage={changeLanguageHandler}
      />
    </div>
  );
}

export default LanguageSwitcher;
