"use client";
import React from "react";
import logo from "../assets/logo.svg";
import Image from "next/image";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <Image src={logo} alt="aifinder_logo" className="w-28 object-contain" />
        <button
          type="button"
          onClick={() => window.open("https://github.com")}
          className="purple_btn"
        >
          GitHub
        </button>
      </nav>
      <h1 className="head_text">
        Search For AI Tools <br className="max-md:hidden" />
        <span className="purple_gradient">With AI Finder</span>
      </h1>
      <p className="desc">
        AI Finder is your go-to platform for discovering innovative AI
        solutions. Explore a wide range of tools designed to enhance
        productivity and streamline tasks, from image recognition to text
        analysis. Unleash the power of artificial intelligence and elevate your
        projects with ease!
      </p>
    </header>
  );
};

export default Hero;
