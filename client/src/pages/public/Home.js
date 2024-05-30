import React from "react";

import { Sidebar, Banner, DealDaily, BestSeller } from "../../components";

const Home = () => {
  return (
    <div className="max-w-mainWidth m-auto mt-5">
      <div className="flex mb-[30px]">
        <Sidebar />
        <Banner />
      </div>
      <div className="flex mb-[30px]">
        <DealDaily />
        <BestSeller />
      </div>
      <div>
        <header className="mb-5">
          <h2 className="uppercase py-[15px] border-b-2 border-main font-bold text-xl">
            featured products
          </h2>
        </header>
        <div className="h-[600px]">
          CARD featured
        </div>
      </div>
    </div>
  );
};

export default Home;
