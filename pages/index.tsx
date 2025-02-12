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
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  useColorScheme,
} from "@mui/material";

export default function Home() {
  const [cardIdCounter, setCardIdCounter] = useState(0);
  const [Cards, setCards] = useState<CardData[]>([]);

  const [language, setLanguage] = useState(i18n.language);
  const [theme, setTheme] = useState("dark");

  // Modal states
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
  }

  function checkDuplicate(name: string) {
    return Cards.some((card) => card.name === name);
  }

  console.log("i18n : ", i18n.language);
  useEffect(() => {
    const localStorageCards = localStorage.getItem("cards");
    const localStorageLanguage = localStorage.getItem("i18nextLng");
    const localStorageTheme = localStorage.getItem("theme");

    console.log("local language : ", localStorageLanguage);
    if (localStorageCards) {
      const parsedCards = JSON.parse(localStorageCards);
      setCards(parsedCards);
      setCardIdCounter(parsedCards.length + 1);
    }

    if (localStorageLanguage) {
      i18n.changeLanguage(localStorageLanguage);
    }

    if (localStorageTheme) {
      setTheme(localStorageTheme);
    }
  }, []);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n]);

  useEffect(() => {
    if (Cards.length > 0) {
      console.log("Updated to localStorage : ", Cards);
      localStorage.setItem("cards", JSON.stringify(Cards));
    }
  }, [Cards]);

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [theme]);

  function deleteCard(id: string[]) {
    setCards((prevCards) => prevCards.filter((card) => !id.includes(card.id)));
  }
  const handleOpenAdd = () => setShowAddCharacter(true);
  const handleCloseAdd = () => setShowAddCharacter(false);

  const handleOpenEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const handleOpenSettings = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);

  const muitheme = createTheme({
    palette: {
      mode: theme === "dark" ? "dark" : "light",
    },
  });

  // <div className="flex flex-col items-center py-20 pb- max-w-screen-md w-full px-2 bg-white dark:bg-zinc-900 min-h-screen">
  // </div>
  return (
    <ThemeProvider theme={muitheme}>
      <CssBaseline />
      <MainHeader openEdit={handleOpenEdit} openSettings={handleOpenSettings} />
      <Container
        className="flex flex-col items-center p-2 pb-8 w-full bg-white dark:bg-zinc-900 min-h-screen"
        maxWidth="md"
      >
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

        <Settings
          open={showSettings}
          close={handleCloseSettings}
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
        />

        <AddCardButton setOpen={handleOpenAdd} />
      </Container>
    </ThemeProvider>
  );
}
