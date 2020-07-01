import React from "react";
import { Link } from "react-router-dom";
import { List, Avatar, Empty, Typography } from "antd";
import { TwitterCircleFilled } from "@ant-design/icons";
import { getTimeFromNow } from "../../util/getTimeFromNow";

const { Text } = Typography;

export const TweetList = ({ tweets, onAvatarClick }) => {
  return (
    <List
      locale={{
        emptyText: (
          <Empty
            description="Let's find that tweet"
            image={
              <TwitterCircleFilled
                style={{ width: 96, height: 96, fontSize: "96px" }}
              />
            }
          />
        ),
      }}
      dataSource={tweets}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={
              <Link
                to={{
                  pathname: "user",
                  search: `id=${item.user.id}&scrname=${item.user.screen_name}`,
                  state: {
                    user: item.user,
                  },
                }}
                onClick={onAvatarClick}
              >
                <Avatar src={item.user.profile_image_url} />
              </Link>
            }
            title={
              <>
                <Text
                  strong
                  style={{
                    fontSize: 14,
                    marginRight: 8,
                  }}
                >
                  {item.user.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                  }}
                >{`@${item.user.screen_name}`}</Text>
                {" - "}
                <Text>{getTimeFromNow(item.created_at)}</Text>
              </>
            }
            description={
              <div>
                <div>{item.text}</div>
                <div>
                  {item.entities.hashtags.map((tag) => `#${tag.text} `)}
                </div>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};
