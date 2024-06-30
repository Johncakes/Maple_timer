import { Inter } from "next/font/google";
import React, { useState } from "react";
import Card from "../components/card";
import { CardData } from "../types/card";
import MainHeader from "../components/mainHeader";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [Clicks, setClicks] = useState(0);
  const [Cards, setCards] = useState<CardData[]>([]);

  function createNewCards() {
    setCards([...Cards, { id: Clicks, name: `NameTest:${Clicks + 1}` }]);
    setClicks(Clicks + 1);
  }

  function deleteCard(id: number) {
    setCards(Cards.filter((card) => card.id !== id));
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <MainHeader />

      {Cards.map((card) => (
        <Card key={card.id} card={card} deleteCard={deleteCard} />
      ))}
      <button
        onClick={createNewCards}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create ({Clicks})
      </button>
    </main>
  );
}
