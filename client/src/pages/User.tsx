import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Rootstate } from "../redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Post from "../components/Post";

const User = () => {
  const { id } = useParams();

  const { token } = useSelector((state: Rootstate) => state.authState);
  const userResponse = useQuery("users", async () => {
    const res = await axios
      .get(
        `http://127.0.0.1:5000/api/users/${id}`,

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

  const postsResponse = useQuery("posts", async () => {
    const res = await axios
      .get(
        `http://127.0.0.1:5001/api/posts/${id}`,

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

  console.log(postsResponse);

  return userResponse.isLoading && !userResponse.data ? (
    <div>Loading....</div>
  ) : (
    <>
      <div className="ui card">
        <div className="content">
          <h4 className="ui blue header">{userResponse.data.username}</h4>
        </div>
        <div className="extra">
          <div className="ui buttons">
            <button className="ui button">Follow</button>
          </div>
        </div>
      </div>
      <h1 className="ui blue header">User posts:</h1>
      {postsResponse.isLoading ? (
        <div>Loading.... </div>
      ) : (
        postsResponse.data?.map(
          (post: { username: string; author_id: number; content: string }) => (
            <Post
              username={post.username}
              author_id={post.author_id}
              content={post.content}
            />
          )
        )
      )}
      {!postsResponse.isLoading && !postsResponse.data?.length && (
        <div>User has no posts</div>
      )}
    </>
  );
};

export default User;
