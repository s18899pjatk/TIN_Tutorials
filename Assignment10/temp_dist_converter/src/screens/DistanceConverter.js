import React, { useState } from "react";
import Input from "../components/Input";

const DistanceConverter = () => {
  const [distance, setDistance] = useState({ k: 0, m: 0 });

  const updateK = (value) => {
    setDistance({
      k: value,
      m: (+value / 1.609).toFixed(2),
    });
  };
  const updateM = (value) => {
    setDistance({
      k: (+value * 1.609).toFixed(2),
      m: value,
    });
  };
  return (
    <div>
      <Input
        value={distance.k}
        caption="Distance in Kilometers"
        onChange={updateK}
      />

      <Input
        value={distance.m}
        caption="Distance in Miles"
        onChange={updateM}
      />
    </div>
  );
};

export default DistanceConverter;
