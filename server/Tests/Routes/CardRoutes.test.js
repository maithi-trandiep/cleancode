const request = require('supertest');
const express = require('express');
const app = express();

const {
 getAllCards,
 getCardById,
 createCard,
 updateCard,
 deleteCard,
 getCardsByTags
} = require('server/Controllers/CardController.js');

const cardRouter = require('server/Routes/CardRoutes.js');
app.use('/', cardRouter);


jest.mock('server/Controllers/CardController.js', () => ({
 getAllCards: jest.fn(),
 getCardById: jest.fn(),
 createCard: jest.fn(),
 updateCard: jest.fn(),
 deleteCard: jest.fn(),
 getCardsByTags: jest.fn(),
}));


describe('GET /cards', () => {
 it('should return all cards when no tags are provided', async () => {
  const mockCards = {
   cards: {
    "1": {
     "id": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
     "question": "France",
     "answer": "Paris",
     "tag": "Europe",
     "category": "FIRST",
    },
    "2": {
     "id": "110ec58a-a0f2-4ac4-8393-c866d813b8d1",
     "question": "Spain",
     "answer": "Madrid",
     "tag": "Europe",
     "category": "FIRST"
    },
    "3": {
     "id": "110ec58a-a0f2-4ac4-8393-c866d813b8d2",
     "question": "Germany",
     "answer": "Berlin",
     "tag": "Europe",
     "category": "FIRST"
    },
   },
  };
  getAllCards.mockReturnValue(mockCards);

  const response = await request(app).get('/cards');

  expect(response.status).toBe(200);
  expect(response.body).toEqual(mockCards);
 });

 it('should return matching cards when tags are provided', async () => {
  const mockMatchingCards = [{ id: 1, title: 'Card 1' }];
  getCardsByTags.mockReturnValue(mockMatchingCards);

  const response = await request(app).get('/cards?tags=tag1,tag2');

  expect(response.status).toBe(200);
  expect(response.body).toEqual(mockMatchingCards);
 });

 it('should return 404 if no cards match the provided tags', async () => {
  getCardsByTags.mockReturnValue([]);

  const response = await request(app).get('/cards?tags=tag1,tag2');

  expect(response.status).toBe(404);
  expect(response.body).toEqual({ message: 'Aucune fiche trouvée avec ces tags' });
 });
});


describe('GET /cards/:id', () => {
 it('should return the card with the specified id', async () => {
  const mockCard = {
   "1": {
    "id": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
    "question": "France",
    "answer": "Paris",
    "tag": "Europe",
    "category": "FIRST",
   }
  };
  getCardById.mockReturnValue(mockCard);
  
  const response = await request(app).get('/cards/1');

  expect(response.status).toBe(200);
  expect(response.body).toEqual(mockCard);
 });

 it('should return 404 if no card matches the specified id', async () => {
  getCardById.mockReturnValue(null);

  const response = await request(app).get('/cards/999');

  expect(response.status).toBe(404);
  expect(response.body).toEqual({ message: 'Carte non trouvée' });
 });
});


describe('POST /cards', () => {
 it('should create a new card', async () => {
  const newCard = { id: 1, title: 'New Card' };
  createCard.mockReturnValue(true);

  const response = await request(app)
   .post('/cards')
   .send(newCard);

  expect(response.status).toBe(201);
  expect(response.body).toEqual(newCard);
 });

 it('should return 400 if card creation fails', async () => {
  createCard.mockReturnValue(false);

  const response = await request(app)
   .post('/cards')
   .send({});

  expect(response.status).toBe(400);
  expect(response.body).toEqual({ message: 'Erreur lors de la création de la carte' });
 });
});


describe('PATCH /cards/:id', () => {
 it('should update the card with the specified id', async () => {
  updateCard.mockReturnValue(true);

  const response = await request(app)
   .patch('/cards/1')
   .send({ title: 'Updated Card' });

  expect(response.status).toBe(200);
  expect(response.body).toEqual({ message: 'Carte mise à jour avec succès' });
 });

 it('should return 404 if no card matches the specified id for updating', async () => {
  updateCard.mockReturnValue(false);

  const response = await request(app)
   .patch('/cards/999')
   .send({});

  expect(response.status).toBe(404);
  expect(response.body).toEqual({ message: 'Carte non trouvée' });
 });
});


describe('DELETE /cards/:id', () => {
 it('should delete the card with the specified id', async () => {
  deleteCard.mockReturnValue(true);

  const response = await request(app).delete('/cards/1');

  expect(response.status).toBe(200);
  expect(response.body).toEqual({ message: 'Carte supprimée avec succès' });
 });

 it('should return 404 if no card matches the specified id for deletion', async () => {
  deleteCard.mockReturnValue(false);

  const response = await request(app).delete('/cards/999');

  expect(response.status).toBe(404);
  expect(response.body).toEqual({ message: 'Carte non trouvée' });
 });
});
