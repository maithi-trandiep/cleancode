import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useState } from "react";

const QuizCard = ({ card, submitAnswer, answerValidated, isCorrect }) => {
  const [answer, setAnswer] = useState('');

  const handleChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    setAnswer(val);
  }

  const handleAnswer = () => {
    submitAnswer(card, answer);
  }

  useEffect(() => {
    if (answerValidated) setAnswer('');
  }, [answerValidated]);

  return (
    <Card sx={{ width: '25%', margin: '0 1rem 1rem' }} style={{ "boxShadow": "rgba(149, 157, 165, 0.2) 0px 8px 24px", "padding": "6rem 2rem", "borderRadius": "10px" }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          What's the capital of {card.question} ?
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          {card.tag} / {card.category}
        </Typography>
        { isCorrect == false && <Typography variant="body2">
          Correct answer is: {card.answer}
        </Typography> }
        <TextField id="standard-basic" label="Answer" variant="standard" disabled={answerValidated} value={answer} onChange={(e) => handleChange(e, 'question')} />
      </CardContent>
      <Button color="secondary" variant="outlined" size="small" onClick={handleAnswer}>Send</Button>
    </Card>
  );
};

export default QuizCard;





