import Image from "next/image";
import { useState } from "react";
import petIcon from "../../Images/petIcon.png";
import i18n from "@/locales/config";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Pet(props: {
  petTime: string;
  setPetTime: (time: string) => void;
}) {
  function changeTime(iHour: number, iMin: number) {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + iHour);
    currentTime.setMinutes(currentTime.getMinutes() + iMin);

    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedTime;
  }

  return (
    <div className="relative flex rounded w-full">
      <div className="absolute top-0 right-0">
        <IconButton>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
      <div className="flex flex-col items-center border p-2 rounded w-full">
        <Image
          src={petIcon}
          alt="Pet"
          width={48}
          height={48}
          className="border rounded p-2 bg-gray-100"
        />

        <div className="text-xs sm:text-base md:text-lg my-2">
          {i18n.t("pet.wake_time", { time: props.petTime })}
        </div>

        <div className="flex w-full flex-row space-x-2 text-xs sm:text-base">
          <button
            className="bg-blue-500 rounded px-1 py-2 text-white w-full transition duration-300 ease-in-out transform active:scale-95"
            onClick={() => props.setPetTime(changeTime(21, 0))}
          >
            {i18n.t("pet.time.21hr")}
          </button>
          <button
            className="bg-blue-500 rounded p-1 py-2 text-white w-full transition duration-300 ease-in-out transform active:scale-95"
            onClick={() => props.setPetTime(changeTime(0, 30))}
          >
            {i18n.t("pet.time.30min")}
          </button>
        </div>
      </div>
    </div>
  );
}
