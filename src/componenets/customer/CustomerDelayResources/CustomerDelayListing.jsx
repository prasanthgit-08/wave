import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setCustomerFKRedux } from "../../../redux/CustomerDelaySlice";
import {
  setDelaySelectedId,
  setNormalSortValue,
  setNormalSortFlag,
  setListingData,
  setTotalElements,
  setTotalPages,
  setDescription,
  setPhone,
  setDelay,
  setBreakdown,
  setDamage,
  setNotes,
} from "../../../redux/CustomerDelaySlice";
import CustomerDelaySlice from "../../../redux/CustomerDelaySlice";
import CustomerDelayServices from "../../../services/CustomerDelayServices";
import LoadingIcon from "../../common/LoadingIcon";

const CustomerDelayListing = () => {
  const param = useParams();
  const cpk = param.cpk;
  const searchTerm = useSelector((state) => state.customerDelaySlice.searchTerm);
  const searchCriteria = useSelector((state) => state.customerDelaySlice.searchCriteria);
  const pageNumber = useSelector((state) => state.customerDelaySlice.pageNumber);
  const totalPages = useSelector((state) => state.customerDelaySlice.totalPages);
  const totalElements = useSelector((state) => state.customerDelaySlice.totalElements);

  const listingData = useSelector((state) => state.customerDelaySlice.listingData);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [selectedRow, setSelectedRow] = useState("");
  const [loader, setLoader] = useState(true);
  const selectedId = useSelector((state) => state.customerDelaySlice.selectedId);
  const sortFlag = useSelector((state) => state.customerDelaySlice.normalSortFlag);

  const sortValue = useSelector((state) => state.customerDelaySlice.normalSortValue);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };
  const fetchData = () => {
    setLoader(true);
    CustomerDelayServices.getCustomerDelay(
      pageNumber,
      searchCriteria,
      searchTerm,
      param.cpk,
      sortValue,
      sortFlag
    )
      .then((res) => {
        setLoader(false);
        const { data } = res;
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoader(false);
      })
      .finally(() => setLoader(false));
  };

  const resetDatas = () => {
    dispatch(setDescription(""));
    dispatch(setPhone(""));
    dispatch(setDelay(false));
    dispatch(setBreakdown(false));
    dispatch(setDamage(false));
    dispatch(setNotes(""));
  };

  useEffect(() => {
    setLoader(true);
    const debounceFunction = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, sortValue, sortFlag]);
  // Browse list table
  const renderData = listingData.map((i, index) => {
    return (
      <tr
        className={
          selectedId == i.customerDelayResourcePK
            ? "tableSelected"
            : selectedRow == i.customerDelayResourcePK
              ? "tableSelected"
              : ""
        }
        id="rowId"
        key={index}
        onClick={() => {
          setSelectedRow(i.customerDelayResourcePK);
          dispatch(setDelaySelectedId(i.customerDelayResourcePK));
        }}

        onDoubleClick={() => {
          resetDatas();
          setTimeout(() => {
            navigate(
              "/add-customer-delay/" + cpk + "/" + pageNumber + "/new-page/" + i.customerDelayResourcePK
            );
          }, 200);
        }}
      >
        <td className="f-w-600">{i.description}</td>
      </tr>
    );
  });

  return (
    <div className="fixTableHead">
      {loader && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              {t("customerdelay.table.heading.disc")}
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        {loader ? null : renderData != 0 && <tbody>{renderData}</tbody>}

        {loader
          ? ""
          : renderData == 0 && (
              <h2 className="empty-list pt-3" align="center">
                No Records Available
              </h2>
            )}
      </table>
    </div>
  );
};

export default CustomerDelayListing;
