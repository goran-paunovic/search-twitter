import React from "react";

const initialContext = {
  home: {},
  userDetails: {},
};

export const AppContext = React.createContext();

export const AppProvider = (props) => (
  <AppContext.Provider value={{ ...initialContext }}>
    {props.children}
  </AppContext.Provider>
);
