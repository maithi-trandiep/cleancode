import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { AuthService } from "../../service/AuthService";

describe("AuthService", () => {
  it("returns data when signIn is called", async () => {
    const mock = new MockAdapter(axios);
    const data = { response: true };
    const user = { username: "testUser", password: "testPassword" };
    mock.onPost("http://localhost:8080/signin").reply(200, data);

    const response = await AuthService.signIn(user);

    expect(response).toEqual(data);
  });

  it("returns data when signUp is called", async () => {
    const mock = new MockAdapter(axios);
    const data = { response: true };
    const newUser = { username: "newUser", password: "newPassword" };
    mock.onPost("http://localhost:8080/signup").reply(200, data);

    const response = await AuthService.signUp(newUser);

    expect(response).toEqual(data);
  });
});
