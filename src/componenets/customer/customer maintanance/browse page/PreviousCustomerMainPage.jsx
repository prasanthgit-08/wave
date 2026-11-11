import React, { useEffect, useState } from "react";
import { CustomerSearchFilter } from "./CustomerSearchFilter";
import { CustomerListing } from "./CustomerListing";
import { useSelector, useDispatch } from "react-redux";
import { setPageNumber } from "../../../../redux/PaginationSlice";
import { CustomerAdvanceSearch } from "./CustomerAdvanceSearch";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { setAdvanceSortingCriteria } from "../../../../redux/CustomerSearchFilterSlice";
import { CustomerAdvanceSort } from "./CustomerAdvanceSort";

const CustomerMainPage = () => {
  const dispatch = useDispatch();
  const [firstField, setFirstField] = useState(null);
  const [secondField, setSecondField] = useState(null);
  const [thirdField, setThirdField] = useState(null);
  const [fourthField, setFourthField] = useState(null);
  const [fifthField, setFifthField] = useState(null);

  const customerData = useSelector((state) => state.customerSearchFilterReducer.customerData);

  const loader = useSelector((state) => state.customerSearchFilterReducer.loader);

  const showAdvanceSearch = useSelector((state) => state.customerSearchFilterReducer.showAdvanceSearch);

  const showAdvanceSort = useSelector((state) => state.customerSearchFilterReducer.showAdvanceSort);

  const { pageNumber, totalPages, totalElements } = useSelector((state) => state.paginationReducer);

  const advanceSortingOrder = useSelector((state) => state.customerSearchFilterReducer.advanceSortingOrder);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: customerData,
  };

  useEffect(() => {
    dispatch(
      setAdvanceSortingCriteria({
        firstField: firstField,
        secondField: secondField,
        thirdField: thirdField,
        fourthField: fourthField,
        fifthField: fifthField,
      })
    );
  }, [firstField, secondField, thirdField, fourthField, fifthField]);

  useEffect(() => {
    if (null != advanceSortingOrder) {
      setFirstField(firstField !== null ? firstField : advanceSortingOrder.firstField);
      setSecondField(secondField !== null ? secondField : advanceSortingOrder.secondField);
      setThirdField(thirdField !== null ? thirdField : advanceSortingOrder.thirdField);
      setFourthField(fourthField !== null ? fourthField : advanceSortingOrder.fourthField);
      setFifthField(fifthField !== null ? fifthField : advanceSortingOrder.fifthField);
    }
  }, []);

  return (
    <div className="container-fluid table-bordered">
      <div className="row">
        <div className="border border-dark border-2 ">
          <CustomerSearchFilter
            setFirstField={setFirstField}
            setSecondField={setSecondField}
            setThirdField={setThirdField}
            setFourthField={setFourthField}
            setFifthField={setFifthField}
          />
          <div className="row border border-dark border-1 fit-height">
            <div className="col-md-9 col-lg-9 col-9 col-lg-9 p-r-0 p-l-0">
              <div className="d-flex h-100">
                <div className="w-100">
                  <CustomerListing />
                  <div>
                    {loader ? (
                      ""
                    ) : customerData?.length === 0 ? (
                      <h2 className="empty-list" align="center">
                        No Records Available
                      </h2>
                    ) : (
                      ""
                    )}{" "}
                  </div>
                </div>
                <PaginationComponent
                  {...paginationProps}
                  firstPage
                  lastPage
                  tripleArrowUp
                  tripleArrowDown
                  doubleArrowUp
                  doubleArrowDown
                  singleArrowUp
                  singleArrowDown
                />
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-3 col-lg-3 border border-dark border-1 border-top-0 border-right-0 border-left-0">
              <div className="height-fix-1 min-h-50 row border-bottom-2px">
                {showAdvanceSearch && (
                  <div className="col-md-12 m-t-15 m-b-15">
                    <CustomerAdvanceSearch />
                  </div>
                )}
              </div>
              <div className="height-fix-2 min-h-50 row    ">
                {showAdvanceSort && (
                  <CustomerAdvanceSort
                    setFirstField={setFirstField}
                    setSecondField={setSecondField}
                    setThirdField={setThirdField}
                    setFourthField={setFourthField}
                    setFifthField={setFifthField}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerMainPage;
