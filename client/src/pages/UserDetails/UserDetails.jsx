import React, { useState } from "react";
import { PageHeader, Spin } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";

const TWITTER_SEARCH_URL = "http://localhost:4000/search";

export const UserDetails = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return (
    <div
      className="page-container"
      style={{
        width: "100%",
        minHeight: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        className="user"
        style={{
          padding: 8,
          width: "100%",
          minHeight: "100%",
          height: "100%",
          overflow: "auto",
        }}
      >
        <PageHeader
          className="page-header"
          onBack={() => history.goBack()}
          title="User"
          subTitle="This is a subtitle"
        />

        {loading && (
          <Spin
            tip="Loading..."
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
    </div>
  );
};
