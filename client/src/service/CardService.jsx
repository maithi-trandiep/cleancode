import axios from 'axios';

export const CardService = {
    async createCard(card) {
        const response = await axios.post(`http://localhost:8080/cards`, card);
        return response.data;
    },
    async getAllCards() {
        const response = await axios.get(`http://localhost:8080/cards`);
        return response.data;
    },
    async getCardById(id) {
        const response = await axios.get(`http://localhost:8080/cards/cards/${id}`);
        return response.data;
    },
    async getCardsByTags(tags) {
        const response = await axios.get(`http://localhost:8080/cards/cards?tags=${tags}`)
        return response.data;
    },
    async updateCard(id, card) {
        const response = await axios.patch(`http://localhost:8080/cards/${id}`, card);
        return response.data;
    },
    async deleteCard(id) {
        const response = await axios.delete(`http://localhost:8080/cards/${id}`);
        return response.data;
    },
}