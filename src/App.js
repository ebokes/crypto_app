import { useEffect, useState } from "react";
import { createContext } from "react";
import Coin from "./components/Coin";
import "./App.css";
import Axios from "axios";
import CoinHead from "./components/CoinHead";
import { ModeToggle } from "./components/Switch";

export const ThemeContext = createContext(null);
function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className="coin-app" id={theme}>
        <span>
          <ModeToggle />
        </span>
        <div className="coin-search">
          <h1 className="coin-text">Search a currency</h1>
          <form>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Search"
              className="coin-input"
            />
          </form>
        </div>
        <div className="table-container">
          <table>
            <thead className="coin-heading">
              <CoinHead />
            </thead>
            <tbody>
              {filteredCoins.map((coin) => (
                <Coin
                  key={coin.id}
                  name={coin.name}
                  image={coin.image}
                  price={coin.current_price}
                  symbol={coin.symbol}
                  marketcap={coin.market_cap}
                  priceChange={coin.price_change_percentage_24h}
                  volume={coin.total_volume}
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </ThemeContext.Provider>
  );
}

export default App;
