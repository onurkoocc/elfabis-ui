import React, {useState, useEffect} from "react";
import { Routes, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./Services/auth.service";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import EventBus from "./Common/EventBus";
import logoNav from "./Icons/logoNav.png"
import Profile from "./Components/Profile";
import AcademicianOperations from "./Components/MudekMember/AcademicianOperations";
import CourseOperations from "./Components/MudekMember/CourseOperations";
import GivenCourseOperations from "./Components/MudekMember/GivenCourseOperations";

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
            <center>
          <Link to={"/"} className="navbar-brand">
            <img  alt={"/"} src={logoNav} height={"35px"} />
                ELFABIS
          </Link>
            </center>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
          </div>

          {currentUser ? (

              <div className="navbar-nav collapse navbar-collapse justify-content-end">
                  <div className="navbar-nav mr-auto">
                      <li className="nav-item">
                          <Link to={"/academicians"} className="nav-link">
                              Users
                          </Link>
                      </li>
                  </div>
                  <div className="navbar-nav mr-auto">
                      <li className="nav-item">
                          <Link to={"/courses"} className="nav-link">
                              Courses
                          </Link>
                      </li>
                  </div>
                  <div className="navbar-nav mr-auto">
                      <li className="nav-item">
                          <Link to={"/givenCourses"} className="nav-link">
                              Given Courses
                          </Link>
                      </li>
                  </div>
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
                    <Route exact path="/academicians" element={<AcademicianOperations />} />
                    <Route exact path="/courses" element={<CourseOperations />} />
                    <Route exact path="/givenCourses" element={<GivenCourseOperations />} />
                    <Route exact path="/profile" element={<Profile />} />


                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />

            </Routes>
        </div>
        {/* <AuthVerify logOut={logOut}/> */}
      </div>
  );
};

export default App;
