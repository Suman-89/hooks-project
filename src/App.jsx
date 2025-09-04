import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./pages/layout/navbar/navbar";
import Layout from "./pages/layout/layout";
import HeroCarousel from "./components/hero";
const Login = React.lazy(() => import("./pages/auth/login/login"));
const Registration = React.lazy(() =>
  import("../src/pages/auth/registration/registration")
);

const Profile = React.lazy(() =>
  import("../src/pages/auth/profile_details/profile")
);
const List = React.lazy(() => import("../src/pages/cms/listComponent/list"));
const Create = React.lazy(() => import("../src/pages/cms/create"));
// const Navbar = React.lazy(() => import("./pages/layout/navbar/navbar"));
const Update = React.lazy(() => import("./pages/cms/update/update"));
const Cart = React.lazy(() => import("../src/pages/cms/components/cart/cart"));

function App() {
  function PrivateRoute({ children }) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <>
        <Navigate to="/" />
        {alert("Please login...")}
      </>
    );
  }

  const publicRouteComponents = [
    {
      path: "/",
      component: <Login />,
    },
    {
      path: "/auth/register",
      component: <Registration />,
    },
  ];

  const privateRouteComponents = [
    {
      path: "/auth/profile",
      component: <Profile />,
    },
    {
      path: "/cms/list",
      component: <List />,
    },
    {
      path: "/cms/create",
      component: <Create />,
    },
    {
      path: "/cms/update/:id",
      component: <Update />,
    },
    {
      path: "/cms/cart",
      component: <Cart />,
    },
  ];

  return (
    <>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Router>
          <Layout>
            <Routes>
              {publicRouteComponents.map((route) => {
                return (
                  <Route exact path={route.path} element={route.component} />
                );
              })}

              {privateRouteComponents.map((route) => {
                return (
                  <Route
                    exact
                    path={route.path}
                    element={<PrivateRoute>{route.component}</PrivateRoute>}
                  />
                );
              })}
            </Routes>
          </Layout>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
