import "react-bootstrap-typeahead/css/Typeahead.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useSearchParams } from "react-router-dom";
import { Option } from "react-bootstrap-typeahead/types/types";

import { GetSearchSymbol } from "Services";
import Axios, { CancelTokenSource } from "axios";

interface Props {
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

type IOption = {
  id: number;
  value: string;
};

const SearchBox: React.FC<Props> = ({ setValue }) => {
  const [options, setOptions] = useState<Array<IOption>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<Array<IOption>>([]);
  const Source = useRef<CancelTokenSource>();

  const handleValueChange = (e: Array<Option>) => {
    if (!e.length) return setSelected([]);
    const val = typeof e[0] === "string" ? e[0] : Reflect.get(e[0], "value");
    setValue(val);
    if (!val) return setSelected([]);
    setSearchParams({
      stock: val,
    });
    setSelected([val]);
  };

  const renderOption = (option: Option) => {
    const val =
      typeof option === "string" ? option : Reflect.get(option, "value");
    return (
      <div key={val}>
        <span>{val}</span>
      </div>
    );
  };

  const getSearchOptions = async (q: string, queryParamSelect?: boolean) => {
    setIsLoading(true);
    try {
      if (Source.current) {
        Source.current.cancel();
      }
      Source.current = Axios.CancelToken.source();

      const response = await GetSearchSymbol(q, Source.current.token);

      if (response.bestMatches) {
        let optionValues: Array<IOption> = [];
        optionValues = response.bestMatches.map((ele, index) => ({
          id: index,
          value: ele?.["1. symbol"],
        }));
        setOptions(optionValues);
        if (queryParamSelect) {
          setSelected(optionValues.filter((i) => i.value === q));
          setValue(q);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
    setIsLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(getSearchOptions, []);

  useEffect(() => {
    if (!searchParams) return;
    const stockQueryValue = searchParams.get("stock");
    if (!stockQueryValue) return;
    (async () => {
      await getSearchOptions(stockQueryValue, true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      <AsyncTypeahead
        id="search-box"
        isLoading={isLoading}
        labelKey="value"
        onSearch={handleSearch}
        options={options}
        placeholder="Search stock symbol..."
        onChange={handleValueChange}
        selected={selected}
        renderMenuItemChildren={renderOption}
        useCache={false}
        delay={5}
      />
    </>
  );
};

export default SearchBox;
