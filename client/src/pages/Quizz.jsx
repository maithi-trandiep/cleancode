import * as React from "react";
import QuizzCard from "../components/QuizzCard";

const Quizz = () => {
  return (
    <div style={{"display": "flex", "justify-content": "center", 'flex-wrap': 'wrap', 'margin-top' : '10rem'}}>
     <h1 style={{"flex-basis" : "100%"}}>Quizz du jour</h1>
      <QuizzCard />
    </div>
  );
};

export default Quizz;
