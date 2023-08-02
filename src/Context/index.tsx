import React, { createContext } from "react";

export interface IAppCtx {
  query: string;
  setQuery: (val: string) => void;
  refreshInterval: number;
}

const AppContext = createContext<IAppCtx>({} as IAppCtx);
const { Provider } = AppContext;

export interface IAppProvider extends IAppCtx {
  children?: React.ReactNode;
}

export const AppProvider: React.FC<IAppProvider> = ({
  children,
  ...restProps
}) => {
  return <Provider value={{ ...restProps }}>{children}</Provider>;
};

export default AppContext;
