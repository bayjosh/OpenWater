import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Nav from "./components/Nav";
// import Wrapper from "./components/Wrapper";
// import Footer from "./components/Footer";
import NameBackground from "./components/NameBackground";
import Name from "./pages/Name";

const App = () => (
  <Router>
    <div>
      {/* <Nav />
      <Wrapper> */}
      <NameBackground>
        <Route exact path="/" component={Name} />
      </NameBackground>
      {/* </Wrapper>
      <Footer /> */}
    </div>
  </Router>
);

export default App;
