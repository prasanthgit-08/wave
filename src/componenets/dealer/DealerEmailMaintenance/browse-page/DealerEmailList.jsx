import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setId,
  setChangeColor,
  setViewDetail,
  setNormalSortValue,
  setNormalSortFlag,
  setEmailData,
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
  setIsNameUnique,
  setIsEmailUnique,
} from "../../../../redux/DealerEmailSlice";
import DealerEmailMaintenanceService from "../../../../services/DealerEmailMaintenanceService";
const DealerEmailList = (props) => {
  const params = useParams();
  const id = params.id;
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchTerm = useSelector((state) => state.dealerEmailReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.dealerEmailReducer.selectedSearchCriteria);
  const [adSort] = useState(false);

  const emailData = useSelector((state) => state.dealerEmailReducer.emailData);
  const pageNumber = useSelector((state) => state.dealerEmailReducer.pageNumber);
  const changeColor = useSelector((state) => state.dealerEmailReducer.changeColor);
  const id1 = useSelector((state) => state.dealerEmailReducer.id);
  let sortFlag = useSelector((state) => state.dealerEmailReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.dealerEmailReducer.normalSortValue);

  const fetchDealerEmail = () => {
    setLoader(true);

    DealerEmailMaintenanceService.getAllDealerEmails(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag,
      id
    )
      .then((response) => {
        const data = response.data;
        setLoader(false);
        dispatch(setEmailData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setBrowseNavigation(data));
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
    fetchDealerEmail();
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchDealerEmail();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, searchTerm, pageNumber]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("name", !sortFlag);
                }
              }}
            >
              {" "}
              Name
              {sortFlag && sortValue === "name" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("email", !sortFlag);
                }
              }}
            >
              Email
              {sortFlag && sortValue === "email" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "email" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loader &&
            emailData.map((email) => (
              <tr
                id="rowId"
                key={email.dealerEmailsPK}
                onClick={() => dispatch(setChangeColor(false))}
                onDoubleClick={() => {
                  dispatch(setChangeColor(true));
                  dispatch(setId(email.dealerEmailsPK));
                  dispatch(setViewDetail(true));
                  dispatch(setIsNameUnique(false));
                  dispatch(setIsEmailUnique(false));
                  setTimeout(() => {
                    navigate(`/add-dealer-email-maintenance/${id}/${email.dealerEmailsPK}/${pageNumber}`);
                  }, 100);
                }}
                className={email.dealerEmailsPK === id1 && changeColor ? "tableSelected" : ""}
              >
                <td className="f-w-600">{email.name}</td>
                <td className="f-w-600">{email.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {loader ? (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        emailData?.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
};

export default DealerEmailList;
