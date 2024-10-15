import React from "react";
import Hero from "./Components/Hero";
import InfiniteScrollMenu from "./Components/InfiniteScrollMenu";
import Demo from "./Components/Demo";


const homev2 = () => {
  
  return (
    <main className="mb-12">
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <InfiniteScrollMenu />
        <Demo />
      </div>
    </main>
  );
};

export default homev2;
