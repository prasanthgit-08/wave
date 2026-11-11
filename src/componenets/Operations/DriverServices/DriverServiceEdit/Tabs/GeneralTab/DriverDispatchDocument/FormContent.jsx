import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { PaginationComponent } from "../../../../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanyFK,
  setListingData,
  setLoader,
  setPageNumber,
  setSelectedId,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../../../../redux/DispatchDocumentSlice";
import TableListing from "./TableListing";
import DispatchDocumentsService from "../../../../../../../services/DispatchDocumentsService";
import { useParams } from "react-router-dom";
import useDebouncer from "../../../../../../../hooks/useDebouncer";

const FormContent = () => {
  const dispatch = useDispatch();
  const { driverId } = useParams();

  const listingData = useSelector((state) => state.dispatchDocuments.listingData);
  const totalPages = useSelector((state) => state.dispatchDocuments.totalPages);
  const totalElements = useSelector((state) => state.dispatchDocuments.totalElements);
  const pageNumber = useSelector((state) => state.dispatchDocuments.pageNumber);
  const sortFlag = useSelector((state) => state.dispatchDocuments.sortFlag);
  const sortValue = useSelector((state) => state.dispatchDocuments.sortValue);
  const companyFK = useSelector((state) => state.dispatchDocuments.companyFK);
  const loader = useSelector((state) => state.dispatchDocuments.loader);

  const [companyNames, setCompanyNames] = useState([]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  const getAllCompanyNames = () => {
    DispatchDocumentsService.getAllCompanyNames()
      .then((response) => {
        const data = response.data;
        setCompanyNames(data);
        const objectWithBitTrue = data.find((item) => item.localCompany === true);
        if (objectWithBitTrue) {
          dispatch(setCompanyFK(objectWithBitTrue?.companyPK));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchDispatchDocuments = () => {
    if (companyFK) {
      dispatch(setLoader(true));
      DispatchDocumentsService.fetchDispatchDocumentsData(
        pageNumber,
        driverId,
        sortValue,
        sortFlag,
        companyFK
      )
        .then(({ data }) => {
          const paginationData = data?.slice(data.length - 1);
          const browseData = data?.slice(0, data.length - 1);
          dispatch(setListingData(browseData));
          dispatch(setTotalElements(paginationData[0].TotalElements));
          dispatch(setTotalPages(paginationData[0].TotalPages));
          dispatch(setLoader(false));
        })
        .catch((err) => {
          dispatch(setListingData(null));
          dispatch(setLoader(false));
          console.log("Error ", err);
        })
        .finally(() => dispatch(setLoader(false)));
    }
  };

  const debouncerFetchDispatchDocuments = useDebouncer(fetchDispatchDocuments, 500);

  useEffect(() => {
    getAllCompanyNames();
  }, []);

  useEffect(() => {
    if (companyFK) {
      dispatch(setLoader(true));
      debouncerFetchDispatchDocuments();
    }
  }, [pageNumber, sortValue, sortFlag, companyFK]);

  useEffect(() => {
    dispatch(setPageNumber(0));
    dispatch(setSortFlag(false));
    dispatch(setSortValue(null));
    dispatch(setSelectedId(null));
  }, [companyFK]);

  return (
    <div div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight" style={{ height: "428px" }}>
        <Row className="m-0 p-10">
          <Col sm={6} md={6} lg={6} xl={6} xs={6}>
            <Form.Group className=" mt-5 form-group m-b-15 align-items-center row m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-15" style={{ textAlign: "right", marginRight: "15px" }}>
                <Form.Label className="customColFormLabel">Company</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0 d-flex" style={{ width: "275px" }}>
                <Form.Select
                  className="customFormControl"
                  value={companyFK}
                  onChange={(e) => {
                    dispatch(setCompanyFK(e.target.value));
                  }}
                >
                  {companyNames.map((item) => (
                    <option value={item.companyPK} key={item.companyPK}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
          </Col>

          <div className="h-400px mt-4 mx-2">
            <div className="d-flex border border-1 border-dark">
              <div className="flex-grow-1" style={{ height: "260px" }}>
                <TableListing />
              </div>

              <PaginationComponent
                {...paginationProps}
                loading={loader}
                firstPage
                lastPage
                singleArrowUp
                singleArrowDown
                recordsPerPage={6}
              />
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default FormContent;
