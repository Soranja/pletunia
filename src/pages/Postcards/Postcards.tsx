import React from "react";
import PostcardSlider from "../../components/PostcardSlider/PostcardSlider";
import { useTranslation } from "react-i18next";

function Postcards() {
  const [t, i18n] = useTranslation();
  return (
    <section
      className="pt-16 pb-16 bg-postcards-pattern bg-cover flex flex-col  
      lg:items-center"
      id="postcards"
    >
      <h3
        className="text-layout-red-clay text-4xl pl-10 font-extrabold my-5 mb-12
        md:text-6xl md:mb-10 mt-0
        lg:pl-0"
      >
        {t("postcards.headline")}
      </h3>
      <span
        className="text-white text-xl text-justify lg:text-center px-10 
        lg:px-0 md:text-2xl
        lg:font-semibold"
      >
        {t("postcards.sectionDescription")}
      </span>
      <PostcardSlider></PostcardSlider>
    </section>
  );
}

export default Postcards;
