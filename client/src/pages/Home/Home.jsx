import React, { useState, useContext } from "react";
import { Input, List, Avatar, Spin, Empty } from "antd";
import { TwitterOutlined, TwitterCircleFilled } from "@ant-design/icons";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { getUrlParameter } from "../../util/getUrlParameter";
import { Link } from "react-router-dom";
import { AppContext } from "../../components/AppContext/AppContext";

const TWITTER_SEARCH_URL = "http://localhost:4000/search";

const { Search } = Input;

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [term, setTerm] = useState("");
  const [tweets, setTweets] = useState([]);
  const [maxID, setMaxID] = useState();
  const { home } = useContext(AppContext);

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSearch = (value) => {
    if (value === "") {
      // Clear button is clicked
      setTerm(value);
      setTweets([]);
    } else {
      setLoading(true);

      // User clicked search button or pressed Enter
      axios
        .get(TWITTER_SEARCH_URL, {
          params: {
            q: value,
          },
        })
        .then((response) => {
          setTimeout(() => setLoading(false), 0);

          setTweets([...response.data.statuses]);

          const max_id = getUrlParameter(
            response.data.search_metadata.next_results,
            "max_id"
          );
          setMaxID(max_id);
        });
    }
  };

  const handleInfiniteLoadMore = () => {
    console.log("handleInfiniteLoadMore");
    setLoading(true);

    // User clicked search button or pressed Enter
    axios
      .get(TWITTER_SEARCH_URL, {
        params: {
          q: term,
          max_id: maxID,
        },
      })
      .then((response) => {
        setTimeout(() => setLoading(false), 0);

        setTweets((prev) => [...prev, ...response.data.statuses]);

        const max_id = getUrlParameter(
          response.data.search_metadata.next_results,
          "max_id"
        );
        setMaxID(max_id);
      });
  };

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
        className="home"
        style={{
          padding: 8,
          width: "100%",
          minHeight: "100%",
          height: "100%",
          overflow: "auto",
        }}
      >
        <Search
          allowClear
          autoFocus={true}
          placeholder="Search by hashtag"
          prefix={<TwitterOutlined />}
          value={term}
          onChange={handleTermChange}
          onSearch={handleSearch}
          style={{ width: "100%" }}
        />

        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteLoadMore}
          hasMore={!loading && hasMore}
          useWindow={false}
        >
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
                    <Link to={`user/${item.user.id}`}>
                      <Avatar src={item.user.profile_image_url} />
                    </Link>
                  }
                  title={`@${item.user.screen_name} (${item.user.name})`}
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
        </InfiniteScroll>

        {loading && hasMore && (
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
