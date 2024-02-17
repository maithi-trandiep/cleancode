import axios from 'axios';
const API_URL = import.meta.env.BASE_URL;

export const CardService = {
    async createCard(card) {
        const response = await axios.post(API_URL + '/api/cards', card);
        return response.data;
    },
    async getAllCards() {
        const response = await axios.get(API_URL + '/api/cards');
        return response.data;
    },
    async getCardById(id) {
        const response = await axios.get(API_URL + `/api/cards/${id}`);
        return response.data;
    },
    async getCardsByTags(tags) {
        const response = await axios.get(API_URL + `/api/cards?tags=${tags.join(',')}`);
        return response.data;
    },
    async updateCard(id, card) {
        const response = await axios.patch(API_URL + `/api/cards/${id}`, card);
        return response.data;
    },
    async deleteCard(id) {
        const response = await axios.delete(API_URL + `/api/cards/${id}`);
        return response.data;
    },
}