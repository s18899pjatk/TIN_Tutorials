import React, { useContext } from "react";
import LanguageContext from "../../services/languageContext";
import { getTranslation } from "../../services/vocabulary";

const SearchBox = ({ value, onChange }) => {
  const { language } = useContext(LanguageContext);

  return (
    <input
      type="text"
      name="query"
      className="form-control mb-3"
      placeholder={getTranslation(language, "Search")}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};
export default SearchBox;
