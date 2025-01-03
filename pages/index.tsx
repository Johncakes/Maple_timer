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
    <div>
      <MainHeader />
      <main className="flex justify-center">
        <div className="flex flex-col items-center justify-center xl:w-1/3 w-full min-h-screen pt-16 p-4">
          {Cards.map((card) => (
            <Card key={card.id} card={card} deleteCard={deleteCard} />
          ))}
          <button
            onClick={createNewCards}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Create ({Clicks})
          </button>
        </div>
      </main>
    </div>
  );
}
