import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useState } from "react";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const QuizzCard = ({ question }) => {

  const [answer, setAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [responseMessaee, setResponseMessage] = useState("");

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmitAnswer = () => {
    setSubmittedAnswer(answer);
    if (answer.toLowerCase() === question.answer.toLowerCase()) {
      setIsCorrect(true);
      setResponseMessage("Correct answer");
    } else {
      setIsCorrect(false);
      setResponseMessage("Wrong answer");
    }
  };


  return (
    <Card sx={{ width: '25%', margin: '0 1rem 1rem' }} style={{ "boxShadow": "rgba(149, 157, 165, 0.2) 0px 8px 24px", "padding": "6rem 2rem", "borderRadius": "10px" }}>
        {submittedAnswer && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity={isCorrect ? "success" : "error"}>
          {isCorrect ? "Correct answer" : "Wrong answer"}
        </Alert>
      )}
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          What's the capital of {question.question} ?
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          {question.category}
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          {question.tag}
        </Typography>
        <TextField id="standard-basic" label="Answer" variant="standard" value={answer} onChange={handleAnswerChange} />
      </CardContent>
      <Button color="secondary" variant="outlined" size="small" onClick={handleSubmitAnswer}>Send</Button>
    </Card>
  );
};

export default QuizzCard;





