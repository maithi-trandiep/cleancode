import { useState, useEffect } from "react";
import QuizzCard from "../components/QuizzCard";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ButtonGroup from "@mui/material/ButtonGroup";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { CardService } from "../service/CardService";

const Quizz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAnwser, setHasAnwser] = useState(false);
  const [hasDone, setHasDone] = useState(false);
  const [answeredCards, setAnsweredCards] = useState([]);

  const handleNext = () => {
    setIsCorrect(false);
    setHasAnwser(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? prevIndex : prevIndex + 1
    );
  }

  const handleDone = () => {
    console.log("answeredCards", answeredCards);
    setHasDone(true);
    if (answeredCards.length > 0) {
      answeredCards.forEach(async (card) => {
        await CardService.updateCard(card.id, { category: card.category });
      });
    }
    // à remettre pour rendre
    //localStorage.setItem('lastQuiz', new Date());
    // pour test
    localStorage.setItem('lastQuiz', daysAgo(1));
  }

  const handleSubmitAnswer = (card, answer) => {
    // console.log("answer", card, answer);
    setHasAnwser(true);
    if (card.answer.toLowerCase() === answer.toLowerCase()) {
      card.category = ''+ (parseInt(card.category) + 1);
      answeredCards.push(card);
      setIsCorrect(true);
    } else {
      card.category = '1'
      answeredCards.push(card);
      setIsCorrect(false);
    }
    setAnsweredCards(answeredCards);
  }

  const datediff = (first, second) => {        
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  const daysAgo = n => {
    let d = new Date();
    d.setDate(d.getDate() - Math.abs(n));
    return d;
  };

  useEffect(() => {
    let lastQuiz = localStorage.getItem('lastQuiz');
    let newCategories = ['1'];
    if (lastQuiz) {
      let previous = new Date(lastQuiz);
      let diff = datediff(previous, new Date());
      if (diff >= 1) {
        newCategories.push('2');
      } 
      if (diff >= 3) {
        newCategories.push('3');
      } 
      if (diff >= 7) {
        newCategories.push('4');
      } 
      if (diff >= 15) {
        newCategories.push('5');
      } 
      if (diff >= 31) {
        newCategories.push('6');
      }
      if (diff >= 63) {
        newCategories.push('7');
      } 
      console.log("diff", diff, newCategories);
    }

    const fetchCards = async (categories) => {
      const response = await CardService.getCardByCategories(categories);
      console.log("response", response.length, categories);
      const data = response;
      setCards(data);
    };

    fetchCards(newCategories);
  }, []);


  return (
    <div>
      {hasDone && <Alert severity="success">Quizz done</Alert>}
      { !hasDone &&
        <div>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "10rem" }}>
            <h1 style={{ flexBasis: "100%" }}>Quizz of the day</h1>
            {hasAnwser && (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity={isCorrect ? "success" : "error"}>
                {isCorrect ? "Correct answer" : "Wrong answer"}
              </Alert>
            )}
            { (cards.length > 0) ?
                <QuizzCard card={cards[currentIndex]} submitAnswer={handleSubmitAnswer} answerValidated={hasAnwser} />
                : <p>Loading...</p>
            }
          </div>
          <ButtonGroup color="secondary" aria-label="Medium-sized button group" style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
            <Button endIcon={<ArrowForwardIosIcon />} onClick={handleNext} disabled={currentIndex === cards.length - 1}>
              Next
            </Button>
            <Button endIcon={<ArrowForwardIosIcon />} onClick={handleDone} disabled={cards.length == 0 && answeredCards.length == 0}>
              Done
            </Button>
          </ButtonGroup>
        </div>
      }
    </div>
  );
};

export default Quizz;
