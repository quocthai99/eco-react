import React, { useState, useEffect } from "react";
import { apiGetProducts } from "../services/product";

import { CardFeature } from "../components";

const Feature = () => {
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 9 });
    if (response?.data.success) setProducts(response.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <header className="mb-5">
        <h2 className="uppercase py-[15px] border-b-2 border-main font-bold text-xl">
          featured products
        </h2>
      </header>
      <div className="grid grid-cols-3 gap-5 mb-5">
        {products?.map((product) => (
          <CardFeature key={product._id} product={product} />
        ))}
      </div>

      <div className="flex gap-5">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt="feature"
          className="flex-4"
        />
        <div className="flex flex-col justify-between flex-3 gap-5">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt="feature"
          />
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt="feature"
          />
        </div>
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt="feature"
          className="flex flex-3"
        />
      </div>

    </div>
  );
};

export default Feature;
