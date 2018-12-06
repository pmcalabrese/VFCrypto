import BTC from "../node_modules/cryptocurrency-icons/32/color/btc.png";
import XRP from "../node_modules/cryptocurrency-icons/32/color/xrp.png";
import ETH from "../node_modules/cryptocurrency-icons/32/color/eth.png";
import XLM from "../node_modules/cryptocurrency-icons/32/color/xlm.png";
import BCH from "../node_modules/cryptocurrency-icons/32/color/bch.png";
import EOS from "../node_modules/cryptocurrency-icons/32/color/eos.png";
import LTC from "../node_modules/cryptocurrency-icons/32/color/ltc.png";
// import USDT from "../node_modules/cryptocurrency-icons/32/color/ustd.png"
// import BSV from "../node_modules/cryptocurrency-icons/32/color/bsv.png"
import ADA from "../node_modules/cryptocurrency-icons/32/color/ada.png";
import XMR from "../node_modules/cryptocurrency-icons/32/color/xmr.png";
import NEO from "../node_modules/cryptocurrency-icons/32/color/neo.png";
import TRX from "../node_modules/cryptocurrency-icons/32/color/trx.png";

export function formatMoney(n, c, d, t) {
  var c = isNaN((c = Math.abs(c))) ? 2 : c,
    d = d === undefined ? "." : d,
    t = t === undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
    j = (j = i.length) > 3 ? j % 3 : 0;

  return (
    s +
    (j ? i.substr(0, j) + t : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
    (c
      ? d +
        Math.abs(n - i)
          .toFixed(c)
          .slice(2)
      : "")
  );
}

export const CURRENCY_SYMBOLS = {
  EUR: "€",
  USD: "$",
  JPY: "¥",
  GBP: "£",
  KRW: "₩"
};

export const ICONS = {
  BTC,
  XRP,
  ETH,
  XLM,
  BCH,
  EOS,
  LTC,
  // USDT,
  // BSV,
  ADA,
  XMR,
  NEO,
  TRX
};
