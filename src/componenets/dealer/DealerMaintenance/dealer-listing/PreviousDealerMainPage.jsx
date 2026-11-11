import React, { useEffect } from "react";
import { DealersearchFilter } from "./DealerSearchFilter";
import { DealerAdvanceSearch } from "./DealerAdvanceSearch";
import { PaginationComponent } from "../../common/PaginationComponent";
import { DealerListing } from "./DealerListing";
import { useSelector, useDispatch } from "react-redux";
import { setAdvanceSortingCriteria } from "../../../redux/DealerSearchFilterSlice";
import { DealerAdvanceSort } from "./DealerAdvanceSort";
import { setPageNumber } from "../../../redux/PaginationSlice";

const DealersMainPage = () => {
  const [firstField, setFirstField] = React.useState(null);
  const [secondField, setSecondField] = React.useState(null);
  const [thirdField, setThirdField] = React.useState(null);
  const [fourthField, setFourthField] = React.useState(null);

  const dispatch = useDispatch();

  const advanceSortingOrder = useSelector((state) => state.dealerSearchReducer.advanceSortingOrder);

  useEffect(() => {
    if (null != advanceSortingOrder) {
      setFirstField(firstField !== null ? firstField : advanceSortingOrder.firstField);
      setSecondField(secondField !== null ? secondField : advanceSortingOrder.secondField);
      setThirdField(thirdField !== null ? thirdField : advanceSortingOrder.thirdField);
      setFourthField(fourthField !== null ? fourthField : advanceSortingOrder.fourthField);
    }
  }, []);

  useEffect(() => {
    dispatch(
      setAdvanceSortingCriteria({
        firstField: firstField,
        secondField: secondField,
        thirdField: thirdField,
        fourthField: fourthField,
      })
    );
  }, [firstField, secondField, thirdField, fourthField]);

  const showAdvanceSearch = useSelector((state) => state.dealerSearchReducer.showAdvanceSearch);

  const showAdvanceSort = useSelector((state) => state.dealerSearchReducer.showAdvanceSort);

  const dealerData = useSelector((state) => state.dealerSearchReducer.dealerData);

  const { pageNumber, totalPages, totalElements } = useSelector((state) => state.paginationReducer);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: dealerData,
  };

  return (
    <div className="container-fluid table-bordered">
      <div className="row">
        <div className="border border-dark border-2 ">
          <DealersearchFilter
            setFirstField={setFirstField}
            setSecondField={setSecondField}
            setThirdField={setThirdField}
            setFourthField={setFourthField}
          />

          <div className="row border border-dark border-1 fit-height">
            <div className="col-md-9 col-lg-9 col-9 col-lg-9 p-r-0 p-l-0">
              <div className="d-flex h-100">
                <div className="w-100">
                  <DealerListing></DealerListing>
                  <div>
                    {dealerData.length === 0 ? (
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
                    <DealerAdvanceSearch></DealerAdvanceSearch>
                  </div>
                )}
              </div>
              <div className="height-fix-2 min-h-50 row    ">
                {showAdvanceSort && (
                  <DealerAdvanceSort
                    setFirstField={setFirstField}
                    setSecondField={setSecondField}
                    setThirdField={setThirdField}
                    setFourthField={setFourthField}
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

export default DealersMainPage;
