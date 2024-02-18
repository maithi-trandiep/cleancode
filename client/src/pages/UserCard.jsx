import { useState } from "react";
import FormCreateCard from "../components/FormCreateCard";
import DisplayCard from "../components/DisplayCard";

const PageCard = () => {
    const [newCard, setNewCard] = useState(null);

    const handleNewCard = (card) => {
        setNewCard(card);
    }

    return (
        <>
            <FormCreateCard onNewCard={handleNewCard} />
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "10rem" }}>
                {newCard && <DisplayCard card={newCard} />}
            </div>
        </>
    );
}

export default PageCard;