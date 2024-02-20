import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { TagService } from "../../service/TagService";

describe("TagService", () => {
  it("returns data when getCardsByTags is called", async () => {
    const mock = new MockAdapter(axios);
    const data = { response: true };
    mock.onGet("http://localhost:8080/cards?tags=test").reply(200, data);

    const response = await TagService.getCardsByTags("test");

    expect(response).toEqual(data);
  });

  it("throws an error when getCardsByTags is called and request fails", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:8080/cards?tags=test").reply(500);

    try {
      await TagService.getCardsByTags("test");
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.response.status).toBe(500);
    }
  });
});
