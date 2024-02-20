import axios from "axios";

export const QuizService = {
    async createQuiz(quiz) {
        try {
            const response = await axios.post(`http://localhost:8080/quiz`, quiz);
            return response.data;
        } catch (error) {
            return null;
        }
    },
    async getQuizByUser(userId) {
        try {
            const response = await axios.get(`http://localhost:8080/quiz/${userId}`);
            return response.data;
        } catch (error) {
            return null;
        }
    }
}
