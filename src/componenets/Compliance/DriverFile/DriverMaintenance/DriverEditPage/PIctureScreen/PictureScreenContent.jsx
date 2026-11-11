import React, { useEffect, useState } from "react";
import CustomDropzone from "../../../../../common/CustomDropzone";
import { Form, Col, Row } from "react-bootstrap";
import {
  setDisplayImage,
  setPictureFile,
  setPictureFileName,
  setViewDetail,
} from "../../../../../../redux/DriverMaintenanceSlice";
import { useDispatch, useSelector } from "react-redux";
import DriverService from "../../../../../../services/DriverService";
import { useParams } from "react-router-dom";
import driverImage from "../../../../../../assets/driver.jpg";
import toast from "react-hot-toast";
/* body of PictureScreenModal - onSave / onClose close the modal */
const PictureScreenContent = ({ onSave, onClose }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  const [showImage, setShowImage] = useState(null);
  const [picture, setPicture] = useState([]);
  const documentFile = useSelector((state) => state.driverMaintenanceReducer.documentFile);
  const imageFile = useSelector((state) => state.driverMaintenanceReducer.imageFile);
  /** to create a URL for displaying an image from a file or binary data **/
  const renderImage = (file) => {
    const blob = new Blob([file], { type: "image" });
    const url = URL.createObjectURL(blob);
    if (url) return url;
    else return null;
  };

  const handleSave = () => {
    if (picture && picture.length > 0) {
      dispatch(setPictureFile(picture));
      let fileName = picture[0].name;
      if (fileName.length > 150) {
        fileName = fileName.substring(0, 150);
      }
      dispatch(setPictureFileName(fileName));
    }
    // a new picture is an edit, so an existing driver switches to edit mode
    if (id) {
      dispatch(setViewDetail(false));
    }
    onSave();

    toast.success("Picture Selected");
  };
  /***Used to display driver image */
  useEffect(() => {
    if (id) {
      if (picture && picture.length > 0 && documentFile === null) {
        setShowImage(renderImage(picture[0]));
      } else if (documentFile && picture.length === 0 && imageFile.length === 0) {
        setShowImage(documentFile);
      } else if (picture.length === 0 && documentFile === null && imageFile.length == 0) {
        setShowImage(driverImage);
      } else if (documentFile && picture.length > 0) {
        setShowImage(renderImage(picture[0]));
      } else if (documentFile && picture.length === 0 && imageFile.length > 0) {
        setShowImage(renderImage(imageFile[0]));
      } else if (picture.length === 0 && documentFile === null && imageFile.length > 0) {
        setShowImage(renderImage(imageFile[0]));
      }
    } else {
      if (picture && picture.length > 0) {
        setShowImage(renderImage(picture[0]));
      } else if (picture.length === 0 && imageFile.length === 0) {
        setShowImage(driverImage);
      } else if (picture.length === 0 && imageFile.length > 0) {
        setShowImage(renderImage(imageFile[0]));
      }
    }
  }, [id, picture, documentFile, driverImage]);
  /***Used to set picture using browse button*/
  const handleBrowseClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setPicture([selectedFile]);
    }
  };

  return (
    <div>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                  <div className="text-center" style={{ height: "150px" }}>
                    <img className="" src={showImage} alt="Driver" style={{ height: "150px" }} />
                  </div>

                  <Form.Group className="mt-0 align-items-center row m-l-0 m-r-0 m-t-25">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label" hidden>
                        {" "}
                      </Form.Label>
                    </Col>

                    <Col xs={1} sm={1} md={1} className="p-0">
                      <button
                        type="button"
                        onClick={() => handleBrowseClick()}
                        className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
                      >
                        Browse
                      </button>
                      <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => handleFileChange(e)}
                        accept="image/*"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-2  ">
                    <Col xs={3} className="p-0" />
                    <Col xs={6}>
                      <CustomDropzone
                        files={picture}
                        setFiles={(file) => setPicture(file)}
                        // hidePreview
                        maxFiles={1}
                        overWritePreviousFiles
                        fileType={"Image"}
                        height="120px"
                        customDropzoneMessage={" Drag & Drop Picture"}
                        disableOnClick
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap m-r-10"></div>
        <div className="d-flex align-items-center flex-wrap">
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type=""
            disabled={picture.length === 0}
            onClick={() => handleSave()}
          >
            Save
          </button>
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PictureScreenContent;
