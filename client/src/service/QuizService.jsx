import axios from "axios";

export const QuizService = {
    async createQuiz(quiz) {
        const response = await axios.post(`http://localhost:8080/quiz`, quiz);
        return response.data;
    },
    async getAllQuiz() {
        const response = await axios.get(`http://localhost:8080/quiz`);
        return response.data;
    },
    async getLastQuizByUser(userId) {
        const response = await axios.get(`http://localhost:8080/users/${userId}/lastQuiz`);
        return response.data;
    }
}
