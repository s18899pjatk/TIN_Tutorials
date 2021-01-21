import React, { useContext } from "react";
import LanguageContext from "../../services/languageContext";
import { getTranslation } from "../../services/vocabulary";

const ListGroup = ({
  items,
  textProperty,
  itemProperty,
  onItemSelect,
  selectedItem,
}) => {
  const { language } = useContext(LanguageContext);

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[itemProperty]}
          className={
            item === selectedItem
              ? "list-group-item active"
              : "list-group-item "
          }
        >
          {getTranslation(language, item[textProperty])}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  itemProperty: "_id",
};

export default ListGroup;
