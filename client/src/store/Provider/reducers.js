import * as home from "../home/";
import * as userDetails from "../userDetails/";

export const initialState = {
  home: home.initialState,
  userDetails: userDetails.initialState,
};

export const reducers = (state, action) => ({
  home: home.reducer(state.home, action),
  userDetails: userDetails.reducer(state.userDetails, action),
});
