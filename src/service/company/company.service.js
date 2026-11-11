import { axios } from "../../config/axiosInterceptors";
import { Company_Base_URL } from "../../constants/backendUrl.constant";

class CompanyService {
  async getAllCompanyData() {
    try {
      const res = await axios.get(`${Company_Base_URL}/getAllCompanyDetails`);
      return res;
    } catch (error) {
      console.error("Error get company:", error);
      throw error;
    }
  }
}
const CompanyServices = new CompanyService();

export default CompanyServices;
