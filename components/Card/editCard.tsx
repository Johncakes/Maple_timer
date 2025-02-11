// components/card.tsx
import React from "react";
import { CardData } from "../../types/card";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type CardProps = {
  card: CardData;
  deleteCard: (id: string) => void;
  isLast: boolean;
};

export default function EditCard({ card, deleteCard, isLast }: CardProps) {
  return (
    <div className="relative p-2 w-full mt-2 border-b">
      <div className="flex justify-between align-middle items-center">
        <div className="flex align-middle items-center">
          <div className="flex py-2">
            <div className="font-medium">{card.name}</div>
          </div>
        </div>
        <IconButton onClick={() => deleteCard(card.id)}>
          <DeleteIcon sx={{ color: "#EF4343" }} />
        </IconButton>
      </div>
    </div>
  );
}
