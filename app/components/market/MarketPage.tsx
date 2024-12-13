"use client";
import { FC } from "react";

const MarketPage: FC = () => {
  return (
    <main className="flex justify-center items-center gap-4 flex-1">
      <div className="p-8 bg-white h-[100dvh] w-full">
        <h2 className="text-4xl font-bold">Market</h2>
        <div className="mt-8 grid grid-cols-4 gap-8">
          {/* {products.map((product) => (
            <MarketProduct key={product.id} product={product} />
          ))} */}
          <p>Coming soon. Stay tuned!</p>
        </div>
      </div>
    </main>
  );
};

export default MarketPage;
