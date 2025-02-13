// components/card.tsx
import React from "react";
import { CardData } from "../../types/card";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type CardProps = {
  card: CardData;
  deleteCard: (id: string) => void;
  isLast: boolean;
};

export default function EditCard({ card, deleteCard, isLast }: CardProps) {
  return (
    <div className="relative p-2 w-full mt-2 border-b dark:border-zinc-600">
      <div className="flex justify-between align-middle items-center">
        <div className="flex align-middle items-center">
          <div className="flex py-2">
            <div className="dark:text-white font-bold">{card.name}</div>
          </div>
        </div>

        <Button
          variant="outlined"
          color="error"
          style={{ textTransform: "none" }}
          onClick={() => deleteCard(card.id)}
        >
          <DeleteIcon />
          Delete
        </Button>
      </div>
    </div>
  );
}
