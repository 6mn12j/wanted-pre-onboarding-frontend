import { useEffect, useState } from "react";

export const useInput = ({ initialValue }: { initialValue: string }) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setValue(value);
  };

  useEffect(() => {});

  return { value, onChange };
};
