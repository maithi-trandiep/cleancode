const fs = require('fs');

const FILE_PATH = './db.json'; //utiliser une var d'envionnement

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
 const data = readDataFromFile();
 for (const index in data.cards) {
  const card = data.cards[index];
  if (index == id) {
   return card;
  }
  return [];
 }
}

//* Récupérer toutes les Cartes ayant un certain tag
const getCardsByTags = (tags) => {
 const data = readDataFromFile();
 const matchingCards = [];

 for (const id in data.cards) {
  const card = data.cards[id];
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
 const data = readDataFromFile();
 const newId = Object.keys(data.cards).length + 1;
 data.cards[newId] = newCard;
 writeDataToFile(data);
};

//* Mettre à jour une Carte
const updateCard = (id, updatedCard) => {
 const data = readDataFromFile();
 const card = data.cards[id];
 if (card) {
  data.cards[id] = { ...card, ...updatedCard };
  writeDataToFile(data);
  return true;
 }
 return false;
};

//* Supprimer une Carte
const deleteCard = (id) => {
 const data = readDataFromFile();
 if (data.cards[id]) {
  delete data.cards[id];
  writeDataToFile(data);
  return true;
 }
 return false;
};


module.exports = { getAllCards, getCardById, createCard, updateCard, deleteCard, getCardsByTags };
