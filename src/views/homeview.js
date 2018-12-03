import React, { Component } from 'react';
import Coinmarketcap from "../services/coinmarketcap";
import { formatMoney } from "../utilis";
import BTC from  "../../node_modules/cryptocurrency-icons/32/color/btc.png"
import XRP from  "../../node_modules/cryptocurrency-icons/32/color/xrp.png"
import ETH from  "../../node_modules/cryptocurrency-icons/32/color/eth.png"
import XLM from "../../node_modules/cryptocurrency-icons/32/color/xlm.png"
import BCH from "../../node_modules/cryptocurrency-icons/32/color/bch.png"
import EOS from "../../node_modules/cryptocurrency-icons/32/color/eos.png"
import LTC from "../../node_modules/cryptocurrency-icons/32/color/ltc.png"
// import USDT from "../../node_modules/cryptocurrency-icons/32/color/ustd.png"
// import BSV from "../../node_modules/cryptocurrency-icons/32/color/bsv.png"
import ADA from "../../node_modules/cryptocurrency-icons/32/color/ada.png"

const ICONS = {
    BTC,
    XRP,
    ETH,
    XLM,
    BCH,
    EOS,
    LTC,
    // USDT,
    // BSV,
    ADA
}

class Homeview extends Component {
    constructor(props) {
        super(props);
        this.interval = undefined;
        this.state = { 
            currencies: [],
            last_update: null
         }
    }

    updateCurrencies = () => {
        Coinmarketcap.getCurrencies().then((data) => {
            console.log("data", data);
            const now = new Date();
            this.setState({
                last_update: now.toString(),
                currencies: data
            })
        })
    }

    componentDidMount() {
        this.updateCurrencies();
        this.interval = setInterval(this.updateCurrencies, 60000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() { 
        const { currencies, last_update } = this.state;
        return ( 
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
                        {
                            currencies.length !== 0 ?
                            currencies.map((currency) => (
                                <tr key={currency.name}>
                                    <td className="td-center" title={ currency.symbol }><span className="currency-rank">{ currency.rank }</span><img src={ICONS[currency.symbol]} /><span className="currency-name"> { currency.name }</span></td>
                                    <td>{ formatMoney(currency.price_usd) }</td>
                                    <td><small>{ formatMoney(currency.market_cap_usd) }</small></td>
                                    <td className={ currency.percent_change_24h < 0 ? "negative-cap" : "positive-cap" }><b><small>{ currency.percent_change_24h } %</small></b></td>
                                </tr>
                            )) : "loading"
                        }
                        
                    </tbody>
                </table>
                <span><b>Last update</b> { last_update }</span>
            </div>
         );
    }
}
 
export default Homeview;