import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Rootstate } from "../redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const { token } = useSelector((state: Rootstate) => state.authState);
  const usersResponse = useQuery("users", async () => {
    const res = await axios
      .get(
        `http://127.0.0.1:5000/api/users/all`,

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
  return usersResponse.isLoading ? (
    <div className="blue">Loaddinggg ...</div>
  ) : (
    <div className="ui container">
      <h2>Users</h2>
      <ul>
        {usersResponse.data?.map((user: { id: number; username: string }) => (
          <li key={user.id} className="mb-5">
            <Link to={`/users/${user.id}`} className="ui card">
              <div className="content">
                <h4 className="ui blue header">{user.username}</h4>
              </div>
              <div className="extra">
                <div className="ui buttons">
                  <button className="ui button">Follow</button>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
