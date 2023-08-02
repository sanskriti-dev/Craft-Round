import React, { useState } from "react";

import Box from "components/Box";
import { AppProvider } from "Context";
import Input from "components/Input";
import Stock from "components/Stock";
import SearchBox from "components/SearchBox";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [refreshInterval, setRefreshInterval] = useState<number>(0);
  const [intervalInputValue, setIntervalValue] =
    useState<number>(refreshInterval);

  const handleIntervalChange = (val: string) => setIntervalValue(+val);

  const onIntervalSubmit = () => setRefreshInterval(intervalInputValue);

  const InputAdornment = (): React.ReactElement => {
    return (
      <Box
        background="#000"
        padding="4px"
        fontSize="12px"
        color="#fff"
        borderRadius="6px"
        onClick={onIntervalSubmit}
        cursor="pointer"
      >
        SET
      </Box>
    );
  };

  return (
    <AppProvider
      query={searchQuery}
      setQuery={setSearchQuery}
      refreshInterval={refreshInterval}
    >
      <Box display="flex" flexDirection="column" gap="16px" padding="32px">
        <SearchBox setValue={setSearchQuery} />
        <Input
          value={intervalInputValue ? intervalInputValue?.toString() : ""}
          onChange={handleIntervalChange}
          type="tel"
          placeholder="Refresh Interval"
          endAdornment={<InputAdornment />}
        />
        <Stock />
      </Box>
    </AppProvider>
  );
};

export default App;
