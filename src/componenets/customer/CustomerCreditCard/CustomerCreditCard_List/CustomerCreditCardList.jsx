import React from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  setId,
  setChangeColor,
  setViewDetail,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerm,
  setCustomerCreditCardEditData,
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
  setCustomerCreditCardData,
  resetChanges,
} from "../../../../redux/CustomerCreditCardSlice";
import CustomerCreditCardService from "../../../../services/CustomerCreditCardService";
import LoadingText from "../../../common/LoadingText";

const CustomerCreditCardList = () => {
  const params = useParams();
  const customerId = params.customerId;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const customerCreditCardData = useSelector(
    (state) => state.customerCreditCardReducer.customerCreditCardData
  );
  const id = useSelector((state) => state.customerCreditCardReducer.id);
  const changeColor = useSelector((state) => state.customerCreditCardReducer.changeColor);
  const pageNumber = useSelector((state) => state.customerCreditCardReducer.pageNumber);
  const searchTerm = useSelector((state) => state.customerCreditCardReducer.searchTerm);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerCreditCardReducer.selectedSearchCriteria
  );

  let sortValue = useSelector((state) => state.customerCreditCardReducer.normalSortValue);
  let sortFlag = useSelector((state) => state.customerCreditCardReducer.normalSortFlag);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };
  const fetchCustomerCreditCard = () => {
    setLoader(true);
    CustomerCreditCardService.getAllCustomerCreditCard(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      customerId,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        setLoader(false);
        dispatch(setCustomerCreditCardData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setBrowseNavigation(data));
      })
      .catch((err) => {
        setLoader(false);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    setLoader(true);
    const debounceFunction = setTimeout(() => {
      fetchCustomerCreditCard();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag]);
  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("creditCardName", !sortFlag);
              }}
            >
              {t("CustomerCreditCard.list.page.table.heading.name")}
              {sortFlag && sortValue === "creditCardName" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "creditCardName" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th className="f-w-600">{t("CustomerCreditCard.list.page.table.heading.cardnumber")}</th>
          </tr>
        </thead>
        <tbody>
          {loader
            ? ""
            : customerCreditCardData?.map((credit) => (
                <tr
                  id="rowId"
                  key={credit?.customerCreditCardPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setId(credit?.customerCreditCardPK));
                    dispatch(setChangeColor(true));
                    dispatch(setCustomerCreditCardEditData(null));
                    setTimeout(() => {
                      navigate(
                        "/add-customer-credit-card/" +
                          customerId +
                          "/" +
                          pageNumber +
                          "/new-page/" +
                          credit.customerCreditCardPK
                      );
                    }, 100);
                  }}
                  className={credit?.customerCreditCardPK === id && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{credit?.creditCardName}</td>

                  <td className="f-w-600">{credit?.creditCardNumber?.replace(/[0-9](?=.*.{4})/gim, "X")}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader
        ? ""
        : customerCreditCardData?.length === 0 && (
            <h2 className="empty-list" align="center">
              {t("CustomerCreditCard.list.empty.message")}
            </h2>
          )}
      {loader && <LoadingText />}
    </div>
  );
};

export default CustomerCreditCardList;
