import React, { useState } from "react";
import Card from "../components/Card/card";
import { CardData } from "../types/card";
import AddCardButton from "../components/addCardButton";
import MainHeader from "../components/mainHeader";
import AddCharacter from "@/components/modal/addCharacter";

export default function Home() {
  const [cardIdCounter, setCardIdCounter] = useState(0);
  const [Cards, setCards] = useState<CardData[]>([]);
  const [showAddCharacter, setShowAddCharacter] = useState(false);

  function createNewCard(character: {
    name: string;
    level: number;
    world: string;
    image: string;
  }) {
    setCards([...Cards, { id: cardIdCounter, ...character }]);
    setCardIdCounter(cardIdCounter + 1);
  }

  function deleteCard(id: number) {
    setCards(Cards.filter((card) => card.id !== id));
  }

  const handleOpen = () => setShowAddCharacter(true);
  const handleClose = () => setShowAddCharacter(false);

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <main className="flex-grow flex justify-center bg-gray-100 overflow-y-auto">
        <div className="flex flex-col items-center pt-16 max-w-screen-md w-full p-4 bg-white min-h-screen">
          {Cards.map((card) => (
            <Card key={card.id} card={card} deleteCard={deleteCard} />
          ))}

          <AddCharacter
            open={showAddCharacter}
            close={handleClose}
            createNewCard={createNewCard}
          />

          <AddCardButton setOpen={handleOpen} />
        </div>
      </main>
    </div>
  );
}
