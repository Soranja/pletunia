import React, { useState } from "react";
import { motion } from "framer-motion";

// Images
import Coraline from "../../data/img/cut/coraline.jpg";
import PumpkinJack from "../../data/img/cut/pumpkin.jpg";
import CustomPortrait from "../../data/img/cut/custom.jpg";
// a separate file for imports?

function PostcardSlider() {
  const [expandedIndex, setExpandedIndex] = useState<null | number>(1);
  const handleCardClick = (index: number) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  const cardSizes = {
    expanded: { width: "400px" },
    collapsed: { width: "200px" },
  };

  const cardNames = ["CORALINE", "THE PUMPKIN JACK", "CUSTOM"];
  const cardPrices = [1500, 1500, 3000];
  const cardImages = [Coraline, PumpkinJack, CustomPortrait];
  const cardDescriptions = [
    "Take her!",
    "Halloween Soon!",
    "Fine choice, sir, fine choice...",
  ];

  // names, prices, middle index are hadrcoded, is it ok if i dont plan to expand the slider, or...

  return (
    <section className="py-16 pb-[300px]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mt-12 flex justify-center items-center gap-5">
          {[0, 1, 2].map((index: number) => (
            <motion.div
              key={index}
              className={`card cursor-pointer h-[500px] bg-cover bg-center rounded-[20px] ${
                index === expandedIndex ? "expanded" : ""
              }`}
              variants={cardSizes}
              initial="collapsed"
              animate={index === expandedIndex ? "expanded" : "collapsed"}
              transition={{ duration: 0.5 }}
              onClick={() => handleCardClick(index)}
              style={{ backgroundImage: `url(${cardImages[index]})` }}
            >
              <div className="card-content h-full flex flex-col justify-end">
                <div className="card-footer rounded-b-[20px] bg-opacity-75 min-h-[100px] flex flex-col items-center justify-center">
                  {index !== expandedIndex && (
                    <h4 className="text-xl font-extrabold text-white">
                      {cardNames[index]}
                    </h4>
                  )}

                  {index === expandedIndex && (
                    <div>
                      <h4 className="text-xl font-extrabold text-white">
                        {`${cardNames[index]} - ${cardPrices[index]}`}
                      </h4>
                      <p className="mt-2 text-center">
                        {cardDescriptions[index]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PostcardSlider;
