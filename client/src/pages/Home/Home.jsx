import React, { useRef, useEffect } from "react";
import { Input, Spin } from "antd";
import { NumberOutlined } from "@ant-design/icons";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";

import { TweetList } from "../../components/TweetList/TweetList";
import { getUrlParameter } from "../../util/getUrlParameter";
import {
  useStore,
  SET_SCROLL_POSITION,
  SEARCH_TERM_CHANGED,
  SEARCH_TERM_CLEARED,
  SEARCH_START,
  SEARCH_END,
  SEARCH_SUCCESS,
  SEARCH_MORE_SUCCESS,
  SEARCH_ERROR,
} from "../../store/store";

import "./Home.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const { Search } = Input;

export const Home = () => {
  const { state, dispatch } = useStore();
  const scrollDivRef = useRef(null);

  useEffect(() => {
    scrollDivRef.current.scrollTop = state.home.scrollTop;
  }, [state.home.scrollTop]);

  const handleTermChange = (e) => {
    dispatch({
      type: SEARCH_TERM_CHANGED,
      payload: { term: e.target.value },
    });
  };

  const handleSearch = (value) => {
    if (value === "") {
      // Clear button is clicked
      dispatch({
        type: SEARCH_TERM_CLEARED,
      });
    } else {
      dispatch({
        type: SEARCH_START,
      });

      // User clicked search button or pressed Enter
      axios
        .get(process.env.REACT_APP_TWITTER_SEARCH_URL, {
          params: {
            q: value,
          },
        })
        .then((response) => {
          dispatch({
            type: SEARCH_SUCCESS,
            payload: {
              tweets: [...response.data.statuses],
              max_id: getUrlParameter(
                response.data.search_metadata.next_results,
                "max_id"
              ),
            },
          });

          dispatch({
            type: SEARCH_END,
          });
        })
        .catch((error) => {
          dispatch({
            type: SEARCH_ERROR,
            payload: {
              error,
            },
          });
        });
    }
  };

  const handleInfiniteLoadMore = () => {
    dispatch({
      type: SEARCH_START,
    });

    // User clicked search button or pressed Enter
    axios
      .get(process.env.REACT_APP_TWITTER_SEARCH_URL, {
        params: {
          q: state.home.term,
          max_id: state.home.max_id,
        },
      })
      .then((response) => {
        dispatch({
          type: SEARCH_MORE_SUCCESS,
          payload: {
            tweets: [...response.data.statuses],
            max_id: getUrlParameter(
              response.data.search_metadata.next_results,
              "max_id"
            ),
          },
        });

        dispatch({
          type: SEARCH_END,
        });
      })
      .catch((error) => {
        dispatch({
          type: SEARCH_ERROR,
          payload: {
            error,
          },
        });
      });
  };

  const handleAvatarClick = () => {
    dispatch({
      type: SET_SCROLL_POSITION,
      payload: {
        scrollTop: scrollDivRef.current.scrollTop,
      },
    });
  };

  return (
    <div className="page-container">
      <div className="search-bar">
        <Search
          allowClear
          autoFocus={true}
          placeholder="Search by hashtag"
          prefix={<NumberOutlined style={{ transform: "skewX(-10deg)" }} />}
          value={state.home.term}
          onChange={handleTermChange}
          onSearch={handleSearch}
        />
      </div>

      <div className="content" ref={scrollDivRef}>
        {state.home.error ? (
          <ErrorMessage error={state.home.error} />
        ) : (
          <InfiniteScroll
            initialLoad={false}
            loadMore={handleInfiniteLoadMore}
            hasMore={!state.home.loading && state.home.hasMore}
            useWindow={false}
          >
            <TweetList
              tweets={state.home.tweets}
              onAvatarClick={handleAvatarClick}
            />
          </InfiniteScroll>
        )}

        {state.home.loading && state.home.hasMore && (
          <Spin className="full-page-spinner" tip="Loading..." />
        )}
      </div>
    </div>
  );
};
