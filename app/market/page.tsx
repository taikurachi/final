import MarketPage from "../components/market/MarketPage";
import Header from "../components/utils/Header";
import { FC } from "react";

const Market: FC = () => {
  return (
    <div className="flex items-start">
      <Header />
      <MarketPage />
    </div>
  );
};

export default Market;
