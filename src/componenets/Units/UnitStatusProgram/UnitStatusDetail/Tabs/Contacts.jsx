import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import {
  setContactSortFlag,
  setContactSortValue,
  setContactTotalElements,
  setContactTotalPages,
} from "../../../../../redux/UnitStatus/UnitStatusSlice";
import UnitStatusService from "../../../../../services/Units/UnitStatusService";
import { useParams } from "react-router-dom";
import LoadingText from "../../../../common/LoadingText";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";

function Contacts({ data }) {
  const dispatch = useDispatch();

  const { id } = useParams();
  const activeTab = useSelector((state) => state.unitStatusReducer.activeTab);

  const [unitContactData, setUnitContactData] = useState(data?.data || []);
  const contactPageNumber = useSelector((state) => state.unitStatusReducer.contactPageNumber);
  const contactTotalPages = useSelector((state) => state.unitStatusReducer.contactTotalPages);
  const contactSortFlag = useSelector((state) => state.unitStatusReducer.contactSortFlag);
  const contactSortValue = useSelector((state) => state.unitStatusReducer.contactSortValue);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const [loading, setLoading] = useState(true);

  const onhandleNormalSort = (value, val) => {
    dispatch(setContactSortFlag(val));
    dispatch(setContactSortValue(value));
  };

  const getAllUnitNumbersListContact = () => {
    UnitStatusService.getUnitStatusDataForPaginationAndSort(
      selectedId,
      "Contacts",
      contactPageNumber,
      14,
      contactSortValue,
      contactSortFlag
    )
      .then((response) => {
        const { data } = response;
        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.find((item) => item.Type === "Pagination");
        setUnitContactData(listingData);
        if (paginationData) {
          dispatch(setContactTotalElements(paginationData.TotalElements));
          dispatch(setContactTotalPages(paginationData.TotalPages));
        }
      })
      .catch((error) => {
        // Handle error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id && activeTab === "Contacts") {
      getAllUnitNumbersListContact();
    }
  }, [contactPageNumber, contactSortValue, contactSortFlag, activeTab]);

  return (
    <div className="p-1 ps-2">
      <Col xs={12}>
        <div className="mt-3 d-flex h-550px">
          <div className="w-100 border border-2 border-dark">
            <div
              className="fixTableHead unitSelection"
              style={{
                maxHeight: unitContactData.length > 14 ? "550px" : "auto",
                overflowY: unitContactData.length > 14 ? "auto" : "hidden",
                overflowX: "hidden",
              }}
            >
              <table className="table table-striped f-w-600">
                <thead>
                  <tr disabled>
                    <th
                      className="f-w-600 col-3"
                      onClick={() => {
                        onhandleNormalSort("Name", !contactSortFlag);
                      }}
                    >
                      Name{" "}
                      {contactSortFlag && contactSortValue === "Name" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!contactSortFlag && contactSortValue === "Name" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                    <th
                      className="f-w-600 col-3"
                      onClick={() => {
                        onhandleNormalSort("Phone", !contactSortFlag);
                      }}
                    >
                      Phone{" "}
                      {contactSortFlag && contactSortValue === "Phone" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!contactSortFlag && contactSortValue === "Phone" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>

                    <th
                      className="f-w-600 col-3"
                      onClick={() => {
                        onhandleNormalSort("Email", !contactSortFlag);
                      }}
                    >
                      {" "}
                      Email{" "}
                      {contactSortFlag && contactSortValue === "Email" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!contactSortFlag && contactSortValue === "Email" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                    <th
                      className="f-w-600 col-1"
                      onClick={() => {
                        onhandleNormalSort("Master", !contactSortFlag);
                      }}
                    >
                      {" "}
                      Master{" "}
                      {contactSortFlag && contactSortValue === "Master" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!contactSortFlag && contactSortValue === "Master" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                    <th
                      className="f-w-600 "
                      onClick={() => {
                        onhandleNormalSort("Delay", !contactSortFlag);
                      }}
                    >
                      {" "}
                      Delay{" "}
                      {contactSortFlag && contactSortValue === "Delay" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!contactSortFlag && contactSortValue === "Delay" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    unitContactData.length > 0 &&
                    unitContactData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Name}</td>
                        <td>{item.Phone?.trim()}</td>
                        <td>{item.Email?.trim()}</td>
                        <td>{item.Master}</td>
                        <td>{item.Delay}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {loading && <LoadingText smallerFont />}
              {!loading && unitContactData?.length === 0 && <NoRecordsMessage />}
            </div>
          </div>
          {/* <PaginationComponent
            {...paginationProps}
            recordsPerPage={EditMasterUnitSelection_RecordsPerPage}
            doubleArrowUp
            doubleArrowDown
            singleArrowUp
            singleArrowDown
          /> */}
        </div>
      </Col>
    </div>
  );
}

export default Contacts;
