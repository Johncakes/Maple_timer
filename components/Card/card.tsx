// components/card.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CardData } from "../../types/card";
import { playerDataType } from "../../types/playerData";
import { ocid } from "../../types/ocid";
import { IconButton } from "@mui/material";
import Pet from "./pet";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CloseIcon from "@mui/icons-material/Close";

type CardProps = {
  card: CardData;
  deleteCard: (id: number) => void;
};

export default function Card({ card, deleteCard }: CardProps) {
  const [ocidData, setOcidData] = useState<ocid>();
  const [playerData, setPlayerData] = useState<playerDataType>();
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const getOcidData = async () => {
      const query = await fetch(`/api/getUserOcid?username=${card.name}`);
      if (query.ok) {
        const response = await query.json();
        setOcidData(response);
        console.log("Response data : ", response);
      } else {
        console.log("Failed to fetch data");
      }
    };

    getOcidData();
  }, []);

  useEffect(() => {
    const getPlayerData = async () => {
      const ocid = ocidData?.ocid;
      const query = await fetch(`/api/getPlayerData?ocid=${ocid}`);
      if (query.ok) {
        const response = await query.json();
        setPlayerData(response);
        console.log("Player Response data : ", playerData);
      } else {
        console.log("Failed to fetch data");
      }
    };
    if (ocidData) {
      getPlayerData();
    }
  }, [ocidData]);

  return (
    <div className="relative border p-2 w-full shadow-md box-border rounded-md my-2">
      <div className="absolute top-1 right-1">
        <IconButton onClick={() => deleteCard(card.id)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
      <div className="flex flex-col place-content-center justify-between">
        <div className="flex " onClick={() => setShowDetail(!showDetail)}>
          <div className="h-16 w-16 border rounded flex justify-center items-center">
            {playerData ? (
              <Image
                src={playerData.character_image}
                alt={"test"}
                width={64}
                height={64}
              ></Image>
            ) : (
              <div>
                <QuestionMarkIcon />
              </div>
            )}
          </div>
          {playerData && (
            <div className="flex flex-col ml-2 py-2">
              <div>{playerData.character_name}</div>
              <div>Level : {playerData?.character_level}</div>
            </div>
          )}
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
