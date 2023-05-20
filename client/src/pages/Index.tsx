import React from "react";
import Post from "./../components/Post";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Rootstate } from "../redux/store";
import { useSelector } from "react-redux";
const Index = () => {
  const { token } = useSelector((state: Rootstate) => state.authState);

  const feedResponse = useQuery("feed", async () => {
    const res = await axios
      .get(
        `http://127.0.0.1:5001/api/posts/feed`,

        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        return res.data.data;
      });

    return res;
  });

  return (
    <>
      <Link to="/post">
        <button className="ui blue button">Create new post</button>
      </Link>
      <div className="posts-container">
        {feedResponse.data?.map(
          (post: { username: string; author_id: number; content: string }) => (
            <Post
              username={post.username}
              author_id={post.author_id}
              content={post.content}
            />
          )
        )}

        {!feedResponse.isLoading && !feedResponse.data?.length && (
          <div>No posts in your feed</div>
        )}
      </div>
    </>
  );
};

export default Index;
