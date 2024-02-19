import { useState, useEffect } from "react";
import QuizCard from "../components/QuizCard";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ButtonGroup from "@mui/material/ButtonGroup";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { CardService } from "../service/CardService";
import { QuizService } from "../service/QuizService";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [hasAnwser, setHasAnwser] = useState(false);
  const [hasDone, setHasDone] = useState(false);
  const [answeredCards, setAnsweredCards] = useState([]);

  const handleNext = () => {
    setIsCorrect(null);
    setHasAnwser(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? prevIndex : prevIndex + 1
    );
  }

  const handleDone = () => {
    setHasDone(true);
    if (answeredCards.length > 0) {
      answeredCards.forEach(async (card) => {
        await CardService.updateCard(card.id, { category: card.category });
      });
    }

    // pour test
    // à mettre dateQuiz: new Date() pour rendre
    QuizService.createQuiz({ user_id: 1, dateQuiz: daysAgo(1) });
  }

  const handleSubmitAnswer = (card, answer) => {
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
    const fetchLastQuizByUser = async (userId) => {
      const response = await QuizService.getLastQuizByUser(userId); 
      if (response && response.dateQuiz) {
        let formatDateQuiz = new Date(response.dateQuiz).toISOString().split('T')[0];
        if (formatDateQuiz === new Date().toISOString().split('T')[0]) {
          setHasDone(true);
        } else {
          let previous = new Date(response.dateQuiz);
          let diff = datediff(previous, new Date());
          let newCategories = ['1'];
          if (diff >= 1) {
            newCategories.splice(0, 0, '2');
          } 
          if (diff >= 3) {
            newCategories.splice(0, 0, '3');
          } 
          if (diff >= 7) {
            newCategories.splice(0, 0, '4');
          } 
          if (diff >= 15) {
            newCategories.splice(0, 0, '5');
          } 
          if (diff >= 31) {
            newCategories.splice(0, 0, '6');
          }
          if (diff >= 63) {
            newCategories.splice(0, 0, '7');
          } 
          fetchCards(newCategories);
        }
      }
    };

    const fetchCards = async (categories) => {
      const response = await CardService.getCardByCategories(categories);
      const data = response;
      setCards(data);
    };

    fetchLastQuizByUser(1);
  }, []);


  return (
    <div>
      {hasDone && <Alert severity="success">Quiz done</Alert>}
      { !hasDone &&
        <div>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
          {hasAnwser && (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity={isCorrect ? "success" : "error"}>
                {isCorrect ? "Correct answer" : "Wrong answer"}
              </Alert>
            )}
            <h1 style={{ flexBasis: "100%" }}>Quiz of the day</h1>
            
            { (cards.length > 0) ?
                <QuizCard card={cards[currentIndex]} submitAnswer={handleSubmitAnswer} answerValidated={hasAnwser} isCorrect={isCorrect} />
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

export default Quiz;
