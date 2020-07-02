import React, { useEffect } from "react";
import { PageHeader, Spin } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

import { UserDetailsCard } from "../../components/UserDetailsCard/UserDetailsCard";
import { formatTweetCount } from "../../util/formatTweetCount";
import { getUrlParameter } from "../../util/getUrlParameter";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useStore } from "../../store/useStore";
import { Actions } from "../../store/userDetails";

import "./UserDetails.css";

export const UserDetails = () => {
  const { state, dispatch } = useStore();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.user) {
      dispatch({
        type: Actions.FETCH_USER_SUCCESS,
        payload: { user: { ...location.state.user } },
      });
    } else {
      dispatch({ type: Actions.FETCH_USER_START });

      const user_id = getUrlParameter(location.search, "id");
      const scrname = getUrlParameter(location.search, "scrname");

      // User clicked search button or pressed Enter
      axios
        .get(process.env.REACT_APP_TWITTER_GET_USER_URL, {
          params: {
            id: user_id,
            scrname,
          },
        })
        .then((response) => {
          dispatch({
            type: Actions.FETCH_USER_SUCCESS,
            payload: { user: response.data },
          });
        })
        .catch((error) => {
          dispatch({ type: Actions.FETCH_USER_ERROR, payload: { error } });
        });
    }
  }, [location.search, location.state, dispatch]);

  const handleBackClick = () => {
    if (location.state) {
      // If location has state it's the signal that we came here
      // from home page by clicking on user's avatar.
      history.goBack();
    } else {
      // We are here because user typed the url of the user's profile page
      history.push("/");
    }
  };

  return (
    <div className="page-container">
      <PageHeader
        className="page-header"
        onBack={handleBackClick}
        title={state.userDetails.user.name}
        subTitle={
          state.userDetails.user.statuses_count
            ? `${formatTweetCount(
                state.userDetails.user.statuses_count
              )} Tweets`
            : ""
        }
      />

      <div className="content">
        <div className="user-details-wrapper">
          {state.userDetails.error ? (
            <ErrorMessage error={state.userDetails.error} />
          ) : (
            <UserDetailsCard user={state.userDetails.user} />
          )}
        </div>
      </div>

      {state.userDetails.loading && (
        <Spin className="full-page-spinner" tip="Loading user data..." />
      )}
    </div>
  );
};
