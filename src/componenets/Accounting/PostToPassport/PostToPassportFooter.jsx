import React, { useEffect, useState } from "react";
import PostToPassportService from "../../../services/PostToPassportService";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetChanges, setBatchNumber, setPostResetFlag } from "../../../redux/PostToPassportSlice";
import DeleteComponent from "../../common/DeleteComponent";
import PreviewPopup from "../../common/PreviewPopup";
const PostToPassportFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPreview, setshowPreview] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const batchNumber = useSelector((state) => state.postToPassportReducer.batchNumber);
  const printBatch = useSelector((state) => state.postToPassportReducer.printBatch);
  const emailBatchAsPdf = useSelector((state) => state.postToPassportReducer.emailBatchAsPdf);
  const emailBatchAsExcel = useSelector((state) => state.postToPassportReducer.emailBatchAsExcel);
  const postResetFlag = useSelector((state) => state.postToPassportReducer.postResetFlag);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (batchNumber !== "" && (printBatch || emailBatchAsExcel || emailBatchAsPdf)) {
      dispatch(setPostResetFlag(false));
    } else {
      dispatch(setPostResetFlag(true));
    }
  }, [batchNumber, printBatch, emailBatchAsExcel, emailBatchAsPdf]);
  const [show, setShow] = useState(false);

  const DeletePrimaryOk = () => {
    setShow(false);
  };
  const process = () => {
    setLoad(true);
    PostToPassportService.post(batchNumber, printBatch, emailBatchAsExcel, emailBatchAsPdf).then(
      (response) => {
        setLoad(false);

        const data = response.data;

        if (data?.content && printBatch) {
          setFileContent(data?.content);
          setshowPreview(true);
          toast.success("Post to passport done sucessfully");
          dispatch(resetChanges());
        } else if (!data?.content) {
          setShow(true);
        } else {
          toast.success("Post to passport done sucessfully");
        }

        dispatch(resetChanges());
        navigate("/post-to-passport");

        getNextBatchNumberValue();
      }
    );
  };
  const getNextBatchNumberValue = () => {
    PostToPassportService.getNextBatchNumber()
      .then((response) => {
        const data = response.data;

        dispatch(setBatchNumber(data?.resultSet[0]?.NextRealworldBatch));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          disabled={postResetFlag}
          onClick={process}
        >
          Post
        </button>
      </div>
      {load && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
      <DeleteComponent
        show={show}
        onHide={DeletePrimaryOk}
        title={<span style={{ color: "red" }}>Warning:</span>}
        body={"No Invoice records are available to post"}
        handleOK={DeletePrimaryOk}
      />
      <PreviewPopup show={showPreview} onHide={() => setshowPreview(false)} base64PDF={fileContent} />
    </div>
  );
};

export default PostToPassportFooter;
