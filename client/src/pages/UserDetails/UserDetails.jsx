import React, { useState, useEffect } from "react";
import { PageHeader, Spin } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

import { UserDetailsCard } from "../../components/UserDetailsCard/UserDetailsCard";
import { formatTweetCount } from "../../util/formatTweetCount";
import { getUrlParameter } from "../../util/getUrlParameter";

import "./UserDetails.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export const UserDetails = () => {
  const history = useHistory();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "User details",
    screen_name: "user screen name",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);

      setTimeout(setLoading(false), 0);
    } else {
      setLoading(true);

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
          console.log("Response", response);
          setUser(response.data);
          setError(null);

          setTimeout(setLoading(false), 0);
        })
        .catch((error) => {
          console.log("Error", error);

          setError(error);
          setTimeout(setLoading(false), 0);
        });
    }
  }, [setUser, setLoading, location.search, location.state]);

  return (
    <div className="page-container">
      <PageHeader
        className="page-header"
        onBack={() => history.goBack()}
        title={user.name}
        subTitle={
          user.statuses_count
            ? `${formatTweetCount(user.statuses_count)} Tweets`
            : ""
        }
      />

      <div className="content">
        <div className="user-details-wrapper">
          {error ? (
            <ErrorMessage error={error} />
          ) : (
            <UserDetailsCard user={user} />
          )}
        </div>
      </div>

      {loading && (
        <Spin className="full-page-spinner" tip="Loading user data..." />
      )}
    </div>
  );
};
