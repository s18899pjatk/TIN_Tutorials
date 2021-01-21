import React, { useContext, useEffect, useState } from "react";
import LanguageContext from "../../services/languageContext";

function LanguageSwitcherSelector({ lang, handleChangeLanguage }) {
  const languages = [
    { code: "en", name: "English" },
    { code: "rus", name: "Русский" },
    { code: "pl", name: "Polski" },
  ];

  const [options, setOptions] = useState([]);
  const { setLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const opts = getOptions();
    setOptions(opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const getOptions = () => {
    const opts = languages.map((language) => {
      if (language.code !== lang) {
        return (
          <li key={language.code} onClick={onChange}>
            <div value={language.code} className={language.code}></div>
          </li>
        );
      } else return null;
    });
    return opts;
  };

  const onChange = (e) => {
    handleChangeLanguage(e.target.className);
    setLanguage(e.target.className);
  };

  return (
    <div className="lang">
      <div className={lang}></div>
      <ul className="dropdown">{options}</ul>
    </div>
  );
}

export default LanguageSwitcherSelector;
