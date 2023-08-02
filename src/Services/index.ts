import { ISearchList, IStockDetail } from "types";

import { Get } from "utils/Request";

const key = "SHRQHGPDBPFOJKPJ";

export const GetSearchSymbol = async (keyword: string): Promise<ISearchList> =>
  Get(`query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${key}`);

export const GetStockDetails = async (
  _refresh: boolean,
  payload: string
): Promise<IStockDetail> =>
  Get(`query?function=OVERVIEW&symbol=${payload}&apikey=${key}`);
