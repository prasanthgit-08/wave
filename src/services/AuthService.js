import axios from "axios";
import { axios as axiosInstance } from "../config/axiosInterceptors";
import { BackEnd_Base_URL } from "./constants/applicationConstants";

class AuthService {
  login(username, password) {
    return axios.post(`${BackEnd_Base_URL}user/login`, {
      username: username,
      password: password,
    });
  }

  async refreshToken(token) {
    try {
      const response = await axios.post(`${BackEnd_Base_URL}user/refresh?refreshToken=${token}`);
      const { data } = response;
      return data;
    } catch (error) {
      console.error("refreshToken error:", error);
    }
  }

  async logout(username) {
    try {
      const response = await axios.post(`${BackEnd_Base_URL}user/logout?username=${username}`);
      const { data } = response;
      return data;
    } catch (error) {
      console.error("logout error:", error);
    }
  }

  changePassword(userId, password) {
    return axiosInstance.post(`${BackEnd_Base_URL}user/changePassword`, {
      username: userId,
      password: password,
    });
  }

  forgotPassword(userId) {
    return axios.post(`${BackEnd_Base_URL}user/forgotpassword?loginName=${userId}`);
  }

  forgotLogin(email) {
    return axios.post(`${BackEnd_Base_URL}user/forgotlogin?email=${email}`);
  }
}

export default new AuthService();
