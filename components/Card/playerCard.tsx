// components/card.tsx
import React, { useState } from "react";
import Image from "next/image";
import { CardData } from "../../types/card";
import Pet from "../pet";
import i18n from "@/locales/config";
import { WORLDS } from "@/constants/world";
import { Card, CardMedia } from "@mui/material";

export default function PlayerCard(props: {
  card: CardData;
  updateCard: (id: string, leftPetTime: string, rightPetTime: string) => void;
}) {
  const [showDetail, setShowDetail] = useState(false);

  const setLeftPetTime = (time: string) => {
    props.updateCard(props.card.id, time, props.card.rightPetTime);
  };
  const setRightPetTime = (time: string) => {
    props.updateCard(props.card.id, props.card.leftPetTime, time);
  };

  // <div className="relative border p-2 w-full shadow-md box-border rounded-md my-2 dark:bg-zinc-800 dark:border-none">
  // </div>
  return (
    <Card className="relative p-2 w-full my-2 dark:border-none">
      <div className="flex flex-col place-content-center justify-between">
        <div className="flex " onClick={() => setShowDetail(!showDetail)}>
          <Card
            className="border dark:border-zinc-700 shadow-none rounded-lg"
            sx={{ boxShadow: 0 }}
          >
            <CardMedia>
              <Image
                src={props.card.image}
                alt={"test"}
                width={64}
                height={64}
                className="-scale-x-100"
              />
            </CardMedia>
          </Card>
          <div className="flex flex-col ml-2 py-2">
            <div className="font-bold dark:text-white">{props.card.name}</div>
            <div className="text-sm dark:text-white">
              {i18n.t(`${WORLDS(props.card.world)}`)}
            </div>
          </div>
        </div>

        {showDetail && (
          <div>
            <div className="my-2 h-px w-full bg-gray-200 dark:bg-zinc-600 rounded-sm" />

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
    </Card>
  );
}
