import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { checkAuth } from "../redux/slices/userActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../redux/store";
const MainLayout = () => {
  const { token, loading } = useSelector((state: Rootstate) => state.authState);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(checkAuth());
    if (token && !loading) {
      navigate("/login");
    }
  }, [location, dispatch, token, loading]);
  return (
    <div className="container">
      <Header />
      <div className="body">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
