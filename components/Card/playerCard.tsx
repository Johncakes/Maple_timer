// components/card.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CardData } from "../../types/card";
import Pet from "./pet";
import i18n from "@/locales/config";
import { WORLDS } from "@/constants/world";

export default function PlayerCard(props: {
  card: CardData;
  updateCard: (id: number, leftPetTime: string, rightPetTime: string) => void;
}) {
  const [showDetail, setShowDetail] = useState(false);

  const setLeftPetTime = (time: string) => {
    props.updateCard(props.card.id, time, props.card.rightPetTime);
  };
  const setRightPetTime = (time: string) => {
    props.updateCard(props.card.id, props.card.leftPetTime, time);
  };

  return (
    <div className="relative border p-2 w-full shadow-md box-border rounded-md my-2">
      <div className="flex flex-col place-content-center justify-between">
        <div className="flex " onClick={() => setShowDetail(!showDetail)}>
          <div className="h-16 w-16 border rounded flex justify-center items-center">
            <Image
              src={props.card.image}
              alt={"test"}
              width={64}
              height={64}
            ></Image>
          </div>
          <div className="flex flex-col ml-2 py-2">
            <div className="font-bold">{props.card.name}</div>
            <div className="text-sm">
              {i18n.t(`${WORLDS(props.card.world)}`)}
            </div>
          </div>
        </div>

        {showDetail && (
          <div>
            <div className="my-2 h-px w-full bg-gray-200 rounded-sm" />

            <div className="flex flex-row justify-between space-x-2">
              <Pet
                petTime={props.card.leftPetTime}
                setPetTime={setLeftPetTime}
              ></Pet>
              <Pet
                petTime={props.card.rightPetTime}
                setPetTime={setRightPetTime}
              ></Pet>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
