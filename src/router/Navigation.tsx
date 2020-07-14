import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import MovieDetails from "../pages/movie_details/MovieDetails";
import MoviePage from "../pages/movie_page/MoviePage";

function Navigation() {
  return (
    <Router>
      <Link to="/"></Link>
      <Switch>
        <Route path="/" exact>
          <MoviePage />
        </Route>
        <Route path="/:id">
          <MovieDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default Navigation;
