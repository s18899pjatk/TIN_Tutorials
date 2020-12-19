import React, { useState } from "react";
import Input from "../components/Input";

const TemperatureConverter = () => {
  const [temperature, setTemperature] = useState({ c: 0, f: 32.0, k: 273.15 });

  const updateC = (value) => {
    setTemperature({
      c: value,
      f: ((+value * 9) / 5 + 32).toFixed(2),
      k: (+value + 273.15).toFixed(2),
    });
  };
  const updateF = (value) => {
    setTemperature({
      c: (((+value - 32) * 5) / 9).toFixed(2),
      f: value,
      k: (((+value - 32) * 5) / 9 + 273.15).toFixed(2),
    });
  };

  const updateK = (value) => {
    setTemperature({
      c: (+value - 273.15).toFixed(2),
      f: (((+value - 273.15) * 9) / 5 + 32).toFixed(2),
      k: value,
    });
  };

  return (
    <div>
      <Input
        value={temperature.c}
        caption="Temperature in Celsius"
        onChange={updateC}
      />

      <Input
        value={temperature.f}
        caption="Temperature in Fahrenheit"
        onChange={updateF}
      />

      <Input
        value={temperature.k}
        caption="Temperature in Kelvin"
        onChange={updateK}
      />
    </div>
  );
};

export default TemperatureConverter;
