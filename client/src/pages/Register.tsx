import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <form className="ui form login-form">
      <h1>Register</h1>
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
        or <Link to="/login">login to your account</Link>{" "}
      </div>
    </form>
  );
};

export default Register;
