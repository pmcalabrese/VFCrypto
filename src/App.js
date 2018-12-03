import React, { Component } from 'react';
import '../src/style/style.scss';
import Navbar from './components/navbar';
import Homeview from './views/homeview';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <Router>
        <section className="section">
          <div className="container">
            <Navbar />
            <Route path="/" exact component={Homeview} />
          </div>
        </section>
      </Router>
    );
  }
}

export default App;
