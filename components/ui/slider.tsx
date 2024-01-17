import React from "react";
import { Slider } from "@nextui-org/react";

export default function Sliders() {
  return (
    <div className="flex flex-col px-5 w-full max-w-md">
      <Slider
        size="md"
        step={0.01}
        maxValue={1}
        minValue={0}
        aria-label="Temperature"
        defaultValue={0.4}
        className="max-w-md"
      />
    </div>
  );
}
