import React from "react";
import { Card, Avatar } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  LinkOutlined,
} from "@ant-design/icons";

import UserBannerImage from "../UserBannerImage/UserBannerImage";
import { getMonthYearCreatedAt } from "../../util/getMonthYearCreatedAt";

import "./UserDetailsCard.css";

export const UserDetailsCard = ({ user }) => {
  return (
    <Card
      className="user-details-card"
      cover={<UserBannerImage imageUrl={user.profile_banner_url} />}
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

      {user.location && (
        <div className="user-location" style={{ marginBottom: 10 }}>
          <EnvironmentOutlined style={{ marginRight: 8 }} />
          {user.location}
        </div>
      )}

      {user.url && (
        <div className="user-url" style={{ marginBottom: 10 }}>
          <LinkOutlined style={{ marginRight: 8 }} />
          <a href={user.url} target="_blank" rel=" noopener noreferrer">
            {user.url}
          </a>
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
  );
};
