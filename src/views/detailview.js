import React, { Component } from "react";
import { connect } from "react-redux";
import Coingecko from "../services/coingecko";
import { formatMoney, CURRENCY_SYMBOLS } from "../utilis";
import NavbarDetail from "../components/navbarDetail";

class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: {},
      loading: true
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    Coingecko.getCurrencies({
      ids: this.props.match.params.coin.toLowerCase(),
      vs_currency: this.props.current_currency
    }).then(data => {
      this.setState({
        currency: data[0],
        loading: false
      });
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      loading: true
    });
    Coingecko.getCurrencies({
      ids: props.match.params.coin.toLowerCase(),
      vs_currency: props.current_currency
    }).then(data => {
      this.setState({
        currency: data[0],
        loading: false
      });
    });
  }

  render() {
    const { current_currency } = this.props;
    const { currency, loading } = this.state;

    return (
      <React.Fragment>
        <div>
          <NavbarDetail currency_data={currency} />
        </div>
        <div id="detail_view" className="section">
          <div className="columns">
            <div className="column is-vertical-center">
              <span className="detail_view__rank">
                <span className="detail_view__label">RANK</span>{" "}
                <span className="rank-circle">{currency.market_cap_rank}</span>
              </span>
            </div>
            <div className="column">
              <DetailCard
                loading={loading}
                title="MARKET CAP"
                value={
                  CURRENCY_SYMBOLS[current_currency] +
                  " " +
                  formatMoney(currency.market_cap)
                }
              />
              <DetailCard
                loading={loading}
                title="AVAILABLE SUPPLY"
                value={formatMoney(currency.circulating_supply)}
                symbol={currency.symbol}
              />
            </div>
            <div className="column">
              <DetailCard
                loading={loading}
                title="24H VOLUME"
                value={
                  CURRENCY_SYMBOLS[current_currency] +
                  " " +
                  formatMoney(currency.market_cap_change_24h)
                }
              />
              <DetailCard
                loading={loading}
                title="TOTAL SUPPLY"
                value={formatMoney(currency.total_supply)}
                symbol={currency.symbol}
              />
            </div>
          </div>
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

export default connect(mapStateToProps)(DetailView);

class DetailCard extends Component {
  render() {
    const { title, value, symbol, loading } = this.props;
    return (
      <div title={`${title} of ${symbol}`} className="detail__card">
        <h2 className="detail_view__label">{title}</h2>
        {!loading ? (
          <div className="detail__card__value">
            {value}{" "}
            {symbol ? (
              <b>
                <small className="detail__card__symbol">{symbol.toUpperCase()}</small>
              </b>
            ) : (
              ""
            )}
          </div>
        ) : (
          "loading"
        )}
      </div>
    );
  }
}
