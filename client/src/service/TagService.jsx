import axios from "axios";

export const TagService = {
    async getAllTags() {
        const response = await axios.get(`http://localhost:8080/tags`);
        return response.data;
    }
};