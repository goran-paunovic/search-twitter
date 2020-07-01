import React, { createContext, useReducer, useContext } from "react";

const StoreContext = createContext();
const initialState = {
  home: {
    term: "",
    tweets: [],
    scrollTop: 0,
    loading: false,
    hasMore: true,
    max_id: null,
    error: null,
  },
};

export const SET_SCROLL_POSITION = "SET_SCROLL_POSITION";
export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_MORE_SUCCESS = "SEARCH_MORE_SUCCESS";
export const SEARCH_ERROR = "SEARCH_ERROR";
export const SEARCH_END = "SEARCH_END";
export const SEARCH_TERM_CHANGED = "SEARCH_TERM_CHANGED";
export const SEARCH_TERM_CLEARED = "SEARCH_TERM_CLEARED";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_SCROLL_POSITION:
      return {
        home: {
          ...state.home,
          scrollTop: action.payload.scrollTop,
        },
      };
    case SEARCH_TERM_CHANGED:
      return {
        home: {
          ...state.home,
          term: action.payload.term,
        },
      };
    case SEARCH_TERM_CLEARED:
      return {
        home: {
          ...state.home,
          term: "",
          tweets: [],
          max_id: null,
        },
      };
    case SEARCH_START:
      return {
        home: {
          ...state.home,
          loading: true,
        },
      };
    case SEARCH_SUCCESS:
      return {
        home: {
          ...state.home,
          tweets: action.payload.tweets,
          max_id: action.payload.max_id,
        },
      };
    case SEARCH_MORE_SUCCESS:
      return {
        home: {
          ...state.home,
          tweets: [...state.home.tweets, ...action.payload.tweets],
          max_id: action.payload.max_id,
        },
      };
    case SEARCH_END:
      return {
        home: {
          ...state.home,
          loading: false,
        },
      };
    case SEARCH_ERROR:
      return {
        home: {
          ...state.home,
          error: action.payload.error,
          loading: false,
        },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
