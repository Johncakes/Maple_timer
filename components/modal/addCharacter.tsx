import Modal from "@mui/material/Modal";
import { playerDataType } from "@/types/playerData";
import { character } from "@/types/card";
import React, { useState } from "react";
import i18n from "@/locales/config";
import Image from "next/image";
import { WORLDS } from "@/constants/world";
import { Button, Card, CardMedia, TextField } from "@mui/material";

export default function AddCharacter(props: {
  open: boolean;
  close: () => void;
  createNewCard: (character: character) => void;
  checkDuplicate: (name: string) => boolean;
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
      }
    };

    const getOcidData = async () => {
      const query = await fetch(`/api/getUserOcid?username=${name}`);
      if (query.ok) {
        const response = await query.json();
        getPlayerData(response.ocid);
        setError("");
      } else {
        setError(i18n.t("add.error.400"));
      }
    };
    await getOcidData();
  };

  const handleClose = () => {
    setName("");
    setError("");
    setPlayerData(undefined);
    props.close();
  };

  const handleAdd = () => {
    if (playerData) {
      if (props.checkDuplicate(playerData.character_name)) {
        setError(i18n.t("add.error.duplicate"));
      } else {
        props.createNewCard({
          name: playerData.character_name,
          level: playerData.character_level,
          world: playerData.world_name,
          image: playerData.character_image,
          leftPetTime: null,
          rightPetTime: null,
        });
        handleClose();
      }
    } else {
      handleSearch();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Modal open={props.open} onClose={handleClose}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-center bg-white dark:bg-zinc-800 rounded-lg w-11/12 md:w-1/2 ">
        <div className="flex flex-col p-4">
          <h1 className="dark:text-white text-2xl font-bold mb-2">
            {i18n.t("add.add_char")}
          </h1>
          <div className="flex flex-row w-full space-x-2">
            <TextField
              label={i18n.t("add.search_bar")}
              variant="outlined"
              className="w-full"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck="false"
            />
          </div>
          {error && <div className="text-red-500 px-1 mt-1">{error}</div>}
          <div className="flex flex-row mt-2">
            {playerData && (
              <div className="flex flex-row space-x-2">
                <Card
                  className="border dark:border-zinc-700 dark:bg-zinc-800 shadow-none"
                  sx={{ boxShadow: 0 }}
                >
                  <CardMedia>
                    <Image
                      src={playerData.character_image}
                      alt={"PlayerImage"}
                      width={96}
                      height={96}
                      className="-scale-x-100"
                    ></Image>
                  </CardMedia>
                </Card>
                <div>
                  <div className="p-2 dark:text-white">
                    <div className="font-bold">{playerData.character_name}</div>
                    <div>
                      {i18n.t("character_info.level")}
                      {playerData.character_level}
                    </div>
                    <div>{WORLDS(playerData.world_name)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row-reverse space-x-reverse space-x-2 mt-2">
            <Button
              style={{ textTransform: "none" }}
              variant="contained"
              onClick={handleAdd}
            >
              {i18n.t("button.add")}
            </Button>
            <Button style={{ textTransform: "none" }} onClick={handleClose}>
              {i18n.t("button.cancel")}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
