const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {
 getAllCards,
 getCardById,
 createCard,
 updateCard,
 deleteCard,
 getCardsByTags
} = require('../Controllers/CardController');

router.use(bodyParser.json());

router.get('/cards', (req, res) => {
 if (req.query.tags) {
  const tags = req.query.tags;
  const tagsArray = tags.split(',');
  const matchingCards = getCardsByTags(tagsArray);

  if (matchingCards.length > 0) {
   res.status(200).json(matchingCards);
  } else {
   res.status(404).json({ message: 'Aucune fiche trouvée avec ces tags' });
  }
 } else {
  const cards = getAllCards();
  res.status(200).json(cards);
 }
});

router.get('/cards/:id', (req, res) => {
 const card = getCardById(parseInt(req.params.id));
 if (card) {
  res.status(200).json(card);
 } else {
  res.status(404).json({ message: 'Carte non trouvée' });
 }
});

router.post('/cards', (req, res) => {
 const newCard = req.body;
 console.log("newCard", newCard);
 if(createCard(newCard)){
  res.status(201).json(newCard);
 }else{
  res.status(400).json({ message: 'Erreur lors de la création de la carte' });
 }
});

router.patch('/cards/:id', (req, res) => {
 const id = parseInt(req.params.id);
 const updatedCard = req.body;
 const success = updateCard(id, updatedCard);
 if (success) {
  res.status(200).json({ message: 'Carte mise à jour avec succès' });
 } else {
  res.status(404).json({ message: 'Carte non trouvée' });
 }
});

router.delete('/cards/:id', (req, res) => {
 const id = parseInt(req.params.id);
 const success = deleteCard(id);
 if (success) {
  res.status(200).json({ message: 'Carte supprimée avec succès' });
 } else {
  res.status(404).json({ message: 'Carte non trouvée' });
 }
});

module.exports = router;