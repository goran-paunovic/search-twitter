import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home } from "../../pages/Home/Home";
import { UserDetails } from "../../pages/UserDetails/UserDetails";
import { Error404 } from "../../pages/Error404/Error404";

import { AppProvider } from "../AppContext/AppContext";

import "./App.css";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/user/:id">
              <UserDetails />
            </Route>
            <Route>
              <Error404 />
            </Route>
          </Switch>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
