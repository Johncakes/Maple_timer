// components/card.tsx
import React, { useState } from "react";
import Image from "next/image";
import { CardData } from "../../types/card";
import Pet from "../pet/pet";
import i18n from "@/locales/config";
import { WORLDS } from "@/constants/world";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Collapse,
  Divider,
  Fade,
  IconButton,
} from "@mui/material";
import PetState from "../pet/petState";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function PlayerCard(props: {
  card: CardData;
  updateCard: (
    id: string,
    leftPetTime: Date | null,
    rightPetTime: Date | null
  ) => void;
  deleteCard: (id: string[]) => void;
  showEdit: boolean;
}) {
  const [showDetail, setShowDetail] = useState(false);

  const setLeftPetTime = (time: Date | null) => {
    props.updateCard(props.card.id, time, props.card.rightPetTime);
  };
  const setRightPetTime = (time: Date | null) => {
    props.updateCard(props.card.id, props.card.leftPetTime, time);
  };

  return (
    <Card className="relative p-2 w-full my-2 dark:border-none flex flex-col items-center justify-center">
      <Collapse in={showDetail} collapsedSize={68} className="w-full">
        <div className="flex flex-col place-content-center">
          <div
            className="flex items-center justify-between"
            onClick={() => setShowDetail(!showDetail)}
          >
            <div className="flex ">
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
                <div className="font-bold dark:text-white">
                  {props.card.name}
                </div>
                <div className="text-sm dark:text-white">
                  {i18n.t(`${WORLDS(props.card.world)}`)}
                </div>
              </div>
            </div>

            {props.showEdit && (
              <Fade in={props.showEdit}>
                <Button
                  style={{ textTransform: "none" }}
                  onClick={() => {
                    props.deleteCard([props.card.id]);
                  }}
                >
                  {i18n.t("button.delete")}
                </Button>
              </Fade>
            )}
            {!props.showEdit && (
              <Fade in={!props.showEdit}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    color: "text.secondary",
                    "& svg": {
                      m: 1,
                    },
                  }}
                >
                  <PetState petTime={props.card.leftPetTime} />
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <PetState petTime={props.card.rightPetTime} />
                </Box>
              </Fade>
            )}
          </div>

          <Fade in={showDetail}>
            <div>
              <Divider variant="middle" sx={{ my: 1 }} />
              <div className="flex flex-row justify-between space-x-2">
                <Pet
                  petTime={props.card.leftPetTime}
                  setPetTime={setLeftPetTime}
                />
                <Pet
                  petTime={props.card.rightPetTime}
                  setPetTime={setRightPetTime}
                />
              </div>
            </div>
          </Fade>
        </div>
      </Collapse>

      <IconButton
        onClick={() => setShowDetail(!showDetail)}
        className="w-full"
        sx={{ p: 0 }}
      >
        {showDetail ? (
          <ArrowDropUpIcon fontSize="small" />
        ) : (
          <ArrowDropDownIcon fontSize="small" className="absolute bottom-0" />
        )}
      </IconButton>
    </Card>
  );
}
