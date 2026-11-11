import axios from "axios";
import { axios as axiosInstance } from "../../config/axiosInterceptors";
import { BackEnd_Base_URL } from "../../constants/backendUrl.constant";
class AuthService {
  login(username, password) {
    try {
      return axios.post(`${BackEnd_Base_URL}user/login`, {
        username: username,
        password: password,
      });
    } catch (error) {
      console.error("login error:", error);
      throw error;
    }
  }

  async refreshToken(token) {
    try {
      const response = await axios.post(`${BackEnd_Base_URL}user/refresh?refreshToken=${token}`);
      const { data } = response;
      return data;
    } catch (error) {
      console.error("refreshToken error:", error);
      throw error;
    }
  }

  async logout(username) {
    try {
      const response = await axios.post(`${BackEnd_Base_URL}user/logout?username=${username}`);
      const { data } = response;
      return data;
    } catch (error) {
      console.error("logout error:", error);
      throw error;
    }
  }

  changePassword(userId, password) {
    try {
      return axiosInstance.post(`${BackEnd_Base_URL}user/changePassword`, {
        username: userId,
        password: password,
      });
    } catch (error) {
      console.error("changePassword error:", error);
      throw error;
    }
  }

  forgotPassword(userId) {
    try {
      return axios.post(`${BackEnd_Base_URL}user/forgotpassword?loginName=${userId}`);
    } catch (error) {
      console.error("forgotPassword error:", error);
      throw error;
    }
  }

  forgotLogin(email) {
    try {
      return axios.post(`${BackEnd_Base_URL}user/forgotlogin?email=${email}`);
    } catch (error) {
      console.error("forgotLogin error:", error);
      throw error;
    }
  }
}

export default new AuthService();
