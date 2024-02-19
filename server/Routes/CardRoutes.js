const express = require('express');
const cardRouter = express.Router();
const bodyParser = require('body-parser');

const {
 getAllCards,
 getCardById,
 createCard,
 updateCard,
 deleteCard,
 getCardsByUser,
 getCardsByTags,
 getCardsByCategories,
 getTagsFromCards
} = require('../Controllers/CardController');

cardRouter.use(bodyParser.json());

cardRouter.get('/cards', (req, res) => {
 if (req.query && req.query.tags) {
  const tags = req.query.tags;
  const tagsArray = tags.split(',');
  const matchingCards = getCardsByTags(tagsArray);

  if (matchingCards.length > 0) {
   res.status(200).json(matchingCards);
  } else {
   res.status(404).json({ message: 'Aucune fiche trouvée avec ces tags' });
  }
 } else if (req.query && req.query.categories) {
    const categories = req.query.categories;
    const categoriesArray = categories.split(',');
    const matchingCards = getCardsByCategories(categoriesArray);
    
    if (matchingCards.length > 0) {
     res.status(200).json(matchingCards);
    } else {
     res.status(404).json({ message: 'Aucune fiche trouvée avec ces catégories' });
    }
 } else {
  const cards = getAllCards();
  res.status(200).json(cards);
 }
});

cardRouter.get('/cards/:id', (req, res) => {
 const card = getCardById(req.params.id);
 if (card) {
  res.status(200).json(card);
 } else {
  res.status(404).json({ message: 'Carte non trouvée' });
 }
});

cardRouter.post('/cards', (req, res) => {
 const newCard = req.body;
 if (createCard(newCard)) {
  res.status(201).json(newCard);
 } else {
  res.status(400).json({ message: 'Erreur lors de la création de la carte' });
 }
});

cardRouter.patch('/cards/:id', (req, res) => {
 const id = req.params.id;
 const updatedCard = req.body;
 const success = updateCard(id, updatedCard);
 if (success) {
  res.status(200).json({ message: 'Carte mise à jour avec succès' });
 } else {
  res.status(404).json({ message: 'Carte non trouvée' });
 }
});

cardRouter.delete('/cards/:id', (req, res) => {
 const id = req.params.id;
 const success = deleteCard(id);
 if (success) {
  res.status(200).json({ message: 'Carte supprimée avec succès' });
 } else {
  res.status(404).json({ message: 'Carte non trouvée' });
 }
});

cardRouter.get('/user/:userId/cards', (req, res) => {
   const userId = req.params.userId;
   const cards = getCardsByUser(userId);
   res.status(200).json(cards);
});

cardRouter.get('/tags', (req, res) => {
   const tags = getTagsFromCards();
   res.status(200).json(tags);
});

module.exports = cardRouter;