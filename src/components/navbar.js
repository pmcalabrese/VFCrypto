import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import USD from  "../../node_modules/cryptocurrency-icons/32/color/usd.png"
import EUR from  "../../node_modules/cryptocurrency-icons/32/color/eur.png"
import GBP from  "../../node_modules/cryptocurrency-icons/32/color/gbp.png"
import JPY from  "../../node_modules/cryptocurrency-icons/32/color/jpy.png"

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeCurrentCurrency(selected_currency) {
    this.props.dispatch({
      type: "CHANGE_CURRENT_CURRENCY",
      payload: selected_currency
    });
  } 

  render() {

    const { current_currency } = this.props;

    return (      
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/"><h1 id="main-link-logo">VFCrypto</h1></Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Currency ({current_currency})</a>
              <div className="navbar-dropdown">
                <a onClick={() => this.changeCurrentCurrency("GBP")} className="navbar-item"><img className="select-icon" src={GBP} />GBP</a>
                <a onClick={() => this.changeCurrentCurrency("USD")} className="navbar-item"><img className="select-icon" src={USD} />USD</a>
                <a onClick={() => this.changeCurrentCurrency("EUR")} className="navbar-item"><img className="select-icon" src={EUR} />EUR</a>
                <a onClick={() => this.changeCurrentCurrency("JPY")} className="navbar-item"><img className="select-icon" src={JPY} />JPY</a>
                <a onClick={() => this.changeCurrentCurrency("KRW")} className="navbar-item"><img className="select-icon" src={USD} />KRW</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    // the key is the props
    current_currency: state.current_currency
  };
}

export default connect(mapStateToProps)(Navbar);
