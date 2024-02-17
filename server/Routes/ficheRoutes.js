const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const {
 getAllFiches,
 getFicheById,
 createFiche,
 updateFiche,
 deleteFiche,
 getFichesByTags
} = require('../Controllers/ficheController');


router.use(bodyParser.json());

router.get('/fiches', (req, res) => {
 console.log(req.query.tags);
 if (req.query.tags) {
  const tags = req.query.tags;
  const tagsArray = tags.split(',');
  const matchingFiches = getFichesByTags(tagsArray);

  if (matchingFiches.length > 0) {
   res.json(matchingFiches);
  } else {
   res.status(404).json({ message: 'Aucune fiche trouvée avec ces tags' });
  }
 } else {
  const fiches = getAllFiches();
  res.json(fiches);
 }
});

router.get('/fiches/:id', (req, res) => {
 const fiche = getFicheById(parseInt(req.params.id));
 if (fiche) {
  res.json(fiche);
 } else {
  res.status(404).json({ message: 'Fiche non trouvée' });
 }

});


router.post('/fiches', (req, res) => {
 const newFiche = req.body;
 console.log(newFiche);
 createFiche(newFiche);
 res.status(201).json(newFiche);
});


router.patch('/fiches/:id', (req, res) => {
 const id = parseInt(req.params.id);
 const updatedFiche = req.body;
 const success = updateFiche(id, updatedFiche);
 if (success) {
  res.json({ message: 'Fiche mise à jour avec succès' });
 } else {
  res.status(404).json({ message: 'Fiche non trouvée' });
 }
});

router.delete('/fiches/:id', (req, res) => {
 const id = parseInt(req.params.id);
 const success = deleteFiche(id);
 if (success) {
  res.json({ message: 'Fiche supprimée avec succès' });
 } else {
  res.status(404).json({ message: 'Fiche non trouvée' });
 }
});

module.exports = router;
