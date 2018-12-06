import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from "redux";
import { reducer } from "../src/reducers/reducer"

import "../src/style/style.scss";
import Homeview from "./views/homeview";
import DetailView from "./views/detailview";

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container is-fluid">
            <Route path="/" exact component={Homeview} />
            <Route path="/currency/:coin" exact component={DetailView} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
