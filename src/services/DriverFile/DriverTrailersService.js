/* eslint-disable import/no-anonymous-default-export */
import { axios } from "../../config/axiosInterceptors";
import {
  Customer_Base_URL,
  DriverTrailers_Base_URL,
  DriverTrailers_CrossDB_URL,
  EmailProcessor_URL,
  HalfScreen_RecordsPerPage,
  States_Base_URL,
} from "../constants/applicationConstants";

class DriverTrailersService {
  /*
    To fetch all trailer detailes based on a particular Driver
    driverID isthe DriverFK in drivertrailer table
  */

  getByDriverID(searchTerm, searchCriteria, selectedStatus, pageNumber, sortValue, sortFlag, driverID, size) {
    let status = null;
    if (selectedStatus === "Active") {
      status = 1;
    } else if (selectedStatus === "Inactive") {
      status = 0;
    }
    return axios.post(`${DriverTrailers_Base_URL}/fetchdrivertrailers`, {
      active: status,
      number: pageNumber,
      size: size || HalfScreen_RecordsPerPage,
      searchTerm: searchTerm,
      searchCriteria: searchCriteria,
      sortValue: sortValue,
      sortType: sortFlag,
      driverId: driverID,
      trailerMaintenanceProgram: true,
    });
  }

  getActiveTrailersForAutocomplete(string, driverId) {
    return axios.post(`${DriverTrailers_Base_URL}/fetchdrivertrailers`, {
      searchCriteria: "Beginning",
      searchTerm: string,
      number: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      active: true,
      isAutoComplete: true,
      driverId: driverId,
    });
  }

  /*
    To fetch all trailer details based on a particular trailer ID
    id : driverTrailerPK
  */

  getDriverTrailerById(id) {
    return axios.get(`${DriverTrailers_Base_URL}/getdrivertrailer/${id}`);
  }

  /*
  To save the trailer data into database
*/

  saveDriverTrailersDetails(saveData) {
    return axios.post(`${DriverTrailers_Base_URL}/savedrivertrailers`, saveData);
  }

  /*
      To check the description is exist for same driver. 
      Description is unique aganist each driver. Duplicate for other drivers
      id                    : driverId
      string                : description
      selectedTrailerId     : driverTrailerPK
      Returning value
      true                   : description does not exist
      false                  : description exist

  */

  checkDescriptionExist(id, string, selectedTrailerId) {
    return axios.post(DriverTrailers_Base_URL + "/descriptionexists", {
      driverId: id,
      description: string,
      driverTrailerPK: selectedTrailerId,
    });
  }

  /*
      To check it is a principle trailer or not. 
      A driver has a only one active trailer
      id                    : driverId    
      Returning value
      true                   : It is a principle trailer
      false                  : It is not a principle trailer

  */

  getPrincipleTrailer(id) {
    return axios.get(`${DriverTrailers_Base_URL}/principletrailerexist/${id}`);
  }

  /*
      To check it is the first trailer adding aganist a driver.       
      id                    : driverId      
      Returning value
     true                   : There are already adding trailers aganist the same driver.
     false                  : It is the first trailer adding aganist a driver
  */

  checkIsFirstTrailer(id) {
    return axios.get(`${DriverTrailers_Base_URL}/firsttrailerbydriver/${id}`);
  }

  /*
      To activate a trailer. 
      
      id                    : driverTrailerPK
      
      Returning value
     1                      : Indicates activate a trailer successfully.
     0                      : Failed to activate a trailer.
  */

  activateTrailer(id) {
    return axios.post(`${DriverTrailers_Base_URL}/toggleactive/${id}`);
  }

  deactivateTrailer(id) {
    return axios.post(`${DriverTrailers_Base_URL}/toggleactive/${id}`);
  }

  findActiveTrailers(id) {
    return axios.post(`${DriverTrailers_Base_URL}/activetrailers/${id}`);
  }

  sendEmail(unitSelectionRequestVO) {
    return axios.post(EmailProcessor_URL + "api/email/compose", unitSelectionRequestVO);
  }

  findTMRRecords(driverID, trailerID, month) {
    return axios.post(`${DriverTrailers_Base_URL}/tmrcount/${driverID}/${trailerID}/${month}`);
  }
}

export default new DriverTrailersService();
