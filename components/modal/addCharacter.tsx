import Modal from "@mui/material/Modal";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { ocid } from "@/types/ocid";
import { playerDataType } from "@/types/playerData";
import React, { useState, useEffect } from "react";
import i18n from "@/locales/config";
import Image from "next/image";
import { WORLDS } from "@/constants/world";

export default function AddCharacter(props: {
  open: boolean;
  close: () => void;
  createNewCard: (character: {
    name: string;
    level: number;
    world: string;
    image: string;
  }) => void;
}) {
  const [playerData, setPlayerData] = useState<playerDataType>();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const getPlayerData = async (ocid: string) => {
      const query = await fetch(`/api/getPlayerData?ocid=${ocid}`);
      if (query.ok) {
        const response = await query.json();
        setPlayerData(response);
        console.log("Player Response data : ", response);
      } else {
        setError("Character doesn't exist");
        console.log("Failed to fetch player data");
      }
    };

    const getOcidData = async () => {
      console.log("Name : ", name);
      const query = await fetch(`/api/getUserOcid?username=${name}`);
      if (query.ok) {
        const response = await query.json();
        getPlayerData(response.ocid);
        setError("");
        console.log("OCID Response data : ", response);
      } else {
        setError("Character doesn't exist");
        console.log("Failed to fetch ocid data");
      }
    };
    await getOcidData();
  };

  const handleClose = () => {
    setName("");
    setPlayerData(undefined);
    props.close();
  };

  const handleAdd = () => {
    if (playerData) {
      props.createNewCard({
        name: playerData.character_name,
        level: playerData.character_level,
        world: playerData.world_name,
        image: playerData.character_image,
      });
      handleClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Modal open={props.open} onClose={handleClose}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-center bg-white rounded-lg w-11/12 md:w-1/2 ">
        <div className="flex flex-col p-4">
          <h1 className="text-2xl font-bold">{i18n.t("add.add_char")}</h1>
          <label htmlFor="name" className="text-lg">
            {i18n.t("add.char_name")}
          </label>
          <div className="flex flex-row w-full space-x-2">
            <input
              type="text"
              id="name"
              className="border p-2 w-full rounded-lg"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-2 w-24 rounded-lg"
            >
              {i18n.t("button.search")}
            </button>
          </div>
          <div className="flex flex-row mt-2">
            {error != "" ? (
              <div className="text-red-500 px-1">{error}</div>
            ) : (
              playerData && (
                <div className="flex flex-row space-x-2">
                  <div className="h-24 w-24 border rounded-lg flex justify-center items-center ">
                    <Image
                      src={playerData.character_image}
                      alt={"test"}
                      width={96}
                      height={96}
                    ></Image>
                  </div>
                  <div>
                    <div className="p-2">
                      <div>{playerData.character_name}</div>
                      <div>
                        {i18n.t("character_info.level")}
                        {playerData.character_level}
                      </div>
                      <div>{WORLDS(playerData.world_name)}</div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="flex flex-row justify-between mt-2">
            <button
              className="bg-gray-400 text-white p-2 min-w-24 rounded-lg"
              onClick={handleClose}
            >
              {i18n.t("button.cancel")}
            </button>
            <button
              className={`p-2 min-w-24 rounded-lg ${
                playerData && !error ? "bg-blue-500" : "bg-gray-400"
              } text-white`}
              onClick={handleAdd}
            >
              {i18n.t("button.add")}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
