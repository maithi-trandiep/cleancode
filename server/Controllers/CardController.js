const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const FILE_PATH = './db.json';

const readDataFromFile = () => {
    try {
        const data = fs.readFileSync(FILE_PATH);
        return JSON.parse(data);
    } catch (err) {
        return { cards: {} };
    }
};

const writeDataToFile = (data) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};


const getAllCards = () => {
    return readDataFromFile().cards;
};


const getCardById = (id) => {
    const cardData = readDataFromFile().cards;
    for (const cardId in cardData) {
        const card = cardData[cardId];
        if (card.id === id) {
            return card;
        }
    }
    return [];
};

const getCardsByUser = (userId) => {
    const cards = Object.values(readDataFromFile().cards);
    return cards.filter(card => card.user_id === userId);
}

const getCardsByCategories = (categories) => {
    const cards = Object.values(readDataFromFile().cards);
    return cards.filter(card => parseInt(card.category) <= 7 && categories.includes(card.category));
};

const getCardsByTags = (tags) => {
    const cards = Object.values(readDataFromFile().cards);
    return cards.filter(card => tags.includes(card.tag));
};

const getTagsFromCards = () => {
    const cards = getCardsByUser(1);
    const tags = new Set();
    for (const card of cards) {
        tags.add(card.tag);
    }
    return Array.from(tags);
}

const createCard = (newCard) => {
    const data = readDataFromFile();
    const index = Object.keys(data.cards).length + 1;
    const id = uuidv4();
    newCard = { ...newCard, id }; 
    data.cards[index] = newCard;
    writeDataToFile(data);
    return newCard;
};

const updateCard = (id, updatedFields) => {
    const data = readDataFromFile();
    const cardIds = Object.keys(data.cards);
    for (const cardId of cardIds) {
        if (data.cards[cardId].id === id) {
            data.cards[cardId] = { ...data.cards[cardId], ...updatedFields, id };
            writeDataToFile(data);
            return data.cards[cardId];
        }
    }
    return null;
};


const deleteCard = (id) => {
    const data = readDataFromFile();
    for (const key in data.cards) {
        if (data.cards[key].id === id) {
            delete data.cards[key];
            writeDataToFile(data);
            return true;
        }
    }
    return false;
};


module.exports = {
    getAllCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard,
    getCardsByTags,
    getCardsByCategories,
    getCardsByUser,
    getTagsFromCards,
};
