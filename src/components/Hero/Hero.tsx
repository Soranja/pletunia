import React from "react";
import HeroPostcard from "../../data/img/raw/postcards/iron-giant-hero.jpg";
import Lighthouse from "../../data/img/cut/lighthouse.png";
import "./Hero.css";

function Hero() {
  return (
    <section className="bg-hero bg-cover grow grid grid-cols-1 lg:grid-cols-hero mt-20 px-20 lg:pl-40 lg:pr-0 text-white relative">
      <div className="mb-20 mt-5 gap-y-4 md:gap-y-10 lg:mb-0 flex flex-col items-center lg:items-start justify-start lg:justify-evenly">
        <div className="flex items-center">
          <div className="lg:hidden mt-5 flex justify-center">
            <img className="w-6/12" src={Lighthouse} alt="charm" />
          </div>
          <h2 className="font-serif text-xl text-center mt-5 lg:text-left lg:leading-tight md:text-6xl 2xl:text-8xl ">
            Bonds we <span className="italic">create</span> can hardly be broken
          </h2>
        </div>

        <div className="hero-description text-center lg:text-left lg:text-2xl 2xl:w-7/12">
          <p>
            Postcards, bracelets, and whatever keeps your friendship strong and
            valued.
          </p>
          <p>
            Free delivery in Yerevan, HayPost in Armenia. Need a worldwide
            delivery? – Contact us!
          </p>
        </div>
        <button className="rounded-full p-5 px-10 tracking-wider bg-layout-dark-green font-bold text-xl self-center lg:self-start">
          Odrer
        </button>
      </div>
      <div className="hidden lg:flex justify-end items-end overflow-hidden relative">
        <img
          className="w-full rounded-3xl rotate-7 absolute -bottom-10 -right-11"
          src={HeroPostcard}
          alt="hero postcard"
        />
      </div>
    </section>
  );
}

export default Hero;
