import React, { useContext, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../services/authContext";
import LanguageContext from "../services/languageContext";
import { getTranslation } from "../services/vocabulary";

const ProductCard = ({ item, onDelete, onPurchase }) => {
  const [available, setAvailable] = useState(item.amountAvailable);
  const [disabled, setDisabled] = useState(false);

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (available <= 0) setDisabled(true);
  }, [available]);

  const handlePurchase = (user, item) => {
    onPurchase(user, item)
      .then(setAvailable(available - 1))
      .catch((ex) => {
        setAvailable(available);
        setDisabled(false);
      });
  };

  return (
    <Card>
      <Card.Img
        variant="top"
        src="https://www.mediaexpert.pl/media/cache/gallery/product/0/770/840/333/afmm9sic/images/26/2607349/APPLE-iPhone-12-Czarny-Front.jpg"
      />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Subtitle>
          <h5 style={{ color: "green" }}>{item.price + "$"}</h5>
          <p>
            {" "}
            {getTranslation(language, "Weight")}
            {": " + item.weight + "kg"}
          </p>
        </Card.Subtitle>
      </Card.Body>
      <AuthContext.Consumer>
        {({ user }) => (
          <>
            {user && (
              <Card.Footer>
                <p>
                  {" "}
                  {getTranslation(language, "Available")}
                  {":  " + available}
                </p>
                <Button
                  variant="dark"
                  onClick={() => handlePurchase(user, item)}
                  disabled={disabled}
                >
                  {getTranslation(language, "Buy")}
                </Button>
                {user.role.name === "Admin" && (
                  <>
                    <Link
                      className="btn btn-dark m-1"
                      to={`/products/${item._id}`}
                    >
                      {getTranslation(language, "Edit")}
                    </Link>
                    <Button variant="danger" onClick={() => onDelete(item)}>
                      {getTranslation(language, "Delete")}
                    </Button>
                  </>
                )}
              </Card.Footer>
            )}
          </>
        )}
      </AuthContext.Consumer>
    </Card>
  );
};

export default ProductCard;
