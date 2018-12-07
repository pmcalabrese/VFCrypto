import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../components/navbar";

// import Coinmarketcap from "../services/coinmarketcap";
import Coingecko from "../services/coingecko";
import { formatMoney, ICONS, CURRENCY_SYMBOLS } from "../utilis";

class Homeview extends Component {
  constructor(props) {
    super(props);
    this.interval = undefined;
    this.state = {
      currencies: [],
      last_update: null
    };
  }

  componentWillReceiveProps(props) {
    this.updateCurrencies(props.current_currency);
  }

  updateCurrencies = (currency_to_convert, order = "") => {
    this.setState({
      loading: true
    });
    return Coingecko.getCurrencies({
      vs_currency: currency_to_convert,
      per_page: 10,
      page: 1,
      order
    }).then(currencies => {
      const now = new Date();
      this.setState({
        last_update: now.toString(),
        currencies,
        loading: false
      });
    });
  };

  componentDidMount() {
    this.updateCurrencies(this.props.current_currency);
    this.interval = setInterval(() => {
      this.updateCurrencies(this.props.current_currency);
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  orderBy = order => {
    this.updateCurrencies(this.props.current_currency, order);
  };

  render() {
    const { currencies, last_update, loading } = this.state;
    const { current_currency } = this.props;

    return (
      <React.Fragment>
        <Navbar />
        <div className="section">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>CRYPTOCURRENCY</th>
                <th>PRICE</th>
                <th>MARKET CAP</th>
                <th>24H CHANGE</th>
              </tr>
            </thead>
            <tbody>
              {currencies.length !== 0 ? (
                currencies.map(currency => (
                  <tr key={currency.name}>
                    <td className="td-center" title={currency.symbol}>
                      <span className="currency-rank">{currency.rank}</span>
                      <Link to={`currency/${currency.name.toLowerCase()}`}>
                        <img
                          alt={currency.name}
                          src={ICONS[currency.symbol.toUpperCase()]}
                        />
                        <span className="currency-name"> {currency.name}</span>
                      </Link>
                    </td>
                    <td>
                      {
                        <div className={loading ? "animated-background" : ""}>
                          <span>{CURRENCY_SYMBOLS[current_currency]}</span>
                          <span>{formatMoney(currency.current_price)}</span>
                        </div>
                      }
                    </td>
                    <td>
                      <small className={loading ? "animated-background" : ""}>
                        <span>{CURRENCY_SYMBOLS[current_currency]}</span>
                        {formatMoney(currency.market_cap)}
                      </small>
                    </td>
                    <td
                      className={
                        currency.market_cap_change_percentage_24h < 0
                          ? "negative-cap"
                          : "positive-cap"
                      }
                    >
                      <b>
                        <small className={loading ? "animated-background" : ""}>
                          {currency.market_cap_change_percentage_24h} %
                        </small>
                      </b>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colspan="4" className="circle-container">
                    <span class="circle" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <span>
            <b>Last update</b> {last_update}
          </span>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_currency: state.current_currency
  };
}

export default connect(mapStateToProps)(Homeview);
