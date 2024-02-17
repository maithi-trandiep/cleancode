const fs = require('fs');

const FILE_PATH = './db.json';

const readDataFromFile = () => {
 try {
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
 } catch (err) {
  return [];
 }
};


const writeDataToFile = (data) => {
 fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};

//* Récupérer toutes les Cartes
const getAllCards = () => {
 return readDataFromFile();
};


//* Récupérer une Carte par ID
const getCardById = (id) => {
 const fiches = readDataFromFile();
 for (const index in fiches.cards) {
  const card = fiches.cards[index];
  if (index == id) {
   return card;
  }
  return [];
 }
}

//* Récupérer toutes les Cartes ayant un certain tag
const getCardsByTags = (tags) => {
 const fiches = readDataFromFile();
 const matchingCards = [];

 for (const id in fiches.cards) {
  const card = fiches.cards[id];
  for (const tag of tags) {
   if (card.tag === tag) {
    matchingCards.push(card);
    break;
   }
  }
 }

 return matchingCards;
};

//* Créer une Carte
const createCard = (newCard) => {
 const fiches = readDataFromFile();
 const newId = Object.keys(fiches.cards).length + 1;
 fiches.cards[newId] = newCard;
 writeDataToFile(fiches);
};

//* Mettre à jour une Carte
const updateCard = (id, updatedCard) => {
 const fiches = readDataFromFile();
 const card = fiches.cards[id];
 if (card) {
  fiches.cards[id] = { ...card, ...updatedCard };
  writeDataToFile(fiches);
  return true;
 }
 return false;
};

//* Supprimer une Carte
const deleteCard = (id) => {
 const fiches = readDataFromFile();
 if (fiches.cards[id]) {
  delete fiches.cards[id];
  writeDataToFile(fiches);
  return true;
 }
 return false;
};


module.exports = { getAllCards, getCardById, createCard, updateCard, deleteCard, getCardsByTags };
