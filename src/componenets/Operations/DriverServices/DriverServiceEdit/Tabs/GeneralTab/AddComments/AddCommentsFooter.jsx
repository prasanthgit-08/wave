// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import DriverCheckinService from "../../../../../../../services/DriverCheckinService";
// import toast from "react-hot-toast";
// import { setCommentsClearBit } from "../../../../../../../redux/DriverCheckinSlice";

// const AddCommentsFooter = () => {
//   const { driverId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const commentsData = useSelector((state) => state.driverCheckinReducer.commentsData);
//   const disableSave = useSelector((state) => state.driverCheckinReducer.disableSave);
//   const commentsClearBit = useSelector((state) => state.driverCheckinReducer.commentsClearBit);

//   const [loading, setLoading] = useState(false);

//   /**Create comments record in Driver Checkin Table */
//   const handleSave = () => {
//     setLoading(true);
//     DriverCheckinService.saveCommentsDriverService(commentsData)
//       .then((response) => {
//         dispatch(setCommentsClearBit(true));
//         navigate(`/add-comments/${driverId}`);
//         toast.success("Comment Added");
//       })
//       .catch((error) => {
//         navigate(`/add-comments/${driverId}`);
//         dispatch(setCommentsClearBit(true));
//         toast.error("Failed to Create Comments");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };
//   return (
//     <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
//       <div className="d-flex align-items-center flex-wrap m-r-10"></div>
//       <div className="d-flex align-items-center flex-wrap">
//         <button
//           className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
//           type=""
//           disabled={disableSave}
//           onClick={handleSave}
//         >
//           Save
//         </button>
//         {loading && (
//           <div className="fade modal-backdrop show">
//             <div className="pos-center">
//               <div className="loader"></div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddCommentsFooter;
