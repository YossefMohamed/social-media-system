import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import "./index.css";
import Register from "./pages/Register";
import Index from "./pages/Index";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import PostForm from "./pages/PostForm";
import Users from "./pages/Users";
import User from "./pages/User";
import Groups from "./pages/Groups";
import Group from "./pages/Group";
import NewGroupForm from "./pages/NewGroupForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 3,
      retryDelay: 8000,
    },
    mutations: {
      retry: false,
      retryDelay: 50000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Error Not Found 404</div>,
    children: [
      { index: true, element: <Index /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "post",
        element: <PostForm />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:id",
        element: <User />,
      },
      {
        path: "groups",
        element: <Groups />,
      },
      {
        path: "groups/:id",
        element: <Group />,
      },
      {
        path: "groups/new",
        element: <NewGroupForm />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={false} />

      <RouterProvider router={router} />
    </Provider>
  </QueryClientProvider>
);