import { FC } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  imageURL: string;
}

const MarketProduct: FC<{ product: Product }> = ({ product }) => {
  return (
    <div key={product.id} className="flex flex-col bg-gray-200 p-4 rounded-lg">
      <Image
        src={product.imageURL}
        alt={product.name}
        width={300}
        height={200}
        className="mb-2"
      />
      <p>{product.name}</p>
      <p className="font-bold">{product.price}</p>
    </div>
  );
};

export default MarketProduct;
