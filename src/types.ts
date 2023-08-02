// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IError {
  name: string;
  message: string;
  code: string;
  stack: string;
  data?: unknown;
}

export interface IStockDetail {
  Symbol: string;
  Name: string;
  Description: string;
  Industry: string;
  PERatio: string;
  MarketCapitalization: string;
  AnalystTargetPrice: string;
}

export interface ISearchList {
  bestMatches: Array<ISearchOption>;
}

export interface ISearchOption {
  "1. symbol": string;
  "2. name"?: string;
}
