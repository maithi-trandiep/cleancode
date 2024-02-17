import React, { useState } from 'react';

const FormCreateCard = () => {
    const [card, setCard] = useState({
        question: "",
        answer: "",
    });
    
    const handleChange = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(card);
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="question"
                value={card.question}
                onChange={handleChange}
                />
                <input
                type="text"
                name="answer"
                value={card.answer}
                onChange={handleChange}
                />
                <button type="submit">Create Card</button>
            </form>
        </div>
    );
}

export default FormCreateCard;