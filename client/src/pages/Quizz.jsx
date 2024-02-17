import React, { useState } from "react";
import QuizzCard from "../components/QuizzCard";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ButtonGroup from "@mui/material/ButtonGroup";

const questions = [
  {
    question: "France",
    answer: "Paris",
    tag: "Europe",
    category: "FIRST",
  },
  {
    question: "Espagne",
    answer: "Madrid",
    tag: "Europe",
    category: "SECOND",
  },
  {
    question: "Quelle est la capitale de l'Algérie ?",
    answer: "Alger",
    tag: "Africa",
    category: "SECOND",
  },
];

const Quizz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === questions.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
        <h1 style={{ flexBasis: "100%" }}>Quizz of the day</h1>
        <QuizzCard question={questions[currentIndex]} />
      </div>
      <ButtonGroup color="secondary" aria-label="Medium-sized button group" style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
        <Button startIcon={<ArrowBackIosNewIcon />} onClick={handlePrev} disabled={currentIndex === 0}>
          Previous
        </Button>
        <Button endIcon={<ArrowForwardIosIcon />} onClick={handleNext} disabled={currentIndex === questions.length - 1}>
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Quizz;
