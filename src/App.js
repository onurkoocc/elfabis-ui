import React, {useState, useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./Services/auth.service";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import EventBus from "./Common/EventBus";
import logoNav from "./Icons/logoNav.png"
import Profile from "./Components/Profile";

const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            <img  alt={"/"} src={logoNav} height={"100px"} />
            ELFABIS
          </Link>
          <div className="navbar-nav mr-auto">
           <ul>
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
           </ul>
          </div>

          {currentUser ? (

              <div className="navbar-nav collapse navbar-collapse justify-content-end">
                <ul>
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
                </ul>
              </div>

          ) : (
              <div className="navbar-nav collapse navbar-collapse justify-content-end">
                <ul>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
                </ul>
              </div>
          )}
        </nav>
          <div className="container mt-3">
            <Routes>
                <Route exact path={"/"} element={<Home />} />
                <Route exact path={"/home"} element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/profile" element={<Profile />} />
            </Routes>
        </div>
        {/* <AuthVerify logOut={logOut}/> */}
      </div>
  );
};

export default App;
