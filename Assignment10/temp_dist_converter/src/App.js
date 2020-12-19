import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import DistanceConverter from "./screens/DistanceConverter";
import TemperatureConverter from "./screens/TemperatureConverter";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Redirect to="/temperature" />}
          />
          <Route path="/temperature" component={TemperatureConverter} />
          <Route path="/distance" component={DistanceConverter} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
