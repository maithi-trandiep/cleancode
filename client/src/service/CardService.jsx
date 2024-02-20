import axios from 'axios';

export const CardService = {
  async createCard(card) {
    const response = await axios.post(`http://localhost:8080/cards`, card);
    return response.data;
  },
  async getAllCards() {
    try {
      const response = await axios.get(`http://localhost:8080/cards`);
      return response.data;
    } catch (error) {
      return [];
    }
  },
  async getCardById(id) {
    const response = await axios.get(`http://localhost:8080/cards/${id}`);
    return response.data;
  },
  async getQuizForDate(date) {
    try {
      if (!date) {
        const today = new Date();
        date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
      }
      const response = await axios.get(
        `http://localhost:8080/cards/quizz?date=${date}`
      );
      return response.data;
    } catch (error) {
      return null;
    }
  },
  async answerCard(id, { isValid }) {
    try {
      const response = await axios.patch(
        `http://localhost:8080/cards/${id}/answer`,
        { isValid }
      );
      return response.data;
    } catch (error) {
      return null;
    }
  },
  async updateCard(id, card) {
    const response = await axios.patch(
      `http://localhost:8080/cards/${id}`,
      card
    );
    return response.data;
  },
  async deleteCard(id) {
    const response = await axios.delete(`http://localhost:8080/cards/${id}`);
    return response.data;
  },
  async getCardsByTags(tags) {
    try {
      const response = await axios.get(
        `http://localhost:8080/cards?tags=${tags}`
      );
      return response.data;
    } catch (error) {
      return null;
    }
  },
};