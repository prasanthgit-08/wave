import React, { useEffect, useState } from "react";
import ButtonComponent from "../../../common/Button";
import { Col, Form, Pagination, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetFields, updateField, updateMultipleFields } from "../../../../redux/UserPermissionGroupSlice";
import UserPermissionsGroupService from "../../../../services/UserPermissionsGroupService";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
const FormHeader = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rightList = useSelector((state) => state.userPermissionGroup.rightList);
  // const currentUserName = useSelector((state) => state.userPermissionGroup.currentUserName);
  const currentUserName = localStorage.getItem("userName");

  const disableSave = useSelector((state) => state.userPermissionGroup.disableSave);
  const selectedListRight = useSelector((state) => state.userPermissionGroup.selectedListRight);
  const [listingData, setListingData] = useState([]);
  const [copyUserID, setCopyUserID] = useState("");
  const [copyUserName, setCopyUserName] = useState("");
  const [disableDown, setDisableDown] = useState(true);
  const [disableUp, setDisableUp] = useState(true);
  const [showCopy, setShowCopy] = useState(false);

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const moveObject = (direction) => {
    let newList = [...rightList];
    const selectedIndexes = newList
      .map((item, index) => (selectedListRight.includes(item.PermissionGroupPK) ? index : -1))
      .filter((index) => index !== -1);
    if (selectedIndexes.length === 0) return newList;
    if (direction === "up") {
      if (selectedIndexes[0] === 0) return newList;

      for (let i = 0; i < selectedIndexes.length; i++) {
        const index = selectedIndexes[i];
        [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];
      }
    } else if (direction === "down") {
      if (selectedIndexes[selectedIndexes.length - 1] === newList.length - 1) return newList;
      for (let i = selectedIndexes.length - 1; i >= 0; i--) {
        const index = selectedIndexes[i];
        [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
      }
    }
    newList = newList.map((item, idx) => ({
      ...item,
      sequence: idx + 1,
    }));
    console.table("newList", newList);
    return newList;
  };
  const handleMoveUp = () => {
    const updatedList = moveObject("up");
    updateData("rightList", updatedList);
  };
  const handleMoveDown = () => {
    const updatedList = moveObject("down");
    updateData("rightList", updatedList);
  };

  useEffect(() => {
    if (!selectedListRight || selectedListRight?.length <= 0) {
      setDisableDown(true);
      setDisableUp(true);
    } else {
      if (selectedListRight?.length === rightList?.length) {
        setDisableDown(true);
        setDisableUp(true);
      } else if (selectedListRight?.length === 1) {
        setDisableDown(false);
        setDisableUp(false);
        const index = rightList.findIndex((item) => item.PermissionGroupPK === selectedListRight[0]);
        if (index === 0) {
          setDisableUp(true);
        }
        if (index === rightList.length - 1) {
          setDisableDown(true);
        }
      } else {
        setDisableDown(false);
        setDisableUp(false);
      }
    }
  }, [selectedListRight, rightList]);

  const handleSave = () => {
    UserPermissionsGroupService.save(rightList, id).then(({ data }) => {
      toast.success("Save successful.");
      if (data.response) {
        setTimeout(() => {
          navigate(`/user-maintenance/${id}`);
        }, 20);
        dispatch(resetFields());
      } else {
        toast.error("Error while saving");
      }
    });
  };

  const copyUserPermission = () => {
    updateData("loading", true);
    UserPermissionsGroupService.requestData("Copy", [], [], [], 0, [], copyUserID, id)
      .then(({ data }) => {
        updateData("disableSave", false);
        const list = data.response.data;
        const saveList = list.filter((item) => item.Action === "Save").map((item) => item.PermissionGroupFK);

        const deleteList = list
          .filter((item) => item.Action === "Delete")
          .map((item) => item.PermissionGroupFK);
        //   setListingData(data.response.data)
        //  const values = data?.response?.data.map(item => item.PermissionGroupFK);
        // updateData('saveList',saveList||[])
        // updateData('deleteList',deleteList||[])
        const update = {
          saveList: saveList || [],
          deleteList: deleteList || [],
        };
        dispatch(updateMultipleFields(update));
      })
      .catch()
      .finally(() => {});
  };

  const onHandleCopyNo = () => {
    setShowCopy(false);
  };

  const onHandleCopyYes = () => {
    copyUserPermission();
    setShowCopy(false);
  };

  useEffect(() => {
    if (id != null && id != undefined && id != 0) {
      UserPermissionsGroupService.requestData("User", [], [], [], 0, [], 0, id).then(({ data }) => {
        setListingData(data?.response?.data);
        //  const values = data?.response?.data.map(item => item.PermissionGroupFK);
        //  updateData('initialList',values||[])
      });
    }
  }, [id]);

  useEffect(() => {
    const copyUser = listingData.filter((user) => user.UserPK === copyUserID);
    setCopyUserName(listingData.find((user) => user.UserPK === Number(copyUserID))?.Name || "");
  }, [copyUserID]);

  return (
    <>
      {/* Top Section with Copy User & Buttons */}
      <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap">
        {/* Left Section */}
        <div className="d-flex align-items-center flex-wrap">
          <Form.Group
            className="mt-0 m-l-0 m-r-0"
            style={{ display: "flex", alignItems: "center", width: "450px" }}
          >
            <Form.Label className="col-form-label dealer-label m-0 w-150px">Copy From User</Form.Label>

            <Form.Select
              className="customFormControl ml-2"
              name="CopyUser"
              value={copyUserID}
              onChange={(e) => setCopyUserID(e.target.value)}
            >
              <option value="">Select</option>
              {listingData?.map((item) => (
                <option key={item.UserPK} value={item.UserPK}>
                  {item.Name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Copy Button */}
          <button
            disabled={!copyUserID}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              if (copyUserID) {
                // copyUserPermission()
                setShowCopy(true);
              }
            }}
          >
            Copy
          </button>
        </div>
        {/* Pagination Section Below */}
        <div className="d-flex align-items-center justify-content-center p-t-10 p-b-5 p-l-40">
          <Pagination>
            <Pagination.Prev
              style={
                disableUp ? { pointerEvents: "none", opacity: 0.3 } : { pointerEvents: "fill", opacity: 1 }
              }
              className="prev-page"
              onClick={handleMoveUp}
            />
            <Pagination.Last
              style={
                disableDown ? { pointerEvents: "none", opacity: 0.3 } : { pointerEvents: "fill", opacity: 1 }
              }
              onClick={handleMoveDown}
              className="next-page"
            />
          </Pagination>
        </div>
        {/* Right-Aligned Buttons (Save & Close) */}
        <div
          className="d-flex align-items-center justify-content-end flex-wrap"
          style={{ marginLeft: "auto" }}
        >
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            disabled={disableSave}
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              navigate(`/user-maintenance/${id}`);
              dispatch(resetFields());
              toast.success("Page Closed");
            }}
          >
            Close
          </button>
        </div>
        <ModalComponent
          show={showCopy}
          onHide={onHandleCopyNo}
          title={"Confirm Copy"}
          body={`Please confirm you want to copy the Permission from ${copyUserName} to ${currentUserName}.`}
          handleYES={onHandleCopyYes}
          handleNO={onHandleCopyNo}
        />
      </div>
    </>
  );
};

export default FormHeader;
