import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserRegister } from "../api-hooks/useUserRegister";
import { toast } from "react-hot-toast";

const Register = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    data,
    isLoading,
    mutate: register,
    isSuccess,
    isError,
    error,
  } = useUserRegister();

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successful!");
      localStorage.setItem("token", data.data.token);
      navigate("/");
    }
    isError && toast.error(error);
  }, [isSuccess, isError, data, navigate]);

  return (
    <form className="ui form login-form">
      <h1>Register</h1>
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
          register({
            password,
            username,
          });
        }}
      >
        {isLoading ? "Loading.." : "Submit"}
      </button>
      <div>
        or <Link to="/login">login to your account</Link>{" "}
      </div>
    </form>
  );
};

export default Register;
