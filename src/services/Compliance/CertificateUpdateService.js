import { axios } from "../../config/axiosInterceptors";
import { CertificateUpdate_Base_URL } from "../constants/applicationConstants";

class CertificateUpdateService {
  browseDrivers({
    userPK,
    firstName = "",
    lastName = "",
    sortValue = "",
    sortType = true,
    pageNumber = 1,
    size = 10,
  }) {
    return axios.post(`${CertificateUpdate_Base_URL}/browse/?userPK=${userPK}`, {
      firstName,
      lastName,
      sortValue,
      sortType,
      pageNumber,
      size,
    });
  }

  updateCertificate({ userPK, driverPK, type, availableDate, nextDate }) {
    return axios.post(`${CertificateUpdate_Base_URL}/update?userPK=${userPK}`, {
      driverPK,
      type,
      availableDate,
      nextDate,
    });
  }
}

export default new CertificateUpdateService();
