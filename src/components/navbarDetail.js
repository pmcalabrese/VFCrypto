import React, { Component } from "react";
import { connect } from "react-redux";
import { formatMoney, ICONS, CURRENCY_SYMBOLS } from "../utilis";
import { Link } from "react-router-dom";

import USD from "../../node_modules/cryptocurrency-icons/32/color/usd.png";
import EUR from "../../node_modules/cryptocurrency-icons/32/color/eur.png";
import GBP from "../../node_modules/cryptocurrency-icons/32/color/gbp.png";
import JPY from "../../node_modules/cryptocurrency-icons/32/color/jpy.png";

class NavbarDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeCurrentCurrency(selected_currency) {
    console.log("selected_currency", selected_currency);
    this.props.dispatch({
      type: "CHANGE_CURRENT_CURRENCY",
      payload: selected_currency
    });
  }

  render() {
    const { current_currency, currency_data } = this.props;

    return (
      <nav id="nav-detail" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          {currency_data.symbol ? (
            <div className="navbar-start">
              <span className="nav-detail_currency__navigate-container">
                <Link className="back-button" to="/">
                  &larr;
                </Link>
              </span>
              <span className="nav-detail_currency__logo-container">
                <img
                  className="nav-detail_currency__logo-container__logo"
                  alt={currency_data.name}
                  src={ICONS[currency_data.symbol.toUpperCase()]}
                />
              </span>
              <span className="nav-detail_currency__name-container">
                <div className="nav-detail_currency__name-container__name">
                  {currency_data.name}
                </div>
                <div className="nav-detail_currency__name-container__symbol">
                  <small>{currency_data.symbol.toUpperCase()}</small>
                </div>
              </span>
              <span className="nav-detail_currency__value">
                {" "}
                {CURRENCY_SYMBOLS[current_currency] +
                  " " +
                  formatMoney(currency_data.current_price)}
              </span>
            </div>
          ) : null}
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Currency ({current_currency})</a>
              <div className="navbar-dropdown">
                <a
                  onClick={() => this.changeCurrentCurrency("GBP")}
                  className="navbar-item"
                >
                  <img className="select-icon" src={GBP} />
                  GBP
                </a>
                <a
                  onClick={() => this.changeCurrentCurrency("USD")}
                  className="navbar-item"
                >
                  <img className="select-icon" src={USD} />
                  USD
                </a>
                <a
                  onClick={() => this.changeCurrentCurrency("EUR")}
                  className="navbar-item"
                >
                  <img className="select-icon" src={EUR} />
                  EUR
                </a>
                <a
                  onClick={() => this.changeCurrentCurrency("JPY")}
                  className="navbar-item"
                >
                  <img className="select-icon" src={JPY} />
                  JPY
                </a>
                <a
                  onClick={() => this.changeCurrentCurrency("KRW")}
                  className="navbar-item"
                >
                  <img className="select-icon" src={USD} />
                  KRW
                </a>
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

export default connect(mapStateToProps)(NavbarDetail);
