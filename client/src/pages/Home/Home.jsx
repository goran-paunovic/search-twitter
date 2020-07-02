import React, { useRef, useEffect } from "react";
import { Input, Spin } from "antd";
import { NumberOutlined } from "@ant-design/icons";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";

import { TweetList } from "../../components/TweetList/TweetList";
import { getUrlParameter } from "../../util/getUrlParameter";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useStore } from "../../store/useStore";
import { Actions } from "../../store/home";

import "./Home.css";

const WAIT_INTERVAL = 500;

const { Search } = Input;

export const Home = () => {
  const { state, dispatch } = useStore();
  const scrollDivRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    // Restore scroll position
    scrollDivRef.current.scrollTop = state.home.scrollTop;
  }, [state.home.scrollTop]);

  const handleTermChange = (e) => {
    // Clear interval if user is still typing
    clearTimeout(timer.current);

    const newTerm = e.target.value;
    dispatch({
      type: Actions.SEARCH_TERM_CHANGED,
      payload: { term: newTerm },
    });

    // Set timer again
    timer.current = setTimeout(() => {
      if (newTerm.length > 2) {
        // Call search after WAIT_INTERVAL ms if 3 or more characters are entered
        handleSearch(newTerm);
      }
    }, WAIT_INTERVAL);
  };

  const handleSearch = (value) => {
    console.log("handleSearch");
    if (value === "") {
      // Clear button is clicked
      dispatch({
        type: Actions.SEARCH_TERM_CLEARED,
      });
    } else {
      // Clear timeout if this search is triggered by user pressing enter key
      clearTimeout(timer.current);

      dispatch({
        type: Actions.SEARCH_START,
      });

      // Search tweets
      axios
        .get(process.env.REACT_APP_TWITTER_SEARCH_URL, {
          params: {
            q: value,
          },
        })
        .then((response) => {
          dispatch({
            type: Actions.SEARCH_SUCCESS,
            payload: {
              tweets: [...response.data.statuses],
              max_id: getUrlParameter(
                response.data.search_metadata.next_results,
                "max_id"
              ),
            },
          });
        })
        .catch((error) => {
          dispatch({
            type: Actions.SEARCH_ERROR,
            payload: {
              error,
            },
          });
        });
    }
  };

  const handleInfiniteLoadMore = () => {
    if (!state.home.term) return;

    dispatch({
      type: Actions.SEARCH_START,
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
          type: Actions.SEARCH_MORE_SUCCESS,
          payload: {
            tweets: [...response.data.statuses],
            max_id: getUrlParameter(
              response.data.search_metadata.next_results,
              "max_id"
            ),
          },
        });

        dispatch({
          type: Actions.SEARCH_END,
        });
      })
      .catch((error) => {
        dispatch({
          type: Actions.SEARCH_ERROR,
          payload: {
            error,
          },
        });
      });
  };

  const handleAvatarClick = () => {
    dispatch({
      type: Actions.SET_SCROLL_POSITION,
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

        {state.home.loading && (
          <Spin className="full-page-spinner" tip="Loading..." />
        )}
      </div>
    </div>
  );
};
