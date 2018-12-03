import axios from "axios";

class Coinmarketcap {

    API = "https://api.coinmarketcap.com/v1/";

    getCurrencies(params = { limit: 10 }) {
        return axios.get(`${this.API}ticker/`, { params }).then( data => data.data )
    }

    getCurrency(coin = 'bitcoin') {
        return axios.get(`${this.API}ticker/${coin}`).then( data => data.data )
    }
}

export default new Coinmarketcap();