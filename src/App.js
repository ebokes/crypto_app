import Coin from "./components/Coin";
import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
    )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Coin />
    </div>
  );
}

export default App;
