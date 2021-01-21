import React from "react";
import { CardColumns } from "react-bootstrap";
import ProductCard from "./productCard";

const ProductBlock = ({ products, onDelete, onPurchase }) => {
  return (
    <CardColumns>
      {products.map((item) => (
        <ProductCard
          key={item._id}
          item={item}
          onDelete={onDelete}
          onPurchase={onPurchase}
        />
      ))}
    </CardColumns>
  );
};

export default ProductBlock;
