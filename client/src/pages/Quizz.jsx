import * as React from "react";
import QuizzCard from "../components/QuizzCard";
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ButtonGroup from '@mui/material/ButtonGroup';

const buttons = [
 <Button key="one">Précédent</Button>,
 <Button key="two">Suivant</Button>,
];

const Quizz = () => {
  return (
   <div>
      <div style={{"display": "flex", "justify-content": "center", 'flex-wrap': 'wrap', 'margin-top' : '10rem'}}>
     <h1 style={{"flex-basis" : "100%"}}>Quizz du jour</h1>
      <QuizzCard />
    </div>
    <ButtonGroup color="secondary" aria-label="Medium-sized button group">
        {buttons}
      </ButtonGroup>
   </div>
  
   
  );
};

export default Quizz;
