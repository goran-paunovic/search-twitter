import React, { createContext, useReducer } from "react";
import { reducers, initialState } from "./reducers";
/**
 * Create store context
 */
export const StoreContext = createContext();

/**
 * Create a Store.Provider wrapper component
 */
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
