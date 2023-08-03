import { ISearchList, IStockDetail } from "types";

import { Get } from "utils/Request";
import { CancelToken } from "axios";

const key = "SHRQHGPDBPFOJKPJ";

export const GetSearchSymbol = async (
  keyword: string,
  cancelToken?: CancelToken
): Promise<ISearchList> =>
  Get(
    `query`,
    { function: "SYMBOL_SEARCH", apikey: key, keywords: keyword },
    cancelToken
  );

export const GetStockDetails = async (
  _refresh: boolean,
  payload: string,
  cancelToken?: CancelToken
): Promise<IStockDetail> =>
  Get(
    `query`,
    { function: "OVERVIEW", apikey: key, symbol: payload },
    cancelToken
  );
