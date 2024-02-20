import axios from "axios";

export const QuizService = {
    async createQuiz(quiz) {
        const response = await axios.post(`http://localhost:8080/quiz`, quiz);
        return response.data;
    },
    async getQuizByUser(userId) {
        const response = await axios.get(`http://localhost:8080/quiz/${userId}`);
        return response.data;
    }
}
