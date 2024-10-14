import React from "react";
import Hero from "../Components/Hero";
import Demo from "../Components/Demo";
import InfiniteScrollMenu from "../Components/InfiniteScrollMenu";

const homev2 = () => {
  
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <InfiniteScrollMenu />
        <Demo />
        <div className="container mx-auto px-4 py-8">
          
         
        </div>
      </div>
    </main>
  );
};

export default homev2;
