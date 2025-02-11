import React, { useEffect, useState } from "react";
import { character } from "@/types/card";
import { v4 as uuidv4 } from "uuid";
import PlayerCard from "../components/Card/playerCard";
import { CardData } from "../types/card";
import AddCardButton from "../components/addCardButton";
import MainHeader from "../components/mainHeader";
import AddCharacter from "@/components/modal/addCharacter";
import Edit from "@/components/modal/edit";
import Settings from "@/components/modal/settings";
import i18n from "@/locales/config";

export default function Home() {
  const [cardIdCounter, setCardIdCounter] = useState(0);
  const [Cards, setCards] = useState<CardData[]>([]);
  const [showAddCharacter, setShowAddCharacter] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  function createNewCard(character: character) {
    setCards([...Cards, { id: uuidv4(), ...character }]);
    setCardIdCounter(cardIdCounter + 1);
  }

  function updateCard(id: string, leftPetTime: string, rightPetTime: string) {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, leftPetTime, rightPetTime } : card
      )
    );
    console.log("card updated", Cards);
  }

  function checkDuplicate(name: string) {
    return Cards.some((card) => card.name === name);
  }

  useEffect(() => {
    const localStorageCards = localStorage.getItem("cards");
    const localStorageLanguage = localStorage.getItem("i18nextLng");
    if (localStorageCards) {
      const parsedCards = JSON.parse(localStorageCards);
      setCards(parsedCards);
      setCardIdCounter(parsedCards.length + 1);
    }

    if (localStorageLanguage) {
      i18n.changeLanguage(localStorageLanguage);
    }
  }, []);

  useEffect(() => {
    if (Cards.length > 0) {
      console.log("Updated to localStorage : ", Cards);
      localStorage.setItem("cards", JSON.stringify(Cards));
    }
  }, [Cards]);

  function deleteCard(id: string[]) {
    setCards((prevCards) => prevCards.filter((card) => !id.includes(card.id)));
  }

  const handleOpenAdd = () => setShowAddCharacter(true);
  const handleCloseAdd = () => setShowAddCharacter(false);

  const handleOpenEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const handleOpenSettings = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader openEdit={handleOpenEdit} openSettings={handleOpenSettings} />
      <main className="flex-grow flex justify-center bg-gray-100 overflow-y-auto">
        <div className="flex flex-col items-center pt-20 max-w-screen-md w-full p-4 bg-white min-h-screen">
          {Cards.map((card) => (
            <PlayerCard key={card.id} card={card} updateCard={updateCard} />
          ))}

          <Edit
            open={showEdit}
            close={handleCloseEdit}
            card={Cards}
            deleteCard={deleteCard}
          />

          <AddCharacter
            open={showAddCharacter}
            close={handleCloseAdd}
            createNewCard={createNewCard}
            checkDuplicate={checkDuplicate}
          />

          <Settings open={showSettings} close={handleCloseSettings} />

          <AddCardButton setOpen={handleOpenAdd} />
        </div>
      </main>
    </div>
  );
}
