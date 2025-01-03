// components/card.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CardData } from "../types/card";
import { playerDataType } from "../types/playerData";
import { ocid } from "../types/ocid";
import petIcon from "../Images/petIcon.png";
import NameInput from "./modal/nameInput";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CloseIcon from "@mui/icons-material/Close";

type CardProps = {
  card: CardData;
  deleteCard: (id: number) => void;
};

const username = "Cakes";

export default function Card({ card, deleteCard }: CardProps) {
  const [charName, setCharName] = useState(String);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [petTime1, setPetTime1] = useState(String);
  const [petTime2, setPetTime2] = useState(String);
  const [inputTime, setInputTime] = useState(String);
  const [inputTime2, setInputTime2] = useState(String);
  const [ocidData, setOcidData] = useState<ocid>();
  const [playerData, setPlayerData] = useState<playerDataType>();

  const handleOpen = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);

  useEffect(() => {
    const getOcidData = async () => {
      const query = await fetch(`/api/getUserOcid?username=${charName}`);
      if (query.ok) {
        const response = await query.json();
        setOcidData(response);
        console.log("Response data : ", response);
      } else {
        console.log("Failed to fetch data");
      }
    };

    if (charName) {
      getOcidData();
    }
  }, [charName]);

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

  function changeTime(iHour: number, iMin: number, iTime: string) {
    const [inputHour, inputMinute] = iTime.split(":").map(Number);
    const currentTime = new Date();
    currentTime.setHours(inputHour + iHour);
    currentTime.setMinutes(inputMinute + iMin);

    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedTime;
  }

  return (
    <div className="relative border p-3 w-3/4 shadow-md box-border rounded-md my-2">
      <div className="absolute top-1 right-1">
        <IconButton onClick={() => deleteCard(card.id)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
      <div className="flex flex-col place-content-center justify-between">
        <div className="flex mb-2">
          <div className="h-12 w-12 border rounded flex justify-center items-center">
            {playerData ? (
              <Image
                src={playerData.character_image}
                alt={"test"}
                width={48}
                height={48}
              ></Image>
            ) : (
              <div>
                <QuestionMarkIcon />
              </div>
            )}
          </div>
          {charName && playerData ? (
            <div className="flex flex-col ml-2 justify-center items-center">
              <div>
                {charName}
                <IconButton onClick={handleOpen}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </div>
              <div>Level : {playerData?.character_level}</div>
            </div>
          ) : (
            <button
              onClick={handleOpen}
              className="bg-blue-500 rounded p-2 text-white ml-2"
            >
              Add Character
            </button>
          )}
          <NameInput
            open={modalIsOpen}
            close={handleClose}
            setName={setCharName}
          />
        </div>

        <div className="flex rounded md:items-start items-center w-full">
          <div className="flex flex-col flex-shrink-0">
            <Image
              src={petIcon}
              alt="Pet"
              width={48}
              height={48}
              className="border rounded p-2 bg-white "
            />
            <div>level</div>
          </div>

          <div className="flex flex-col border p-2 ml-2 rounded w-full">
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

            {ocidData && (
              <div className="mt-4">
                <div>API DATA:</div>
                <div>{JSON.stringify(ocidData)}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
