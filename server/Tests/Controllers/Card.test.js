const fs = require('fs');
const {
 getAllCards,
 getCardById,
 createCard,
 updateCard,
 deleteCard,
 getCardsByTags,
} = require('server/Controllers/CardController.js');

jest.mock('fs');

// Mock data for testing
const mockData = {
 cards: {
  "1": {
   "id": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
   "question": "France",
   "answer": "Paris",
   "tag": "Europe",
   "category": "1",
  },
  "2": {
   "id": "110ec58a-a0f2-4ac4-8393-c866d813b8d1",
   "question": "Spain",
   "answer": "Madrid",
   "tag": "Europe",
   "category": "1"
  },
  "3": {
   "id": "110ec58a-a0f2-4ac4-8393-c866d813b8d2",
   "question": "Germany",
   "answer": "Berlin",
   "tag": "Europe",
   "category": "1"
  },
 },
};

describe('getAllCards', () => {
 test('it should return all cards', () => {
  fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
  expect(getAllCards()).toEqual(mockData.cards);
 });
});

describe('getCardById', () => {
 test('it should return a card by id', () => {
  fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
  expect(getCardById("6c84fb90-12c4-11e1-840d-7b25c5ee775a")).toEqual(mockData.cards["1"]);
 });

 test('it should return an empty array if card not found', () => {
  fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
  expect(getCardById("invalid-id")).toEqual([]);
 });
});


describe('createCard', () => {
 test('it should create a new card', () => {
  const newCard = {
    "question": "France",
    "answer": "Paris",
    "tag": "Europe",
    "category": "1"
  };

  createCard(newCard);
  const newData = JSON.parse(fs.writeFileSync.mock.calls[0][1]);

  expect(newData.cards[Object.keys(mockData.cards).length + 1]["question"]).toEqual(newCard["question"]);
  expect(newData.cards[Object.keys(mockData.cards).length + 1]["answer"]).toEqual(newCard["answer"]);
  expect(newData.cards[Object.keys(mockData.cards).length + 1]["tag"]).toEqual(newCard["tag"]);
  expect(newData.cards[Object.keys(mockData.cards).length + 1]["category"]).toEqual(newCard["category"]);

 });
});

describe('updateCard', () => {
 test('it should update an existing card', () => {
  const updatedCard = { question: "Updated Question" };
  // fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
  const newCard = updateCard('6c84fb90-12c4-11e1-840d-7b25c5ee775a', updatedCard)
  expect(newCard.question).toEqual(updatedCard.question);
 });

 test('it should return false if card does not exist', () => {
  fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
  expect(updateCard("invalid-id", {})).toBe(null);
 });
});


describe('deleteCard', () => {
 test('it should delete an existing card', () => {
  fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
  deleteCard("6c84fb90-12c4-11e1-840d-7b25c5ee775a");
  const newData = JSON.parse(fs.writeFileSync.mock.calls[0][1]);
  expect(newData.cards["6c84fb90-12c4-11e1-840d-7b25c5ee775a"]).toBeUndefined();
 });

 test('it should return false if card does not exist', () => {
  fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
  expect(deleteCard("invalid-id")).toBe(false);
 });
});


describe('getCardsByTags', () => {
 test('it should return cards with matching tags', () => {
  fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
  expect(getCardsByTags(['Europe'])).toEqual(Object.values(mockData.cards));
 });

 test('it should return an empty array if no cards with matching tags', () => {
  fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
  expect(getCardsByTags(['NonexistentTag'])).toEqual([]);
 });
});

