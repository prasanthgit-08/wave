import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import DriversPayTab from "./DriversPayTab";
import ReimbursementTab from "./ReimbursementTab";
import Dates from "./Dates";
import PaymentRequestService from "../../../../../../../../services/operations/PaymentRequestService";
import { useDispatch, useSelector } from "react-redux";
import {
  resetState,
  setEditFormData,
  setViewDetail,
  setActiveTab,
} from "../../../../../../../../redux/PaymentRequestSlice";

const FormContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { driverId, id } = useParams();
  const driverpayTabValid = useSelector((state) => state.paymentRequestSlice.driverpayTabValid);
  const viewDetail = useSelector((state) => state.paymentRequestSlice.viewDetail);
  const reimbursementTabValid = useSelector((state) => state.paymentRequestSlice.reimbursementTabValid);
  const dispatchId = useSelector((state) => state.paymentRequestSlice.dispatchId);
  const unitId = useSelector((state) => state.paymentRequestSlice.unitId);
  const amountValid = useSelector((state) => state.paymentRequestSlice.amountValid);
  const activeTab = useSelector((state) => state.paymentRequestSlice.activeTab);
  const changesCancelled = useSelector((state) => state.paymentRequestSlice.changesCancelled);
  const [loader, setLoader] = useState(false);

  window.addEventListener("popstate", () => {
    dispatch(resetState());

    navigate(`/payment-requests/${driverId}`);
  });

  const fetchRecord = (id) => {
    setLoader(true);

    PaymentRequestService.getById(id)
      .then((res) => {
        const data = res.data;
        dispatch(setEditFormData(data[0]));
        dispatch(setViewDetail(true));
      })
      .catch((err) => {
        navigate(`/payment-requests/${driverId}`);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    if (id) {
      fetchRecord(id);
    }
  }, [id]);

  return (
    <div className={`add-form-component p-0 `}>
      <div className="border border  halfScreenWidth">
        {/* <Header /> */}
        <div className="p-2">
          <div className={`shadow-sm rounded border halfScreenFormContentHeight`}>
            {loader ? ( //  this was missing in your code
              <div className="fade modal-backdrop show">
                <div className="pos-center">
                  <div className="loader"></div>
                </div>
              </div>
            ) : (
              <Tabs
                defaultActiveKey="driversPay"
                activeKey={activeTab}
                onSelect={(k) => dispatch(setActiveTab(k))}
                id="uncontrolled-tab-example"
                className="m-b-2"
              >
                <Tab
                  title={"Drivers Pay"}
                  eventKey="driversPay"
                  tabClassName={!viewDetail ? (driverpayTabValid ? "" : "color-red") : ""} // Updated tabClassName
                >
                  <DriversPayTab />
                </Tab>
                <Tab
                  title={"Reimbursement"}
                  eventKey="reimbursement"
                  tabClassName={!viewDetail && reimbursementTabValid ? "color-red" : ""}
                >
                  <ReimbursementTab />
                </Tab>

                {viewDetail && (
                  <Tab title={"Dates"} eventKey="dates">
                    <Dates />
                  </Tab>
                )}
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContent;
