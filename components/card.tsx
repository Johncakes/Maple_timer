// components/card.tsx
import React, { useState } from "react";
import { CardData } from "../types/card";

type CardProps = {
  card: CardData;
  deleteCard: (id: number) => void;
};

export default function Card({ card, deleteCard }: CardProps) {
  const [petTime1, setPetTime1] = useState(String);
  const [inputHours, setInputHours] = useState("");
  const [inputMinutes, setInputMinutes] = useState("");
  const [petTime2, setPetTime2] = useState(String);

  function changeTime(
    hours: number,
    minutes: number,
    increaseHour: number,
    increaseMinute: number
  ) {
    const currentTime = new Date();
    currentTime.setHours(+hours);
    currentTime.setMinutes(currentTime.getMinutes() + minutes);
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return formattedTime;
  }

  return (
    <div className="relative w-full border border-white p-3 shadow-xl box-border rounded-md my-2">
      <div className="absolute top-0 right-2">
        <button onClick={() => deleteCard(card.id)}>x</button>
      </div>
      <div className="flex flex-col place-content-center justify-between">
        <div className="flex mb-2">
          <div className="h-12 w-12 bg-black rounded-md"></div>
          <div className="flex justify-center">{card.name}</div>
        </div>

        <div className="flex justify-between bg-gray-400 p-2 rounded items-center">
          <div className="h-16 w-16 bg-gray-600 rounded-md">Pet Image</div>
          <div className="flex flex-col w-2/3 rounded bg-gray-400">
            <div>Wake up by : {petTime1}</div>
            <div className="flex justify-between">
              <input
                type="number"
                value={inputHours}
                onChange={(e) => setInputHours(e.target.value)}
                className="w-8 p-1 border rounded mr-2"
                placeholder="Hr"
              />
              <input
                type="number"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
                className="w-8 p-1 border rounded mr-2"
                placeholder="Min"
              />
              <button
                className="bg-blue-500 rounded p-2 text-white transition duration-300 ease-in-out transform active:scale-95"
                onClick={() => {
                  // setPetTime1(
                  //     changeTime(Number(inputHours), Number(inputMinutes))
                  // );
                }}
              >
                21Hrs
              </button>
              <button
                className="bg-blue-500 rounded p-2 text-white transition duration-300 ease-in-out transform active:scale-95"
                onClick={() => {
                  // setPetTime1(changeTime(0, 30));
                }}
              >
                30Mins
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
