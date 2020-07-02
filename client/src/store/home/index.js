export const initialState = {
  term: "",
  tweets: [],
  scrollTop: 0,
  loading: false,
  hasMore: true,
  max_id: null,
  error: null,
};

export const Actions = {
  SET_SCROLL_POSITION: "SET_SCROLL_POSITION",
  SEARCH_START: "SEARCH_START",
  SEARCH_SUCCESS: "SEARCH_SUCCESS",
  SEARCH_MORE_SUCCESS: "SEARCH_MORE_SUCCESS",
  SEARCH_ERROR: "SEARCH_ERROR",
  SEARCH_END: "SEARCH_END",
  SEARCH_TERM_CHANGED: "SEARCH_TERM_CHANGED",
  SEARCH_TERM_CLEARED: "SEARCH_TERM_CLEARED",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Actions.SET_SCROLL_POSITION:
      return {
        ...state,
        scrollTop: action.payload.scrollTop,
      };
    case Actions.SEARCH_TERM_CHANGED:
      return {
        ...state,
        term: action.payload.term,
      };
    case Actions.SEARCH_TERM_CLEARED:
      console.log("ACTION SEARCH_TERM_CLEARED");
      return {
        ...state,
        term: "",
        tweets: [],
        max_id: null,
        hasMore: false,
        error: null,
      };
    case Actions.SEARCH_START:
      console.log("ACTION SEARCH_START");
      return {
        ...state,
        loading: true,
      };
    case Actions.SEARCH_SUCCESS:
      console.log("ACTION SEARCH_SUCCESS");
      return {
        ...state,
        error: null,
        tweets: action.payload.tweets,
        max_id: action.payload.max_id,
        hasMore:
          action.payload.max_id === null || action.payload.max_id === ""
            ? false
            : true,
      };
    case Actions.SEARCH_MORE_SUCCESS:
      return {
        ...state,
        error: null,
        tweets: [...state.tweets, ...action.payload.tweets],
        max_id: action.payload.max_id,
        hasMore:
          action.payload.max_id === null || action.payload.max_id === ""
            ? false
            : true,
      };
    case Actions.SEARCH_END:
      console.log("ACTION SEARCH_END");
      return {
        ...state,
        loading: false,
      };
    case Actions.SEARCH_ERROR:
      console.log("ACTION SEARCH_ERROR");
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return { ...state };
  }
};
