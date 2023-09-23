import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";

function App() {
  return (
    <div className="flex flex-col bg-slate-800">
      <Header></Header>

      <main className="flex flex-col h-screen bg-slate-900">
        <Hero></Hero>
        {/* <section className="p-10 bg-postcards-pattern">
          <span className="text-3xl font-serif text-red-700">
            THIS IS THE POSTCARDS
          </span>
        </section>
        <section className="p-10 bg-slate-500">
          <span className="text-3xl font-serif text-red-600">
            THIS IS THE CONSTRUCTORS SETS
          </span>
        </section>
        <section className="p-10 bg-slate-300">
          <span className="text-3xl font-serif text-red-600">
            THIS IS THE BRACELETS
          </span>
        </section>
        <section className="p-10 bg-slate-400">
          <span className="text-3xl font-serif text-red-700">
            THIS IS THE ORDER
          </span>
        </section> */}
      </main>
      {/* <footer className="flex flex-row  min-w-full p-10 bg-slate-300">
        <span className="grow text-3xl font-serif text-red-600">
          THIS IS THE FOOTER
        </span>
        <nav>
          <ul className="flex gap-x-2.5">
            <li>Overview</li>
            <li>Postcards</li>
            <li>Bracelets</li>
            <li>How to order</li>
            <li>Contacts</li>
          </ul>
        </nav>
      </footer> */}
    </div>
  );
}

export default App;
