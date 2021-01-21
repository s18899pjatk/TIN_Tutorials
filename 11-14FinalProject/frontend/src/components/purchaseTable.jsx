import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import LanguageContext from "../services/languageContext";
import { getTranslation } from "../services/vocabulary";

const PurchaseTable = ({ purchases }) => {
  const { language } = useContext(LanguageContext);

  let count = 1;
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>{getTranslation(language, "Name")}</th>
          <th>{getTranslation(language, "Category")}</th>
          <th>{getTranslation(language, "Date")}</th>
          <th>{getTranslation(language, "Price")}</th>
        </tr>
      </thead>
      <tbody>
        {purchases.map((item) => (
          <tr key={item._id}>
            <td>{count++}</td>
            <td>{item.product.name}</td>
            <td>{getTranslation(language, item.product.category.name)}</td>
            <td>{item.date}</td>
            <td>{item.product.price + "$"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PurchaseTable;
