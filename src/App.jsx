import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./pages/layout/navbar/navbar";
const Login = React.lazy(() => import("./pages/auth/login/login"));
const Registration = React.lazy(() =>
  import("../src/pages/auth/registration/registration")
);

const Profile = React.lazy(() =>
  import("../src/pages/auth/profile_details/profile")
);
const List = React.lazy(() => import("../src/pages/cms/list"));
const Create = React.lazy(() => import("../src/pages/cms/create"));
// const Navbar = React.lazy(() => import("./pages/layout/navbar/navbar"));
const Update = React.lazy(() => import("./pages/cms/update/update"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    const token = localStorage.getItem("token");

  useEffect(()=>{
    if(token){
      setIsAuthenticated(true);
    }
  },[token])

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
  ];

  return (
    <>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Router>
         {isAuthenticated &&  <Navbar />}
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
        </Router>
      </Suspense>
    </>
  );
}

export default App;
