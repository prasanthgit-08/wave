import React, { useState } from "react";
import { t } from "i18next";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerEmailMain from "../../../services/CustomerEmailMaintenanceService";
import { useDispatch, useSelector } from "react-redux";
import { setcustomerData } from "../../../redux/CustomerEmailSearchFilterSlice";
import CustomerEmailMaintenance from "../../../services/CustomerEmailMaintenanceService";
import { setBrowseNavigation } from "../../../redux/PaginationSlice";
import {
  setCustomerFKRedux,
  setSelectedId,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalPages,
  setTotalElements,
  setEditMode,
  setEmailRedux,
  setNameRedux,
} from "../../../redux/CustomerEmailMaintenanceSlice";
import Loading from "../../../components/common/loading";

function CustomerEmailListing() {
  const navigate = useNavigate();
  const pageNumber = useSelector((state) => state.customerEmailMaintenance.pageNumber);
  const param = useParams();
  const radioType = useSelector((state) => state.customerEmailSearchFilter.radioType);
  const searchType = useSelector((state) => state.customerEmailSearchFilter.searchType);
  const EditMode = useSelector((state) => state.customerEmailMaintenance.editMode);
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  const [selectedRow, setSelectedRow] = useState("");

  const cutomerData = useSelector((state) => state.customerEmailSearchFilter.customerData);

  const selectedId = useSelector((state) => state.customerEmailMaintenance.selectedId);

  const customerfk = useSelector((state) => state.customerEmailMaintenance.customerFK);

  const { cupk } = useParams();
  const sortFlag = useSelector((state) => state.customerEmailMaintenance.normalSortFlag);

  const sortValue = useSelector((state) => state.customerEmailMaintenance.normalSortValue);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };
  // Fetching function to render
  const fetchData = () => {
    setLoader(true);
    CustomerEmailMaintenance.getEmail(pageNumber, radioType, searchType, param.cpk, sortValue, sortFlag)
      .then((res) => {
        const data = res.data;
        setLoader(false);
        dispatch(setcustomerData(data.content));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setTotalElements(data.totalElements));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  useEffect(() => {
    dispatch(setCustomerFKRedux(param.cpk));
  });

  useEffect(() => {
    setLoader(true);
    const debounceFunction = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [radioType, searchType, pageNumber, sortValue, sortFlag]);
  // displaying Data as table

  const renderCustomer = cutomerData?.map((i, index) => {
    return (
      <tr
        key={index}
        className={i.customerEmailPK === selectedId ? "tableSelected" : ""}
        onClick={() => {
          dispatch(setSelectedId(i.customerEmailPK));
        }}
        onDoubleClick={() => {
          dispatch(setEditMode(true));
          dispatch(setEmailRedux(""));
          dispatch(setNameRedux(""));
          setTimeout(() => {
            navigate(
              "/customer-email-maintenance/" +
                customerfk +
                "/" +
                pageNumber +
                "/new-page/" +
                i.customerEmailPK
            );
          }, 200);
        }}
      >
        <td>{i.name}</td>
        <td>{i.email}</td>
      </tr>
    );
  });

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("name", !sortFlag);
              }}
            >
              {" "}
              {t("emailmaintenance.dealer.page.listing.user")}
              {sortFlag && sortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("email", !sortFlag);
              }}
            >
              {" "}
              {t("emailmaintenance.dealer.page.listing.email")}
              {sortFlag && sortValue === "email" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "email" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>
        {loader ? "" : cutomerData?.length > 0 && <tbody>{renderCustomer}</tbody>}
      </table>
      {loader ? (
        <Loading />
      ) : (
        cutomerData?.length === 0 && (
          <h2 className="empty-list pt-1" align="center">
            No Records Available
          </h2>
        )
      )}
    </div>
  );
}

export default CustomerEmailListing;
