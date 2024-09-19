import React from "react";

type ChipProps = {
  data: string;
  color: string;
};

const Chip = ({ data, color }: ChipProps) => {
  return (
    <span
      className="inline-block py-1 px-3 rounded-full text-white"
      style={{ backgroundColor: color }}
    >
      {data}
    </span>
  );
};

export default Chip;
