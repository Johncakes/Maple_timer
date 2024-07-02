// components/card.tsx
import React, { useState } from "react";
import Image from "next/image";
import { CardData } from "../types/card";
import petIcon from "../Images/petIcon.png";

type CardProps = {
  card: CardData;
  deleteCard: (id: number) => void;
};

export default function Card({ card, deleteCard }: CardProps) {
  const [petTime1, setPetTime1] = useState(String);
  const [petTime2, setPetTime2] = useState(String);
  const [inputTime, setInputTime] = useState(String);
  const [inputTime2, setInputTime2] = useState(String);

  function changeTime(iHour: number, iMin: number, iTime: string) {
    const [inputHour, inputMinute] = iTime.split(":").map(Number);
    const currentTime = new Date();
    currentTime.setHours(inputHour + iHour);
    currentTime.setMinutes(inputMinute + iMin);

    console.log(inputHour);
    console.log(inputMinute);
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedTime;
  }

  return (
    <div className="relative w-full border p-3 shadow-md box-border rounded-md my-2">
      <div className="absolute top-1 right-3">
        <button onClick={() => deleteCard(card.id)}>x</button>
      </div>
      <div className="flex flex-col place-content-center justify-between">
        <div className="flex mb-2">
          <div className="h-12 w-12 bg-black rounded-md"></div>
          <div className="flex justify-center">{card.name}</div>
        </div>

        <div className="flex justify-between rounded md:items-start items-center">
          {/* <div className="h-16 w-16 bg-gray-600 rounded-md">Pet Image</div> */}
          <div className="flex flex-col ">
            <Image
              src={petIcon}
              alt="Pet"
              width={64}
              height={64}
              className="border rounded p-2 bg-white "
            />
            <div>level</div>
          </div>
          <div className="flex flex-col border p-2 w-full ml-2 rounded ">
            <div>
              <div>Pet wake up time </div>
              <div>{petTime1 || "Pick Time first"}</div>
            </div>

            <div className="flex flex-col md:flex-row justify-between">
              <input
                type="time"
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
                className=" p-1 rounded border md:w-1/3 "
                placeholder="Hr"
              />
              <div className="flex justify-between w-full mt-2 md:mt-0 md:ml-2">
                <button
                  className="bg-blue-500 rounded mr-1 p-2 text-white w-1/2 transition duration-300 ease-in-out transform active:scale-95"
                  onClick={() => setPetTime1(changeTime(21, 0, inputTime))}
                >
                  21Hrs
                </button>
                <button
                  className="bg-blue-500 rounded ml-1 p-2 text-white w-1/2 transition duration-300 ease-in-out transform active:scale-95"
                  onClick={() => setPetTime1(changeTime(0, 30, inputTime))}
                >
                  30Mins
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
