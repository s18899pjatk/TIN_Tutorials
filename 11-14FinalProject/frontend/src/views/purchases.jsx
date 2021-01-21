import React, { useContext, useEffect, useState } from "react";
import { getPurchases } from "../services/purchase";
import AuthContext from "../services/authContext";
import PurchaseTable from "../components/purchaseTable";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.user !== null) {
      retrievePurchases();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext]);

  const retrievePurchases = async () => {
    const { data: p } = await getPurchases();
    const id = authContext.user._id;
    setPurchases(p.filter((e) => e.user._id === id));
    return p;
  };

  return (
    <div>
      <PurchaseTable purchases={purchases} />
    </div>
  );
};

export default Purchases;
