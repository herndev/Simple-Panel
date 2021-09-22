import { React } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from './pages/login';
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path={["/student", "/admin", "/secretary", "/accountant", "/cashier"]} component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
