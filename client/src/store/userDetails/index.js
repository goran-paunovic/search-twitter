export const initialState = {
  loading: false,
  error: null,
  user: {
    name: "User details",
    screen_name: "screen_name",
    statuses_count: null,
  },
};

export const Actions = {
  FETCH_USER_START: "FETCH_USER_START",
  FETCH_USER_SUCCESS: "FETCH_USER_SUCCESS",
  FETCH_USER_ERROR: "FETCH_USER_ERROR",
  FETCH_USER_END: "FETCH_USER_END",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Actions.FETCH_USER_START:
      console.log("FETCH_USER_START");
      return {
        ...state,
        loading: true,
      };
    case Actions.FETCH_USER_SUCCESS:
      console.log("FETCH_USER_SUCCESS");
      return {
        ...state,
        error: null,
        user: action.payload.user,
      };

    case Actions.FETCH_USER_END:
      console.log("FETCH_USER_END");
      return {
        ...state,
        loading: false,
      };
    case Actions.FETCH_USER_ERROR:
      console.log("FETCH_USER_ERROR");
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
};
