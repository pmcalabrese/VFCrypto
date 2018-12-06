class Coingecko {
  BASE_URL = "https://api.coingecko.com/api/v3";

  getCurrencies(params = { vs_currency: "usd" }) {
      params.vs_currency = params.vs_currency.toLowerCase();
    const url = new URL(this.BASE_URL+"/coins/markets");
    url.search = new URLSearchParams(params);

    return fetch(url)
      .then(data => data.json())
  }

}

export default new Coingecko();
