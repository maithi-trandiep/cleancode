import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { QuizService } from "../../service/QuizService";

describe("QuizService", () => {
  it("returns data when createQuiz is called", async () => {
    const mock = new MockAdapter(axios);
    const data = { response: true };
    const quiz = { title: "Test Quiz" };
    mock.onPost("http://localhost:8080/quiz").reply(200, data);

    const response = await QuizService.createQuiz(quiz);

    expect(response).toEqual(data);
  });

  it("returns data when getQuizByUser is called", async () => {
    const mock = new MockAdapter(axios);
    const data = { response: true };
    const userId = "testUser";
    mock.onGet(`http://localhost:8080/quiz/${userId}`).reply(200, data);

    const response = await QuizService.getQuizByUser(userId);

    expect(response).toEqual(data);
  });

  it("throws an error when createQuiz is called and request fails", async () => {
    const mock = new MockAdapter(axios);
    const quiz = { title: "Test Quiz" };
    mock.onPost("http://localhost:8080/quiz").reply(500);

    try {
      await QuizService.createQuiz(quiz);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.response.status).toBe(500);
    }
  });

  it("throws an error when getQuizByUser is called and request fails", async () => {
    const mock = new MockAdapter(axios);
    const userId = "testUser";
    mock.onGet(`http://localhost:8080/quiz/${userId}`).reply(500);

    try {
      await QuizService.getQuizByUser(userId);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.response.status).toBe(500);
    }
  });
});
