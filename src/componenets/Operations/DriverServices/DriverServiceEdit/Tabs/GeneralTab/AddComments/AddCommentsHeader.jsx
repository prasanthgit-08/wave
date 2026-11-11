// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import ModalComponent from "../../../../../../common/ModalComponent";
// import { setCommentsClearBit } from "../../../../../../../redux/DriverCheckinSlice";

// const AddCommentsHeader = () => {
//   const { driverId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [closeShow, setCloseShow] = useState(false);

//   // Current field values
//   const commentsData = useSelector((state) => state.driverCheckinReducer.commentsData);

//   const onHandleCloseShow = () => {
//     const comment1 = (commentsData?.commenttext1 || "").trim();
//     const comment2 = (commentsData?.commenttext2 || "").trim();
//     const notes = (commentsData?.notes || "").trim();

//     const hasChanges = comment1 !== "" || comment2 !== "" || notes !== "";

//     if (hasChanges) {
//       setCloseShow(true);
//     } else {
//       navigate(`/driver-service-selection/${driverId}/form`);
//       toast.success("Page Closed");
//     }
//   };

//   const onHandleCloseNo = () => {
//     setCloseShow(false);
//   };

//   const onHandleCloseYes = () => {
//     dispatch(setCommentsClearBit(true));
//     setCloseShow(false);
//     navigate(`/driver-service-selection/${driverId}/form`);
//     toast.success("Page Closed");
//   };

//   return (
//     <div>
//       <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
//         <button
//           className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
//           type="button"
//           onClick={onHandleCloseShow}
//         >
//           Close
//         </button>
//       </div>

//       <ModalComponent
//         show={closeShow}
//         onHide={onHandleCloseNo}
//         title={"Close Add Comment"}
//         body="Please confirm you want to close the program without saving your changes"
//         handleYES={onHandleCloseYes}
//         handleNO={onHandleCloseNo}
//       />
//     </div>
//   );
// };

// export default AddCommentsHeader;
