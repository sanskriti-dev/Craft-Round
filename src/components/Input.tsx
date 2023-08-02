import React, { ChangeEvent } from "react";
import Box from "./Box";

interface IProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  type?: string;
  endAdornment?: React.ReactElement;
}

const style = {
  input: {
    outline: "none",
    border: "none",
  },
};

const Input: React.FC<IProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
  id,
  type = "text",
  endAdornment,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value =
      type === "tel" ? e.target.value.replace(/[^0-9]+/g, "") : e.target.value;
    onChange(value);
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      gap="8px"
      borderRadius="8px"
      height="38px"
      padding="6px 12px"
      background="#fff"
      justifyContent="space-between"
    >
      <input
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        type={type}
        style={style.input}
      />
      {endAdornment && endAdornment}
    </Box>
  );
};

export default React.memo(Input);
