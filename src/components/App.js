import React from "react";
import FrontPage from "./FrontPage";
import "./css/styles.css";
import { BrowserRouter, Route } from "react-router-dom";
import Watch from "./Watch";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="App">
          <Route exact path="/" component={FrontPage} />
        </div>
        <Route path="/watch" component={Watch} />
      </div>
    </BrowserRouter>
  );
}

export default App;
