import React, { useState } from "react";
import Box from "./Box";
import Skeleton from "./Skeleton";
import Typography from "./Typography";

interface IProps {
  title: string;
  value: string | React.ReactElement;
  loading?: boolean;
  expandable?: boolean;
  flexDirection?: "row" | "column";
}

const useStyles = (
  isExpanded: boolean
): Record<string, React.CSSProperties> => {
  let styles: Record<string, React.CSSProperties> = {
    value: {
      textOverflow: ".show",
      overflow: "hidden",
      display: "-webkit-inline-box",
      whiteSpace: "normal",
    },
    showMore: {
      cursor: "pointer",
      color: "#0d6efd",
      textAlign: "end",
    },
  };
  const expand: React.CSSProperties = {
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
  };

  if (isExpanded) styles.value = { ...styles.value, ...expand };
  return styles;
};

const DetailItem: React.FC<IProps> = ({
  title,
  value,
  loading = false,
  expandable = false,
  flexDirection = "row",
}) => {
  const [isExpandable, setIsExpandable] = useState<boolean>(expandable);
  const style: Record<string, React.CSSProperties> = useStyles(isExpandable);

  const handleExpand = () => setIsExpandable((val) => !val);

  return (
    <Box
      display="flex"
      gap="4px"
      flexDirection={flexDirection}
      alignItems={flexDirection === "column" ? "left" : "center"}
    >
      <Typography fontWeight={600}>{title}:</Typography>

      {loading ? (
        <Skeleton width="50%" height={"15px"} />
      ) : (
        <Typography sx={{ ...style.value }}>{value}</Typography>
      )}
      {expandable && !loading && (
        <Typography onClick={handleExpand} sx={style.showMore}>
          View {isExpandable ? "More" : "Less"}
        </Typography>
      )}
    </Box>
  );
};

export default React.memo(DetailItem);
