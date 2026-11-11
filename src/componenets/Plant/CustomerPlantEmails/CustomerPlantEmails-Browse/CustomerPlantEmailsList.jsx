import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PlantEmailService from "../../../../services/PlantEmailService";
import {
  setChangeColor,
  setEmailData,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPages,
  setId,
  setViewDetail,
  setEditFormData,
} from "../../../../redux/CustomerPlantEmailSlice";
import LoadingText from "../../../common/LoadingText";

const CustomerPlantEmailsList = () => {
  const params = useParams();
  const plantId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [adSort] = useState(false);
  const searchTerm = useSelector((state) => state.customerPlantEmailReducer.searchTerm);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerPlantEmailReducer.selectedSearchCriteria
  );

  const pageNumber = useSelector((state) => state.customerPlantEmailReducer.pageNumber);

  const id = useSelector((state) => state.customerPlantEmailReducer.id);
  const changeColor = useSelector((state) => state.customerPlantEmailReducer.changeColor);
  const sortValue = useSelector((state) => state.customerPlantEmailReducer.normalSortValue);
  const sortFlag = useSelector((state) => state.customerPlantEmailReducer.normalSortFlag);
  const emailData = useSelector((state) => state.customerPlantEmailReducer.emailData);

  const fetchPlantEmail = () => {
    setLoader(true);
    PlantEmailService.getAllPlantEmails(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag,
      plantId
    )
      .then((response) => {
        const data = response.data;
        setLoader(false);
        dispatch(setEmailData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((error) => {
        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchPlantEmail();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag, plantId]);
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
              Name
              {sortFlag && sortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
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
          {loader
            ? ""
            : emailData.map((code) => (
                <tr
                  id="rowId"
                  key={code.customerPlantEmailPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setId(code.customerPlantEmailPK));
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));
                    dispatch(setEditFormData(null));
                    setTimeout(() => {
                      navigate(
                        "/customer-plant-emails/" +
                          params.customerId +
                          "/" +
                          plantId +
                          "/" +
                          pageNumber +
                          "/" +
                          code.customerPlantEmailPK
                      );
                    }, 100);
                  }}
                  className={code.customerPlantEmailPK === id && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{code.name}</td>
                  <td className="f-w-600">{code.email}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader
        ? ""
        : emailData.length === 0 && (
            <h2 className="empty-list" align="center">
              {t("AlternateContact.list.empty.message")}
            </h2>
          )}
      {loader && <LoadingText />}
    </div>
  );
};

export default CustomerPlantEmailsList;
