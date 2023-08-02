import { ISearchList, IStockDetail } from "types";

import { Get } from "utils/Request";

export const GetSearchSymbol = async (keyword: string): Promise<ISearchList> =>
  Get(
    `query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=SHRQHGPDBPFOJKPJ`
  );

export const GetStockDetails = async (
  _refresh: boolean,
  payload: string
): Promise<IStockDetail> =>
  Get(`query?function=OVERVIEW&symbol=${payload}&apikey=IAP8S08I17VAF8HB`);
