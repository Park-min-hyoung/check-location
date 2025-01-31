import { useState } from "react";

export const useEx = () => {
  const [ex, setEx] = useState(0);

  const increase = () => {
    setEx(ex + 1);
  };

  const decrease = () => {
    setEx(ex - 1);
  };

  return { ex, increase, decrease };
};
