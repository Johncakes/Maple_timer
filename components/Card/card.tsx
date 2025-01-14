// components/card.tsx
import React, { useState } from "react";
import Image from "next/image";
import { CardData } from "../../types/card";
import Pet from "./pet";
import i18n from "@/locales/config";
import { WORLDS } from "@/constants/world";

type CardProps = {
  card: CardData;
};

export default function Card({ card }: CardProps) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="relative border p-2 w-full shadow-md box-border rounded-md my-2">
      <div className="flex flex-col place-content-center justify-between">
        <div className="flex " onClick={() => setShowDetail(!showDetail)}>
          <div className="h-16 w-16 border rounded flex justify-center items-center">
            <Image src={card.image} alt={"test"} width={64} height={64}></Image>
          </div>
          <div className="flex flex-col ml-2 py-2">
            <div className="font-bold">{card.name}</div>
            <div className="text-sm">{i18n.t(`${WORLDS(card.world)}`)}</div>
          </div>
        </div>

        {showDetail && (
          <div>
            <div className="my-2 h-px w-full bg-gray-200 rounded-sm" />

            <div className="flex flex-row justify-between space-x-2">
              <Pet></Pet>
              <Pet></Pet>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
