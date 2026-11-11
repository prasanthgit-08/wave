import React, { useEffect, useState } from "react";
import PostCheckService from "../../../services/PostCheckService";
import { useSelector } from "react-redux";
import { setEditData, setReimbursement, setTaxable, setSaveFlag } from "../../../redux/PostCheckSlice";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PreviewPopup from "../../common/PreviewPopup";
const PostCheckFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [showPreview, setshowPreview] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [disablePost, setDisablePost] = useState(true);
  const {
    taxableBeginningDate,
    taxableEndingDate,
    taxableBeginningCheckNumber,
    taxableEndingCheckNumber,
    reimbursementBeginningDate,
    reimbursementEndingDate,
    reimbursementBeginningCheckNumber,
    reimbursementEndingCheckNumber,
    saveFlag,
    reimbursementPrintBatch,
    reimbursementEmailBatchAsPDF,
    reimbursementEmailBatchAsExcel,
    taxablePrintBatch,
    taxableEmailBatchAsPDF,
    taxableEmailBatchAsExcel,
  } = useSelector((state) => state.postCheckReducer);

  const onPost = () => {
    setLoad(true);
    PostCheckService.getPostCheckData(
      taxableBeginningCheckNumber,
      taxableEndingCheckNumber,
      taxableBeginningDate,
      taxableEndingDate,

      reimbursementBeginningCheckNumber,
      reimbursementEndingCheckNumber,
      reimbursementBeginningDate,
      reimbursementEndingDate,

      1,
      reimbursementPrintBatch,
      reimbursementEmailBatchAsPDF,
      reimbursementEmailBatchAsExcel,
      taxablePrintBatch,
      taxableEmailBatchAsPDF,
      taxableEmailBatchAsExcel
    )
      .then((response) => {
        setLoad(false);
        const data = response.data;
        if (data?.fileContent) {
          setFileContent(response.data.fileContent);
          setshowPreview(true);
        }
        navigate("/post-check");
        toast.success("Records Posted");
        dispatch(setTaxable(false));
        dispatch(setReimbursement(false));
        dispatch(setEditData(null));
      })
      .catch((error) => {
        setLoad(false);
        navigate("/post-check");
        toast.error("Failed to post records.");
        console.log(error);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type=""
          onClick={onPost}
          disabled={saveFlag}
        >
          Post
        </button>
        {load && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
        <PreviewPopup show={showPreview} onHide={() => setshowPreview(false)} base64PDF={fileContent} />
      </div>
    </div>
  );
};

export default PostCheckFooter;
