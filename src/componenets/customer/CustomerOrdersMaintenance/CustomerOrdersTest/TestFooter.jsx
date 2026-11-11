import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomerOrdersService from "../../../../services/CustomerOrdersService";
import { setTestResponse, setTestFile } from "../../../../redux/CustomerOrdersSlice";
import toast from "react-hot-toast";
import LoadingIcon from "../../../common/LoadingIcon";

const TestFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { state } = useLocation();

  const customerOrderFK = params.id;

  const { pageNumber } = useParams();

  const fromBulkOrderEntry = state?.fromBulkOrderEntry;
  const testFile = useSelector((state) => state.customerOrdersReducer.testFile);

  const [loading, setLoading] = useState(false);
  const [disableFlag, setDisableFlag] = useState(false);
  const hasFile = testFile && testFile.file;

  useEffect(() => {
    if (window.location.pathname === `/customer-orders/test-result/${customerOrderFK}/${pageNumber}`) {
      setDisableFlag(true);
    }
  }, [window.location.pathname]);

  const handleNext = () => {
    setLoading(true);
    CustomerOrdersService.processCustomerOrderFile(testFile?.file, customerOrderFK)
      .then((res) => {
        const { data } = res;
        if (data) {
          if (data?.error.errorCode === "1") {
            toast.error(data?.error.errorMessage);
          }

          if (data?.error.errorCode === "0") {
            dispatch(setTestResponse(data?.response));
            dispatch(setTestFile([]));
            navigate(`/customer-orders/test-result/${customerOrderFK}/${pageNumber}`);
            toast.success("File Uploaded Successfully");
          }
        }
      })
      .catch((error) => {
        console.error("Error processing customer order file:", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={disableFlag}
          onClick={handleNext}
          disabled={!hasFile}
        >
          Next
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={disableFlag}
          onClick={() => {
            navigate(`/customer-orders/${customerOrderFK}/${pageNumber}`);
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!disableFlag}
          onClick={() => {
            if (fromBulkOrderEntry) {
              navigate(`/bulk-order-entry`);
            } else {
              navigate(`/customer-orders/${customerOrderFK}/${pageNumber}`);
            }
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TestFooter;
