import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <form className="ui form login-form">
      <h1>Login</h1>
      <div className="field">
        <label>User name</label>
        <input type="text" name="username" placeholder="User name" />
      </div>
      <div className="field">
        <label>Password</label>
        <input type="password" placeholder="password" />
      </div>

      <button className="ui button" type="submit" disabled>
        Submit
      </button>
      <div>
        or <Link to="/register">create an account</Link>
      </div>
    </form>
  );
};

export default Login;
