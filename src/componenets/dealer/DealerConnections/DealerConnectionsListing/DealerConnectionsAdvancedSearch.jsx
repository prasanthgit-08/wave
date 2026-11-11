import React, { useState } from "react";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import { useDispatch, useSelector } from "react-redux";
import LookupButton from "../../../common/LookupButton";
import { Col } from "react-bootstrap";
import DealerLookup from "../../../LookupScreens/Dealer/DealerLookup";
import {
  setAdvanceSearchFK1,
  setAdvanceSearchFK2,
  setAdvanceSearchTermOne,
  setAdvanceSearchTermTwo,
  setDealerList,
  setDealerSelection1,
  setDealerSelection2,
  setPageNumber,
  setSearchTerm,
} from "../../../../redux/DealerConnectionsSearchFilterSlice";
import DealerConnectionsService from "../../../../services/DealerConnectionsService";
import { toast } from "react-hot-toast";

export default function DealerConnectionsAdvancedSearch() {
  const [dealer1Loader, setDealer1Loader] = useState(false);
  const [dealer2Loader, setDealer2Loader] = useState(false);
  const dealerList = useSelector((state) => state.dealerConnectionReducer.dealerList);
  const dealerSelection1 = useSelector((state) => state.dealerConnectionReducer.dealerSelection1);
  const dealerSelection2 = useSelector((state) => state.dealerConnectionReducer.dealerSelection2);
  const advanceSearchTermOne = useSelector((state) => state.dealerConnectionReducer.advanceSearchTermOne);
  const advanceSearchTermTwo = useSelector((state) => state.dealerConnectionReducer.advanceSearchTermTwo);
  const advanceSearchFK1 = useSelector((state) => state.dealerConnectionReducer.advanceSearchFK1);
  const advanceSearchFK2 = useSelector((state) => state.dealerConnectionReducer.advanceSearchFK2);

  const dispatch = useDispatch();

  const handleAdvanceSearch1LookUp = (dealer) => {
    dispatch(setPageNumber(0));
    dispatch(setAdvanceSearchTermOne(dealer.name));
    dispatch(setAdvanceSearchFK1(dealer.dealerPK));
    dispatch(setDealerSelection1(false));
  };

  const handleAdvanceSearch2LookUp = (dealer) => {
    dispatch(setPageNumber(0));
    dispatch(setAdvanceSearchTermTwo(dealer.name));
    dispatch(setAdvanceSearchFK2(dealer.dealerPK));
    dispatch(setDealerSelection2(false));
  };

  const fetchAdvanceSearch1 = (string) => {
    if (advanceSearchTermOne) {
      dispatch(setPageNumber(0));
    }
    setDealer1Loader(true);
    DealerConnectionsService.getDealerByName(string)
      .then((response) => {
        const data = response.data.content;
        const dealerList1 = data?.map((dealers) => ({
          ...dealers,
          name: dealers.name?.trim(),
        }));
        dispatch(setDealerList(dealerList1));
      })
      .catch(() => {
        toast.error("Something went wrong!!");
      })
      .finally(() => {
        setDealer1Loader(false);
      });
  };

  const fetchAdvanceSearch2 = (string) => {
    if (advanceSearchTermTwo) {
      dispatch(setPageNumber(0));
    }
    setDealer2Loader(true);
    DealerConnectionsService.getDealerByName(string)
      .then((response) => {
        const data = response.data.content;
        const dealerList2 = data?.map((dealers) => ({
          ...dealers,
          name: dealers.name?.trim(),
        }));
        dispatch(setDealerList(dealerList2));
      })
      .catch(() => {
        toast.error("Something went wrong!!");
      })
      .finally(() => {
        setDealer2Loader(false);
      });
  };

  return (
    <div className={"col-md-12 m-t-15 m-b-15"}>
      <form>
        {/* First Field */}
        <div className="form-group d-flex flex-column m-b-10">
          <label>Dealer #1</label>

          <Col xs={12} className="p-0 d-flex">
            <AutoCompleteDropdown
              arrayList={dealerList}
              searchString={advanceSearchTermOne}
              renderItemId={(dealer) => dealer.dealerPK}
              renderItemField={(dealer) => dealer.name}
              handleSearchString={(string) => {
                dispatch(setAdvanceSearchTermOne(string));
              }}
              fetchDataBySearchString={fetchAdvanceSearch1}
              onSelect={(dealer) => {
                dispatch(setPageNumber(0));
                dispatch(setAdvanceSearchTermOne(dealer.name));
                dispatch(setAdvanceSearchFK1(dealer.dealerPK));
              }}
              selectedId={advanceSearchFK1}
              clearInputCallback={() => {
                dispatch(setAdvanceSearchFK1(""));
                dispatch(setPageNumber(0));
              }}
              loading={dealer1Loader}
            />
            <LookupButton
              onClick={() => {
                dispatch(setDealerSelection1(true));
              }}
            />
          </Col>
        </div>

        <div className="form-group d-flex flex-column m-b-10">
          <label>Dealer #2</label>

          <Col xs={12} className="p-0 d-flex">
            <AutoCompleteDropdown
              arrayList={dealerList}
              searchString={advanceSearchTermTwo}
              renderItemId={(dealer) => dealer.dealerPK}
              renderItemField={(dealer) => dealer.name}
              handleSearchString={(string) => {
                dispatch(setAdvanceSearchTermTwo(string));
              }}
              fetchDataBySearchString={fetchAdvanceSearch2}
              onSelect={(dealer) => {
                dispatch(setPageNumber(0));
                dispatch(setAdvanceSearchTermTwo(dealer.name));
                dispatch(setAdvanceSearchFK2(dealer.dealerPK));
              }}
              selectedId={advanceSearchFK2}
              clearInputCallback={() => {
                dispatch(setPageNumber(0));
                dispatch(setAdvanceSearchFK2(""));
              }}
              loading={dealer2Loader}
            />
            <LookupButton
              onClick={() => {
                dispatch(setDealerSelection2(true));
              }}
            />
          </Col>
        </div>
        <DealerLookup
          show={dealerSelection1}
          onHide={() => {
            dispatch(setDealerSelection1(false));
          }}
          renderItemId={(dealer) => dealer.dealerPK}
          handleLookupSelection={handleAdvanceSearch1LookUp}
          MaintenanceProgram
        />
        <DealerLookup
          show={dealerSelection2}
          onHide={() => {
            dispatch(setDealerSelection2(false));
          }}
          renderItemId={(dealer) => dealer.dealerPK}
          handleLookupSelection={handleAdvanceSearch2LookUp}
          MaintenanceProgram
        />
      </form>
    </div>
  );
}
