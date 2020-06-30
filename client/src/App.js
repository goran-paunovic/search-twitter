import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Error404 } from "./pages/Error404/Error404";
import { Home } from "./pages/Home/Home";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
