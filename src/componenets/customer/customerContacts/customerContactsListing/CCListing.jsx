import React from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  setId,
  setChangeColor,
  setNormalSortValue,
  setNormalSortFlag,
  setSearchTerm,
  setSearchCriteria,
  setCustomerContactData,
  setTotalElements,
  setTotalPages,
  resetChanges,
} from "../../../../redux/CustomerContactSlice";
import CustomerContactService from "../../../../services/CustomerContactService";
import Loading from "../../../../components/common/loading";

const CCListing = () => {
  const params = useParams();
  const customerId = params.customerId;
  const pageNumber = useSelector((state) => state.customerContactReducer.pageNumber);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const changeColor = useSelector((state) => state.customerContactReducer.changeColor);
  const id = useSelector((state) => state.customerContactReducer.id);
  const customerContactData = useSelector((state) => state.customerContactReducer.customerContactData);
  const searchTerm = useSelector((state) => state.customerContactReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.customerContactReducer.searchCriteria);

  const sortValue = useSelector((state) => state.customerContactReducer.normalSortValue);
  const sortFlag = useSelector((state) => state.customerContactReducer.normalSortFlag);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };
  const fetchTableData = () => {
    setLoader(true);
    CustomerContactService.getCustomerContacts(
      searchTerm,
      searchCriteria,
      pageNumber,
      customerId,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        setLoader(false);
        dispatch(setCustomerContactData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoader(false);
      })
      .finally(() => setLoader(false));
  };
  useEffect(() => {
    setLoader(true);
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCriteria, searchTerm, pageNumber, sortValue, sortFlag]);
  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("contact", !sortFlag);
              }}
            >
              {t("customerContacts.list.page.contact")}
              {sortFlag && sortValue === "contact" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "contact" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {loader
            ? ""
            : customerContactData.map((customerContacts) => (
                <tr
                  id="rowId"
                  key={customerContacts.customerContactPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setId(customerContacts.customerContactPK));
                    dispatch(setChangeColor(true));
                    dispatch(resetChanges());
                    setTimeout(() => {
                      navigate(
                        "/add-customer-contacts/" +
                          customerId +
                          "/" +
                          pageNumber +
                          "/new-page/" +
                          customerContacts.customerContactPK
                      );
                    }, 100);
                  }}
                  className={customerContacts.customerContactPK === id && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{customerContacts.contact} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader ? (
        <Loading />
      ) : (
        customerContactData.length === 0 && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )
      )}
    </div>
  );
};

export default CCListing;
