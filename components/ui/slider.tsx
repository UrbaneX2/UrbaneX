import React, { useState } from "react";
import { Slider } from "@nextui-org/react";

export default function Sliders() {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  return (
    <div className="flex flex-col items-center px-5 w-full max-w-md">
      <label htmlFor="difficulty" className="mb-2">
        How Often do you face this issue?
      </label>
      <Slider
        id="difficulty"
        size="md"
        step={1}
        maxValue={5}
        minValue={1}
        aria-label="Difficulty"
        defaultValue={1}
        className="max-w-md"
        onChange={handleSliderChange}
      />
      <br />
      <span className="text">{`${sliderValue} / 5`}</span>
    </div>
  );
}