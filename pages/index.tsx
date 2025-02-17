import React, { useEffect, useState } from "react";
import { character } from "@/types/card";
import { v4 as uuidv4 } from "uuid";
import PlayerCard from "../components/Card/playerCard";
import { CardData } from "../types/card";
import AddCardButton from "../components/addCardButton";
import MainHeader from "../components/mainHeader";
import AddCharacter from "@/components/modal/addCharacter";
import Settings from "@/components/modal/settings";
import i18n from "@/locales/config";
import { PaletteMode } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline, Stack } from "@mui/material";

export default function Home() {
  const [cardIdCounter, setCardIdCounter] = useState(0);
  const [Cards, setCards] = useState<CardData[]>([]);

  const [language, setLanguage] = useState(i18n.language);
  const [theme, setTheme] = useState<PaletteMode>("dark");

  // Modal states
  const [showAddCharacter, setShowAddCharacter] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  function createNewCard(character: character) {
    setCards([...Cards, { id: uuidv4(), ...character }]);
    setCardIdCounter(cardIdCounter + 1);
  }

  function updateCard(
    id: string,
    leftPetTime: Date | null,
    rightPetTime: Date | null
  ) {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, leftPetTime, rightPetTime } : card
      )
    );
  }

  function checkDuplicate(name: string) {
    return Cards.some((card) => card.name === name);
  }

  function deleteCard(id: string[]) {
    setCards((prevCards) => prevCards.filter((card) => !id.includes(card.id)));
  }

  useEffect(() => {
    const localStorageCards = localStorage.getItem("cards");
    const localStorageLanguage = localStorage.getItem("i18nextLng");
    const localStorageTheme = localStorage.getItem("theme");

    if (localStorageCards) {
      const parsedCards = JSON.parse(localStorageCards);
      const cardsWithDates = parsedCards.map((card: CardData) => ({
        ...card,
        leftPetTime: card.leftPetTime ? new Date(card.leftPetTime) : null,
        rightPetTime: card.rightPetTime ? new Date(card.rightPetTime) : null,
      }));
      setCards(cardsWithDates);
      setCardIdCounter(parsedCards.length + 1);
    }

    if (localStorageLanguage) {
      i18n.changeLanguage(localStorageLanguage);
    }

    if (localStorageTheme) {
      setTheme(localStorageTheme as PaletteMode);
    }
  }, []);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n]);

  useEffect(() => {
    if (Cards.length > 0) {
      localStorage.setItem("cards", JSON.stringify(Cards));
    } else {
      localStorage.removeItem("cards");
    }
  }, [Cards]);

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [theme]);

  const handleOpenAdd = () => setShowAddCharacter(true);
  const handleCloseAdd = () => setShowAddCharacter(false);

  const handleEdit = () => setShowEdit(!showEdit);

  const handleOpenSettings = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);

  const muitheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: "#3B82F6",
      },
      secondary: {
        main: "#8591AE",
      },
      error: {
        main: "#FF5449",
      },
    },
  });

  return (
    <ThemeProvider theme={muitheme} defaultMode="dark">
      <CssBaseline />
      <MainHeader
        showEdit={showEdit}
        openEdit={handleEdit}
        openSettings={handleOpenSettings}
      />
      <Container maxWidth="md" disableGutters className="p-2">
        <Stack>
          {Cards.map((card) => (
            <PlayerCard
              key={card.id}
              card={card}
              updateCard={updateCard}
              deleteCard={deleteCard}
              showEdit={showEdit}
            />
          ))}
        </Stack>

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
