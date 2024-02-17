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

//* Récupérer toutes les fiches
const getAllFiches = () => {
 return readDataFromFile();
};


//* Récupérer une fiche par ID
const getFicheById = (id) => {
 const fiches = readDataFromFile();
 for (const index in fiches.cards) {
  const card = fiches.cards[index];
  if (index == id) {
   return card;
  }
  return [];
 }
}

//* Récupérer toutes les fiches ayant un certain tag
const getFichesByTags = (tags) => {
 console.log(tags);
 const fiches = readDataFromFile();
 const matchingFiches = [];

 for (const id in fiches.cards) {
  const fiche = fiches.cards[id];
  for (const tag of tags) {
   if (fiche.tag === tag) {
    matchingFiches.push(fiche);
    break;
   }
  }
 }

 return matchingFiches;
};

//* Créer une fiche
const createFiche = (newFiche) => {
 const fiches = readDataFromFile();
 const newId = Object.keys(fiches.cards).length + 1;
 fiches.cards[newId] = newFiche;
 writeDataToFile(fiches);
};

//* Mettre à jour une fiche
const updateFiche = (id, updatedFiche) => {
 const fiches = readDataFromFile();
 const fiche = fiches.cards[id];
 if (fiche) {
  fiches.cards[id] = { ...fiche, ...updatedFiche };
  writeDataToFile(fiches);
  return true;
 }
 return false;
};

//* Supprimer une fiche
const deleteFiche = (id) => {
 const fiches = readDataFromFile();
 if (fiches.cards[id]) {
  delete fiches.cards[id];
  writeDataToFile(fiches);
  return true;
 }
 return false;
};


module.exports = { getAllFiches, getFicheById, createFiche, updateFiche, deleteFiche, getFichesByTags };