import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Nav from "./components/Nav";
// import Footer from "./components/Footer";
import Destination from "./pages/Destination";
import Name from "./pages/Name";
import Dashboard from "./pages/Dashboard";

const App = () => (
  <Router>
    <div>
      {/* <Nav /> */}
      <Route exact path="/" component={Name} />
      <Route exact path="/destination" component={Destination} />
      <Route exact path="/dashboard" component={Dashboard} />
      {/* <Footer /> */}
    </div>
  </Router>
);

export default App;
