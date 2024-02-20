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
  const [doneMessage, setDoneMessage] = useState("Quiz done");

  const handleNext = () => {
    setIsCorrect(null);
    setHasAnwser(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? prevIndex : prevIndex + 1
    );
  }

  const handleDone = () => {
    setDoneMessage("Quiz done");
    setHasDone(true);
    QuizService.createQuiz({ user_id: 1, dateQuiz: new Date()});
  }

  const handleSubmitAnswer = async (card, answer) => {
    setHasAnwser(true);
    if (card.answer.toLowerCase() === answer.toLowerCase()) {
      setIsCorrect(true);
      await CardService.answerCard(card.id, { isValid: true });
    } else {
      setIsCorrect(false);
      await CardService.answerCard(card.id, { isValid: false });
    }
  }

  const daysAgo = n => {
    let d = new Date();
    d.setDate(d.getDate() - Math.abs(n));
    return d;
  };

  const datediff = (first, second) => {        
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  useEffect(() => {
    const fetchLastQuizByUser = async (userId) => {
      const response = await QuizService.getQuizByUser(userId); 
      if (response.length > 0) {
        const sorted = response.sort((a, b) => new Date(b.dateQuiz) - new Date(a.dateQuiz));
        const lastQuiz = sorted[0];
        let formatDateQuiz = new Date(lastQuiz.dateQuiz)
        if (datediff(formatDateQuiz, new Date()) == 0){
          setDoneMessage("Quiz already done today");
          setHasDone(true);
          console.log("Quiz already done today");
        } else {
          let previous = new Date(response.dateQuiz);
          console.log(previous);
          fetchCards(previous);
        }
      }
      const today = new Date() //daysAgo(1);
      const dateQuizz = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      fetchCards(dateQuizz);
    };

    const fetchCards = async (date) => {
      const response = await CardService.getQuizForDate(date);
      const data = response;
      setCards(data);
    };

    fetchLastQuizByUser(1);
  }, []);


  return (
    <div>
      {hasDone && <Alert severity="success"> {doneMessage} </Alert>}
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
            <Button endIcon={<ArrowForwardIosIcon />} onClick={handleDone} disabled={cards.length == 0}>
              Done
            </Button>
          </ButtonGroup>
        </div>
      }
    </div>
  );
};

export default Quiz;
