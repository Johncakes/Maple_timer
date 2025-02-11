import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import i18n from "@/locales/config";
import EditCard from "../Card/editCard";
import { CardData } from "@/types/card";

export default function Edit(props: {
  open: boolean;
  card: CardData[];
  close: () => void;
  deleteCard: (id: string[]) => void;
}) {
  const [cardToDelete, setCardToDelete] = useState<string[]>([]);

  const addDeleteCard = (id: string) => {
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-center  rounded-lg w-11/12 md:w-1/2 bg-white">
        <h1 className="text-2xl font-bold border-b-2 p-4">
          {i18n.t("edit.edit_char")}
        </h1>
        <div className="flex flex-col px-4 overflow-y-auto max-h-80 ">
          {(props.card.length === 0 ||
            cardToDelete.length === props.card.length) && (
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
        <div className="flex flex-row-reverse space-x-reverse space-x-2 p-4 ">
          <button
            className="px-2 min-w-20 h-9 rounded-xl bg-blue-500 text-white"
            onClick={handleSave}
          >
            {i18n.t("button.save")}
          </button>
          <button
            className="text-gray-600 px-2 h-9 min-w-20 rounded-xl hover:bg-gray-200"
            onClick={handleClose}
          >
            {i18n.t("button.cancel")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
