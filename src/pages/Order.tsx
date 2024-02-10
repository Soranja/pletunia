import React, { FormEvent, useState } from "react";
import GreenGirl from "../data/imgs/pages/green_girl.jpg";

// Data
import postcards from "../data/postcards.json";
import { CardType } from "../types/cardType";

// Translation
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

// Redux
import { useAppSelector } from "../hooks/selector";
import { useActions } from "../hooks/actions";

// Form submission
import axios from "axios";

const Order = () => {
  const initialSize = window.innerWidth;
  const { t }: any = useTranslation("translation", { i18n });
  // 'any' for reason t func errors -- 'For now, this is the only possible workaround. This is a TypeScript limitation that will be address at some point in the future.'

  const { checkedCards, selectedCardsIds } = useAppSelector(
    (state) => state.selector
  );
  const { setSelectedCardsIds, setCheckedCards } = useActions();

  // Duplicates handleAddButtonClick, so both components can update the same state
  const handleTick = (id: number) => {
    // Add cards Ids to an array, Ids are sorted
    setSelectedCardsIds(
      selectedCardsIds.includes(id)
        ? selectedCardsIds
            .filter((prevId) => prevId !== id)
            .sort(function (a, b) {
              return a - b;
            })
        : [...selectedCardsIds, id].sort(function (a, b) {
            return a - b;
          })
    );

    // Update checkedCards array
    function updatedCheckedCards(prevCheckedCards: boolean[]) {
      const updatedCheckedCardsArray = [...prevCheckedCards];
      const indexToUpdate = postcards.findIndex((card) => card.id === id);

      if (indexToUpdate !== -1) {
        updatedCheckedCardsArray[indexToUpdate] =
          !updatedCheckedCardsArray[indexToUpdate];
      }
      return updatedCheckedCardsArray;
    }

    setCheckedCards(updatedCheckedCards(checkedCards));
  };

  // Print names of selected postcards
  const selectedPostcards = postcards
    .filter((card) => selectedCardsIds.includes(card.id))
    .map((card) => card.name);

  // States for the order form & message
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [userComment, setUserComment] = useState<string>("");

  // Submit order to TG bot
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // local
    const botToken = process.env.REACT_APP_TOKEN;
    const chatId = process.env.REACT_APP_CHAT_ID;

    // Vercel
    // const botToken = process.env.REACT_APP_VERCEL_ENV_TOKEN;
    // const chatId = process.env.REACT_APP_VERCEL_ENV_CHAT_ID;

    // Replace TOKEN + logic with Node.js backend for SECURITY!

    const message =
      "Name: " +
      userName +
      "\nEmail: " +
      userEmail +
      "\nPhone: " +
      userPhone +
      "\nOrder: " +
      selectedPostcards.map(
        (postcard: string) =>
          // Extra space at the beginning
          " " + postcard.charAt(0).toUpperCase() + postcard.slice(1)
      ) +
      "\nComment: " +
      userComment;

    try {
      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message,
      });
      alert("Message sent successfully!");

      setUserName("");
      setUserEmail("");
      setUserPhone("");
      setUserComment("");
      setSelectedCardsIds([]);
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div
      className="text-white 
      flex flex-col  pt-20 pb-20 px-10 pr-28
      lg:text-xl lg:grid grid-cols-order lg:grid-rows-order lg:pl-0 lg:items-start"
      style={{
        background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(24, 64, 23, 0.8)), url(${GreenGirl})`,
        backgroundSize: `${initialSize <= 1168 ? "17%" : "14%"}`,
        backgroundPositionY: `67%`,
        backgroundPositionX: `49%`,
      }}
      id="order"
    >
      <div
        className="
      left-column flex flex-col lg:items-end
      lg:pr-24"
      >
        <h3
          className="text-3xl font-extrabold mb-12 
          md:pr-0 
          lg:text-5xl lg:text-right"
        >
          {t("orderForm.headline")}
        </h3>
        <img
          className="
          hidden rounded-r-3xl
          lg:block lg:w-5/12 xl:w-4/12"
          src={GreenGirl}
          alt="Green Girl"
        />
      </div>

      <div className="right-column lg:pl-24 flex flex-col gap-4 items-start justify-start">
        <h4 className="text-2xl lg:text-3xl font-bold">
          {t("orderForm.choose")}
        </h4>
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex gap-x-6 flex-col md:flex-row">
            {postcards.map((card: CardType, index: number) => (
              <div key={card.id} className="flex gap-2 checked:bg-black">
                <input
                  type="checkbox"
                  className="text-green-600 bg-gray-100 border-gray-300 rounded accent-green-600"
                  id={`${card.id}`}
                  value={card.name}
                  checked={checkedCards[index]}
                  onChange={() => handleTick(card.id)}
                />
                <label htmlFor={`${card.id}`}>
                  {t(`postcards.cards.${card.name}.name` as const)}
                </label>
              </div>
            ))}
          </div>
          <form
            className="info-inputs flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name">{t("orderForm.name")}</label>
              <input
                required
                className="text-black px-5 lg:w-80 py-2 rounded-lg"
                type="text"
                id="name"
                name="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">{t("orderForm.email")}</label>
              <input
                required
                className="text-black px-5 lg:w-80 py-2 rounded-lg"
                type="text"
                id="email"
                name="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone">{t("orderForm.phone")}</label>
              <input
                required
                className="text-black px-5 lg:w-80 py-2 rounded-lg"
                type="tel"
                id="phone"
                name="phone"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="comment">{t("orderForm.comment")}</label>
              <textarea
                className="text-black px-5 lg:w-80 py-5 rounded-xl"
                id="comment"
                name="comment"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
              ></textarea>
            </div>
            <input
              className="mt-8 rounded-2xl p-5 w-40 lg:w-80 tracking-wider bg-layout-blue-gray font-bold text-xl cursor-pointer"
              type="submit"
              value={`${t("orderButton")}!`}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
