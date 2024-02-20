import axios from "axios";

export const TagService = {
    async getCardsByTags(tags) {
        const response = await axios.get(`http://localhost:8080/cards?tags=${tags}`)
        return response.data;
    },
};