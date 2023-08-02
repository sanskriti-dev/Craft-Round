import React from "react";
import Box from "./Box";

interface IProps {
  width?: number | string;
  height?: number | string;
}

const Skeleton: React.FC<IProps> = ({ width, height }) => {
  return <Box width={width} height={height} className="skeleton"></Box>;
};

export default React.memo(Skeleton);
