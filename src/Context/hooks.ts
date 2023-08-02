import { useContext } from "react";

import AppContext, { IAppCtx } from "Context";

export const useAppContext = (): IAppCtx => {
  return useContext(AppContext);
};
