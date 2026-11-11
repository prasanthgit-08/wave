import { axios } from "../config/axiosInterceptors";
import {
  CustomerOrderColumns_Base_URL,
  CustomerOrderMaintenance_Base_URL,
  CustomerOrder_ColumnBase_URL,
  QuarterScreen_GroupsMaintenance_RecordsPerPage,
} from "./constants/applicationConstants";
class CustomerOrderColumnsService {
  getAssignedColumnsdata(id, assignedPageNumber, saveList, updateList, deleteList) {
    return axios.post(CustomerOrderColumns_Base_URL + "/listassignedcustomerordercolumns", {
      customerOrderFK: id,
      pageNumber: assignedPageNumber,
      size: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      saveList: saveList,
      updateList: updateList,
      deleteList: deleteList,
    });
  }
  deleteCustomerOrderColumns(columnId) {
    return axios.delete(CustomerOrderColumns_Base_URL + "/deletecustomerordercolumn/" + columnId);
  }
  getCustomerOrderColumnssById(columnId) {
    return axios.get(CustomerOrderColumns_Base_URL + "/getcustomerorderscolumnsdata/" + columnId);
  }

  checkFieldNameExist(fieldName, id, customerOrderColumnPK, excludedIds) {
    return axios.post(CustomerOrderColumns_Base_URL + "/checkfieldnameexist", {
      fieldName: fieldName,
      customerOrderFK: id,
      customerOrderColumnPK: customerOrderColumnPK,
      excludedIds: excludedIds,
    });
  }
  saveColumnFields(customerOrderFK, columnsList) {
    return axios.post(CustomerOrderMaintenance_Base_URL + "/saveColumns", {
      customerOrderFK: customerOrderFK,
      columnsData: columnsList,
    });
  }

  checkTableAndColumnExist(tableName, columnName) {
    return axios.get(`${CustomerOrderColumns_Base_URL}/checkColumnExists/${tableName}/${columnName}`);
  }
  checkSequenceNumberExistsForUnit(toField, splitFieldSeq, id, customerOrderColumnPK, excludedIds) {
    return axios.post(CustomerOrderColumns_Base_URL + "/checksequencenumberexist", {
      toField: toField,
      splitFieldSeq: splitFieldSeq,
      customerOrderFK: id,
      customerOrderColumnPK: customerOrderColumnPK,
      excludedIds: excludedIds,
    });
  }

  //fetch--order columns
  customerOrderColumnlist(id) {
    return axios.post(CustomerOrder_ColumnBase_URL + "/lookup", {
      customerOrderFK: id,
    });
  }
  //save order column
  saveCustomerOrderColumns = (payload) => {
    return axios.post(`${CustomerOrder_ColumnBase_URL}/saveColumns`, payload);
  };
}
export default new CustomerOrderColumnsService();
