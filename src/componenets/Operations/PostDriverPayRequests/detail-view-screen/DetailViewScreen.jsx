import React, { useEffect, useState } from "react";
import Header from "../../../common/Header";
import { Tab, Tabs } from "react-bootstrap";
import DriversPayTab from "./DriversPayTab";
import ReimbursementTab from "./ReimbursementTab";
import CommonFooter from "../../../common/CommonFooter";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import PostpayRequestService from "../../../../services/PostpayRequestService";
import { useDispatch, useSelector } from "react-redux";
import { resetChanges, setNavigateToMainPage } from "../../../../redux/PostPayRequestSlice";
import ModalComponent from "../../../common/ModalComponent";
import LoadingIcon from "../../../common/LoadingIcon";

const DetailViewScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isPostingLoading, setIsPostingLoading] = useState(false);
  const [closeShow, setCloseShow] = useState(false);
  const navigateToMainPage = useSelector((state) => state.postPayRequestSlice.navigateToMainPage);
  const chargeDPM = useSelector((state) => state.postPayRequestSlice.chargeDPM);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;

  const handleCancel = () => {
    navigate("/post-driver-pay-requests");
  };

  const handleDenied = () => {
    navigate(`/post-driver-pay-requests/denied/${id}`);
    dispatch(setNavigateToMainPage(false));
  };

  const handlePost = async () => {
    if (!id) {
      toast.error("Invalid request ID");
      return;
    }

    setIsPostingLoading(true);
    try {
      const response = await PostpayRequestService.savePostDriverPayRequest({
        denied: false,
        deniedReason: "",
        paid: true,
        driverPayRequestsPK: parseInt(id),
        otherAmountDPM: chargeDPM,
      });

      if (response.ErrorCode === 0) {
        toast.success("Driver pay request posted successfully");
        if (response.TotalAmount < 0) {
          setCloseShow(true);
        } else {
          navigate("/post-driver-pay-requests");
        }
      } else {
        toast.error(response.ErrorMessage || "Failed to post driver pay request");
      }
    } catch (error) {
      toast.error("An error occurred while posting the request");
    } finally {
      setIsPostingLoading(false);
    }
  };

  const onHandleCloseNo = () => {
    setCloseShow(false);
    navigate("/post-driver-pay-requests");
  };

  const onHandleCloseYes = async () => {
    setCloseShow(false);
    navigate("/post-driver-pay-requests");

    try {
      const response = await PostpayRequestService.postDriverPayRequestInvoice(id);

      if (response.InvoicePK) {
        toast.success(`Invoice created with ${response.InvoiceNumber}.`);
        let emailObjectKeyList = ["HRZN_POST_DRV_UTNR", "HRZN_POST_DRV_DRNR"];
        PostpayRequestService.emailInvoiceGenerated(response.InvoicePK, emailObjectKeyList, userPK)
          .then(() => toast.success(`Email sent successfully`))
          .catch((error) =>
            console.error(`Failed to send Invoice Email for : ${response.InvoiceNumber}`, error)
          );

        navigate("/post-driver-pay-requests");
      } else {
        toast.error("Failed to create the invoice.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the invoice");
    }
  };

  useEffect(() => {
    if (navigateToMainPage) {
      navigate("/post-driver-pay-requests");
    }
  }, [navigateToMainPage, navigate]);

  return (
    <div className="add-form-component p-0 customContainer">
      {isPostingLoading && <LoadingIcon />}
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header
          closeHandler={() => {
            dispatch(setNavigateToMainPage(true));
          }}
        />
        <div className="p-2">
          <div className="shadow-sm rounded border halfScreenFormContentHeight">
            <Tabs defaultActiveKey="driversPay" id="uncontrolled-tab-example" className="m-b-2">
              <Tab title={"Drivers Pay"} eventKey="driversPay">
                <DriversPayTab />
              </Tab>

              <Tab title={"Reimbursement"} eventKey="reimbursement">
                <ReimbursementTab />
              </Tab>
            </Tabs>
          </div>
        </div>
        <CommonFooter
          buttons={[
            { label: "Post", onClick: handlePost, disabled: false },
            { label: "Denied", onClick: handleDenied, disabled: false },
            { label: "Cancel", onClick: handleCancel, disabled: false },
          ]}
        />
      </div>

      <ModalComponent
        show={closeShow}
        onHide={onHandleCloseNo}
        title="Driver Invoice for Payback Amount"
        body="Create Driver Invoice for Payback amount"
        handleYES={onHandleCloseYes}
        handleNO={onHandleCloseNo}
      />
    </div>
  );
};

export default DetailViewScreen;
