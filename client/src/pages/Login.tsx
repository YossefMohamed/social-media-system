import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUserLogin } from "../api-hooks/useUserLogin";
import { loginAction } from "../redux/slices/userSlices";
import { useDispatch } from "react-redux";

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    data,
    isLoading,
    mutate: login,
    isSuccess,
    isError,
    error,
  } = useUserLogin();
  const dispatch = useDispatch<any>();

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successful!");
      localStorage.setItem("token", data.data.token);
      dispatch(loginAction(data.data.token));

      navigate("/");
    }
    isError && toast.error(error);
  }, [isSuccess, isError, data, navigate, error]);
  return (
    <form className="ui form login-form">
      <h1>Login</h1>
      <div className="field">
        <label>User name</label>
        <input
          type="text"
          name="username"
          placeholder="User name"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <button
        className="ui button"
        type="submit"
        disabled={!!isLoading}
        onClick={(e) => {
          e.preventDefault();
          login({
            password,
            username,
          });
        }}
      >
        {isLoading ? "Loading.." : "Submit"}
      </button>
      <div>
        or <Link to="/register">Create a new account</Link>{" "}
      </div>
    </form>
  );
};

export default Login;
