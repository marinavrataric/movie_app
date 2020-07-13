import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function Navigation() {
  return (
    <Router>
      <Link to="/:id"></Link>
      <Route path="/:id">{}</Route>
    </Router>
  );
}

export default Navigation;
