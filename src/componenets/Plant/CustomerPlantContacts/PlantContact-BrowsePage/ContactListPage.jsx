import React from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  setChangeColor,
  setContactData,
  setEditFormData,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setPlantContactData,
  setPlantPk,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../redux/CustomerPlantContactSlice";
import PlantContactService from "../../../../services/PlantContactService";
import LoadingText from "../../../common/LoadingText";

const ContactListPage = () => {
  const params = useParams();
  const plantId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const searchTerm = useSelector((state) => state.customerPlantContactReducer.searchTerm);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerPlantContactReducer.selectedSearchCriteria
  );
  const pageNumber = useSelector((state) => state.customerPlantContactReducer.pageNumber);

  const plantContactData = useSelector((state) => state.customerPlantContactReducer.plantContactData);

  const id = useSelector((state) => state.customerPlantContactReducer.id);
  const changeColor = useSelector((state) => state.customerPlantContactReducer.changeColor);
  let sortValue = useSelector((state) => state.customerPlantContactReducer.normalSortValue);
  let sortFlag = useSelector((state) => state.customerPlantContactReducer.normalSortFlag);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };
  const fetchTableData = () => {
    setLoader(true);
    PlantContactService.getAllPLantContacts(
      searchTerm,
      selectedSearchCriteria,
      pageNumber,
      sortValue,
      sortFlag,
      plantId
    )
      .then((response) => {
        const { data } = response;
        setLoader(false);
        dispatch(setPlantContactData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
      });
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
  }, [selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag, plantId]);

  useEffect(() => {
    dispatch(setPlantPk(plantId));
  }, [plantId]);

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
              Contact
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
            : plantContactData.map((item) => (
                <tr
                  id="rowId"
                  key={item.customerPlantContactPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setEditFormData(null));
                    dispatch(setId(item.customerPlantContactPK));
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));
                    setTimeout(() => {
                      navigate(
                        "/customer-plant-contacts/" +
                          params.customerId +
                          "/" +
                          plantId +
                          "/" +
                          pageNumber +
                          "/" +
                          item.customerPlantContactPK
                      );
                    }, 100);
                  }}
                  className={item.customerPlantContactPK === id && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{item.contact} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader
        ? ""
        : plantContactData.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
      {loader && <LoadingText />}
    </div>
  );
};

export default ContactListPage;
