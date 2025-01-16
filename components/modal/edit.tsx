import Modal from "@mui/material/Modal";
import React, { useState, useEffect } from "react";
import i18n from "@/locales/config";
import EditCard from "../Card/editCard";
import { CardData } from "@/types/card";

export default function Edit(props: {
  open: boolean;
  card: CardData[];
  close: () => void;
  deleteCard: (id: number[]) => void;
}) {
  const [cardToDelete, setCardToDelete] = useState<number[]>([]);

  const addDeleteCard = (id: number) => {
    setCardToDelete((prev) => [...prev, id]);
  };

  const handleClose = () => {
    setCardToDelete([]);
    props.close();
  };
  const handleSave = () => {
    props.deleteCard(cardToDelete);
    handleClose();
  };

  return (
    <Modal open={props.open} onClose={handleClose}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-center bg-white rounded-lg w-11/12 md:w-1/2 ">
        <h1 className="text-2xl font-bold border-2 p-4">
          {i18n.t("edit.edit_char")}
        </h1>
        <div className="flex flex-col px-4 overflow-y-auto max-h-80 ">
          {props.card.length === 0 && (
            <div className="flex justify-center items-center h-40">
              <h1 className="text-xl font-bold ">{i18n.t("edit.no_char")}</h1>
            </div>
          )}
          {props.card
            .filter((card) => !cardToDelete.includes(card.id))
            .map((card, index, array) => (
              <EditCard
                key={card.id}
                card={card}
                deleteCard={addDeleteCard}
                isLast={index === array.length - 1}
              />
            ))}
        </div>
        <div className="flex flex-row justify-between p-4 border-t-2">
          <button
            className="bg-gray-500 text-white p-2 min-w-24 rounded-lg"
            onClick={handleClose}
          >
            {i18n.t("button.cancel")}
          </button>
          <button
            className="p-2 min-w-24 rounded-lg bg-blue-500 text-white"
            onClick={handleSave}
          >
            {i18n.t("button.save")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
