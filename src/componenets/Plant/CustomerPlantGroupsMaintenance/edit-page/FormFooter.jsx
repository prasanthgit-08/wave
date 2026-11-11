import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetGroupEdit,
  setAssignedPageNo,
  setEditFormData,
  setPlantList,
  setPlantSort,
  setPlantSortValue,
  setUniqueResponse,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../redux/CustomerPlantGroupSlice";
import CustomerPlantGroupsService from "../../../../services/CustomerPlantGroupsService";
import ModalComponent from "../../../common/ModalComponent";
import { PermissionKeyGeneratorUtil } from "../../../../utils/PermissionKeyGeneratorUtil";
const FormFooter = ({ setLoading }) => {
  const { id, pageNumber } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const [disableEdit, setDisableEdit] = useState(false);
  const [disableDelete, setDisableDelete] = useState(false);
  const [disablePlant, setDisablePlant] = useState(false);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("PlantGroup", "edit");
  const deletePermission = PermissionKeyGeneratorUtil("PlantGroup", "delete");
  const editPlantPermission = PermissionKeyGeneratorUtil("PlantGroup", "EDTPLNT");

  const viewDetail = useSelector((state) => state.customerPlantGroup.viewDetail);
  const disableSave = useSelector((state) => state.customerPlantGroup.disableSave);
  const editFormData = useSelector((state) => state.customerPlantGroup.editFormData);
  const saveData = useSelector((state) => state.customerPlantGroup.saveData);
  const description = useSelector((state) => state.customerPlantGroup.description);

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      navigate("/customer-plant-group");
      dispatch(setEditFormData(null));
      dispatch(setPlantList([]));
      dispatch(resetGroupEdit());
      dispatch(setAssignedPageNo(0));
      dispatch(setPlantSort(false));
      // setLoading(true);
      dispatch(setPlantSortValue(null));
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(toggleChangesCancelled());
      dispatch(resetGroupEdit());
      toast.success("Changes Cancelled");
    } else {
      navigate("/customer-plant-group");
      dispatch(setViewDetail(false));
      dispatch(setPlantList([]));
      dispatch(setAssignedPageNo(0));
      dispatch(setPlantSort(false));
      dispatch(setPlantSortValue(null));
      dispatch(resetGroupEdit());
      dispatch(setEditFormData(null));
      toast.success("Changes Cancelled");
    }
  };
  const errorOk = () => {
    setShowError(false);
  };

  const saveOrUpdatePlantGroups = () => {
    if (!id || (id && description !== editFormData.description?.trim())) {
      CustomerPlantGroupsService.checkDescriptionExist(description)
        .then((res) => {
          dispatch(setUniqueResponse(res.data));
          if (res.data) {
            setLoad(true);
            CustomerPlantGroupsService.createPlantGroups(saveData)
              .then((response) => {
                navigate("/customer-plant-group");
                dispatch(resetGroupEdit());
                dispatch(setAssignedPageNo(0));
                dispatch(setPlantSort(false));
                dispatch(setPlantSortValue(null));
                if (id) {
                  toast.success("Customer Plant Group Updated");
                } else toast.success("Customer Plant Group Created");
              })
              .catch((error) => {
                navigate("/customer-plant-group");
                dispatch(resetGroupEdit());
                dispatch(setAssignedPageNo(0));
                dispatch(setPlantSort(false));
                dispatch(setPlantSortValue(null));
                toast.error("something went wrong");
              })
              .finally(() => {
                setLoad(false);
              });
          }
        })
        .catch((err) => {});
    } else if (id && description === editFormData.description?.trim()) {
      dispatch(setUniqueResponse(true));
      setLoad(true);
      CustomerPlantGroupsService.createPlantGroups(saveData)
        .then((response) => {
          navigate("/customer-plant-group");
          dispatch(resetGroupEdit());
          dispatch(setAssignedPageNo(0));
          dispatch(setPlantSort(false));
          dispatch(setPlantSortValue(null));
          setLoad(false);
          if (id) {
            toast.success("Customer Plant Group Updated");
          } else toast.success("Customer Plant Group Created");
        })
        .catch((error) => {
          navigate("/customer-plant-group");
          dispatch(resetGroupEdit());
          dispatch(setAssignedPageNo(0));
          dispatch(setPlantSort(false));
          dispatch(setPlantSortValue(null));
          toast.error("something went wrong");
          setLoad(false);
        });
    }
  };
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setDeleteLoader(true);
    CustomerPlantGroupsService.deleteRecord(id)
      .then((response) => {
        navigate("/customer-plant-group");
        toast.success("Customer Plant Group Deleted");
        dispatch(resetGroupEdit());
        dispatch(setAssignedPageNo(0));
        dispatch(setPlantSort(false));
        dispatch(setPlantSortValue(null));
      })
      .catch((err) => {
        setShowError(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => {
        setDeleteLoader(false);
      });
    setDeleteShow(false);
  };

  // Based on Permission & logged in user, set default user
  useEffect(() => {
    if (deniedPermissions) {
      setDisableEdit(deniedPermissions.includes(editPermission));
      setDisableDelete(deniedPermissions.includes(deletePermission));
      setDisablePlant(deniedPermissions.includes(editPlantPermission));
    }
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={disableSave}
          hidden={viewDetail}
          onClick={saveOrUpdatePlantGroups}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancel}
          hidden={false}
        >
          Cancel
        </button>
        <button
          // route={`/edit-plant-groups/plant/${id}/${pageNumber}`}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!viewDetail}
          onClick={() => {
            navigate(`/edit-plant-groups/plant/${id}/${pageNumber}`);
            dispatch(setViewDetail(false));
          }}
          disabled={disablePlant}
        >
          Plant
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!viewDetail}
          onClick={() => dispatch(setViewDetail(false))}
          disabled={disableEdit}
        >
          Edit
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!viewDetail}
          onClick={handleDelete}
          disabled={disableDelete}
        >
          Delete
        </button>
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Customer Plant Group Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer Plant Group"}
          body={"Please confirm you want to Delete this Customer Plant Group"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        <ModalComponent
          show={showError}
          onHide={errorOk}
          title={"Delete failed!"}
          body={errorMsg}
          showError
          showOK
          handleOK={errorOk}
        />{" "}
        {(load || deleteLoader) && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormFooter;
