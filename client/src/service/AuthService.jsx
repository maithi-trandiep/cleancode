import axios from "axios";

export const AuthService = {
    async signIn(user) {
        const response = await axios.post(`http://localhost:8080/signin`, user);
        return response.data;
    },
    async signUp(newUser) {
        const response = await axios.post(`http://localhost:8080/signup`, newUser);
        return response.data;
    },
}