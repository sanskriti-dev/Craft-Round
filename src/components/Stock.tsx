import React, { useEffect, useState } from "react";

import { GetStockDetails } from "Services";
import useService from "hooks/useService";
import Box from "components/Box";
import DetailItem from "components/DetailItem";
import { useAppContext } from "Context/hooks";
import Typography from "./Typography";

const Stock: React.FC = () => {
  const { query, refreshInterval } = useAppContext();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timer>();

  const [data, , loading] = useService(
    GetStockDetails,
    [refresh, query],
    !query
  );

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);
    if (refreshInterval) {
      const id = setInterval(() => {
        setRefresh((val) => !val);
      }, refreshInterval * 1000);
      setTimeoutId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshInterval]);

  if (!query) return <></>;

  return (
    <Box
      padding="16px"
      borderRadius="16px"
      backgroundColor="#272E35"
      display="flex"
      flexDirection="column"
      gap="8px"
      border="1px solid rgba(255 ,255, 255, 0.2)"
    >
      {data && data.Name ? (
        <>
          <DetailItem
            title="Name"
            value={`${data.Name} (${data.Symbol})`}
            loading={loading}
          />
          <DetailItem
            title="Industry"
            value={data.Industry}
            loading={loading}
          />
          <DetailItem
            title="Current Price"
            value={data.AnalystTargetPrice}
            loading={loading}
          />
          <DetailItem title="PE Ratio" value={data.PERatio} loading={loading} />
          <DetailItem
            title="Market Cap"
            value={data.MarketCapitalization}
            loading={loading}
          />
          <DetailItem
            title="Description"
            value={data.Description}
            flexDirection="column"
            expandable
            loading={loading}
          />
        </>
      ) : (
        <Typography>No Data found</Typography>
      )}
    </Box>
  );
};

export default Stock;
