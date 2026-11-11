// import React, { useEffect, useState } from "react";
// import { Col, Form } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import styles from "../../../../../../../styles/ThreeQuarterScreen.module.css";
// import {
//   setCommentsClearBit,
//   setCommentsData,
//   setDisableSave,
// } from "../../../../../../../redux/DriverCheckinSlice";

// const AddCommentsContent = () => {
//   const { driverId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [commenttext1, setCommenttext1] = useState("");
//   const [commenttext2, setCommenttext2] = useState("");
//   const [notes, setNotes] = useState("");
//   const commentsClearBit = useSelector((state) => state.driverCheckinReducer.commentsClearBit);

//   /**Data to set the Add comments */
//   useEffect(() => {
//     dispatch(
//       setCommentsData({
//         driverId: parseInt(driverId),
//         commenttext1: commenttext1,
//         commenttext2: commenttext2 ? commenttext2 : null,
//         notes: notes,
//       })
//     );
//   }, [commenttext1, commenttext2, notes]);
//   /******Clear the Add ******/
//   useEffect(() => {
//     if (commentsClearBit) {
//       setCommenttext1("");
//       setCommenttext2("");
//       setNotes("");
//       dispatch(setCommentsClearBit(false));
//     }
//   }, [commentsClearBit, driverId]);

//   /**Save validation */
//   useEffect(() => {
//     if (commenttext1 && commenttext1.length >= 1) {
//       /** Enable save button on condition*/
//       dispatch(setDisableSave(false));
//     } else {
//       /** Disable save button condition*/
//       dispatch(setDisableSave(true));
//     }
//   }, [commenttext1]);

//   return (
//     <div className="w-100 p-2">
//       <div className="shadow-sm rounded border quarterScreenFormContentHeight">
//         <div className="m-b-10">
//           <div className="p-15 w-100">
//             <Col xs={12} className="ps-3">
//               <div className="mt-5"> {/* Div wrapper with margin-top*/}</div>
//               <Form.Group className={`mt-1 m-b-10 align-items-start row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
//                 <Col sm={1} md={1} xs={1} className="p-0">
//                   <Form.Label htmlFor="name" className="col-form-label dealer-label">
//                     Comment
//                   </Form.Label>
//                 </Col>

//                 <Col xs={4} md={4} className="p-0 me-2">
//                   <input
//                     name="commenttext1"
//                     type="text"
//                     className={`${styles.formControl} ${commenttext1 ? "borderGreen" : "borderRed"}`}
//                     maxLength={21}
//                     control="input"
//                     id="commenttext1"
//                     value={commenttext1}
//                     onChange={(e) => {
//                       setCommenttext1(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
//                     }}
//                     autoComplete="newpassword"
//                     aria-autocomplete="none"
//                   />
//                 </Col>
//                 <Col xs={6} md={6} className="p-0 me-2">
//                   <input
//                     name="commenttext2"
//                     type="text"
//                     className={`${styles.formControl} `}
//                     maxLength={45}
//                     control="input"
//                     id="commenttext2"
//                     value={commenttext2}
//                     onChange={(e) => {
//                       setCommenttext2(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
//                     }}
//                     autoComplete="newpassword"
//                     aria-autocomplete="none"
//                   />
//                 </Col>
//               </Form.Group>
//               <Form.Group className={`mt-1 m-b-10 align-items-start row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
//                 <Col sm={1} md={1} xs={1} className="p-0">
//                   <Form.Label htmlFor="name" className="col-form-label dealer-label">
//                     Notes
//                   </Form.Label>
//                 </Col>

//                 <Col xs={10} md={10} className="p-0 me-2">
//                   <textarea
//                     rows={6}
//                     cols={13}
//                     type="text"
//                     className={`${styles.formControl} h-100 w-150 `}
//                     id="notes"
//                     name="notes"
//                     value={notes}
//                     onChange={(e) => {
//                       setNotes(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
//                     }}
//                     autoComplete="off"
//                     aria-autocomplete="list"
//                   />
//                 </Col>
//               </Form.Group>
//             </Col>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCommentsContent;
