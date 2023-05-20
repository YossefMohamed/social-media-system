import React from "react";
import { Rootstate } from "../redux/store";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logout } from "../redux/slices/userSlices";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const { token } = useSelector((state: Rootstate) => state.authState);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="ui item">
        Home
      </Link>
      <Link to="/users" className="ui item">
        Users
      </Link>
      <Link to="/post" className="ui item">
        Create post
      </Link>
      <div className="right menu">
        {token ? (
          <div
            className="ui item"
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            Logout
          </div>
        ) : (
          <Link to="/login" className="ui item">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
