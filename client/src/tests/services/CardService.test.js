import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CardService } from "../../service/CardService";

describe("CardService", () => {
  it("returns data when createCard is called", async () => {
    const mock = new MockAdapter(axios);
    const data = { response: true };
    const card = { title: "Test Card" };
    mock.onPost("http://localhost:8080/cards").reply(201, data);

    const response = await CardService.createCard(card);

    expect(response).toEqual(data);
  });

  it("returns data when getAllCards is called", async () => {
    const mock = new MockAdapter(axios);
    const data = [{ title: "Test Card 1" }, { title: "Test Card 2" }];
    mock.onGet("http://localhost:8080/cards").reply(200, data);

    const response = await CardService.getAllCards();

    expect(response).toEqual(data);
  });

  it("returns data when getCardById is called", async () => {
    const mock = new MockAdapter(axios);
    const data = { title: "Test Card" };
    const id = "testId";
    mock.onGet(`http://localhost:8080/cards/${id}`).reply(200, data);

    const response = await CardService.getCardById(id);

    expect(response).toEqual(data);
  });

  it("returns data when getQuizForDate is called", async () => {
    const mock = new MockAdapter(axios);
    const data = [{ title: "Test Card 1" }, { title: "Test Card 2" }];
    const date = "2022-01-01";
    mock
      .onGet(`http://localhost:8080/cards/quizz?date=${date}`)
      .reply(200, data);

    const response = await CardService.getQuizForDate(date);

    expect(response).toEqual(data);
  });

  it("returns data when answerCard is called", async () => {
    const mock = new MockAdapter(axios);
    const data = { response: true };
    const id = "testId";
    const answer = { isValid: true };
    mock.onPatch(`http://localhost:8080/cards/${id}/answer`).reply(200, data);

    const response = await CardService.answerCard(id, answer);

    expect(response).toEqual(data);
  });

  it("returns data when updateCard is called", async () => {
    const mock = new MockAdapter(axios);
    const data = { title: "Updated Test Card" };
    const id = "testId";
    const card = { title: "Updated Test Card" };
    mock.onPatch(`http://localhost:8080/cards/${id}`).reply(200, data);

    const response = await CardService.updateCard(id, card);

    expect(response).toEqual(data);
  });

  it("returns data when deleteCard is called", async () => {
    const mock = new MockAdapter(axios);
    const data = { response: true };
    const id = "testId";
    mock.onDelete(`http://localhost:8080/cards/${id}`).reply(200, data);

    const response = await CardService.deleteCard(id);

    expect(response).toEqual(data);
  });

  it("returns data when getCardsByTags is called", async () => {
    const mock = new MockAdapter(axios);
    const data = { response: true };
    mock.onGet("http://localhost:8080/cards?tags=test").reply(200, data);

    const response = await CardService.getCardsByTags("test");

    expect(response).toEqual(data);
  });

  it("throws an error when getCardsByTags is called and request fails", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:8080/cards?tags=test").reply(500);

    try {
      await CardService.getCardsByTags("test");
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.response.status).toBe(500);
    }
  });
});
