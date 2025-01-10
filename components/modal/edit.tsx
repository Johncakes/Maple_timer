import Modal from "@mui/material/Modal";
import React, { useState, useEffect } from "react";
import i18n from "@/locales/config";
import Card from "../../components/Card/card";
import { CardData } from "@/types/card";

export default function Edit(props: {
  open: boolean;
  card: CardData[];
  close: () => void;
  deleteCard: (id: number) => void;
}) {
  const [cardToDelete, setCardToDelete] = useState<number[]>([]);

  const addDeleteCard = (id: number) => {
    setCardToDelete((prev) => [...prev, id]);
  };

  const handleClose = () => {
    // setCardToDelete([]);
    props.close();
  };
  const handleSave = () => {
    cardToDelete.forEach((id) => {
      console.log("Deleting card with id : ", id);
      props.deleteCard(id);
    });
    handleClose();
  };

  console.log("Props.Card : ", props.card);
  console.log("Card to delete : ", cardToDelete);
  return (
    <Modal open={props.open} onClose={handleClose}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-center bg-white rounded-lg w-11/12 md:w-1/2 ">
        <div className="flex flex-col p-4">
          <h1 className="text-2xl font-bold">{i18n.t("edit.edit_char")}</h1>

          {props.card
            .filter((card) => !cardToDelete.includes(card.id))
            .map((card) => (
              <Card key={card.id} card={card} deleteCard={addDeleteCard} />
            ))}

          <div className="flex flex-row justify-between mt-2">
            <button
              className="bg-gray-400 text-white p-2 min-w-24 rounded-lg"
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
      </div>
    </Modal>
  );
}
