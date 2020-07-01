import React, { useState, useEffect } from "react";
import { PageHeader, Spin, Card, Avatar } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useHistory, useParams, useLocation } from "react-router-dom";
import axios from "axios";

import "./UserDetails.css";
import { getMonthYearCreatedAt } from "../../util/getMonthYearCreatedAt";
import { formatTweetCount } from "../../util/formatTweetCount";

export const UserDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "User name",
    screen_name: "screen name",
  });

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);

      setTimeout(setLoading(false), 3000);
    }
  });

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
        style={{
          padding: 8,
          backgroundColor: "whitesmoke",
          boxShadow: "0 0 5px 1px lightgrey",
        }}
      />

      <Card
        style={{ width: "100%" }}
        cover={
          user.profile_banner_url ? (
            <img
              alt={`${user.name} profile background`}
              src={user.profile_banner_url}
            />
          ) : (
            <div
              style={{
                background: "darkgray",
                paddingBottom: "33%",
              }}
            ></div>
          )
        }
      >
        <Card.Meta
          avatar={<Avatar size="large" src={user.profile_image_url} />}
          title={user.name}
          description={`@${user.screen_name}`}
          style={{ marginBottom: 10 }}
        />

        {user.description && (
          <div className="user-description" style={{ marginBottom: 10 }}>
            {user.description}
          </div>
        )}

        {user.created_at && (
          <div className="user-date-joined" style={{ marginBottom: 10 }}>
            <CalendarOutlined style={{ marginRight: 8 }} />
            {`Joined ${getMonthYearCreatedAt(user.created_at)}`}
          </div>
        )}

        {user.friends_count && (
          <div className="user-ff" style={{ marginBottom: 10 }}>
            {`${user.friends_count} Following`}
          </div>
        )}

        {user.followers_count && (
          <div className="user-ff" style={{ marginBottom: 10 }}>
            {`${user.followers_count} Followers`}
          </div>
        )}
      </Card>

      {loading && (
        <Spin
          tip="Loading user data..."
          style={{
            position: "absolute",
            zIndex: 5,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.5)",
          }}
        />
      )}
    </div>
  );
};
