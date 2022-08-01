import React from "react";

const CoinHead = () => {
  return (
    <tr className="coin-head">
      <th>Currency</th>
      <th>Symbol</th>
      <th>Price</th>
      <th>Volume</th>
      <th>Price Change</th>
      <th>Market Cap</th>
    </tr>
  );
};

export default CoinHead;
