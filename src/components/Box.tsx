import React from "react";

interface IProps extends React.CSSProperties {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Box: React.FC<IProps> = ({ children, onClick, className, ...props }) => {
  return (
    <div style={{ ...props }} onClick={onClick} className={className}>
      {children}
    </div>
  );
};

export default React.memo(Box);
