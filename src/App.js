import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUser from "./components/addUser";
import User from "./components/userComponent";
import UserList from "./components/userList";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/user"} className="navbar-brand">
            Test
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/getUsers"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/newUser"} className="nav-link">
                Create
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/getUsers"]} component={UserList} />
            <Route exact path="/newUser" component={AddUser} />
            <Route path="/user/:id" component={User} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;