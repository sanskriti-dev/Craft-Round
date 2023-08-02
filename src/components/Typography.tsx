import React from "react";

interface IProps {
  fs?: number | string;
  fontWeight?: number;
  sx?: React.CSSProperties;
  children?: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

const Typography: React.FC<IProps> = ({
  fs = 16,
  fontWeight,
  sx,
  children,
  color = "#fff",
  onClick,
}) => {
  return (
    <div
      style={{ fontSize: fs, fontWeight: fontWeight, color: color, ...sx }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default React.memo(Typography);
