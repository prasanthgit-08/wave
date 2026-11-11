import React, { useEffect, useState } from "react";
import DateInputField from "../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import PurgeDamageReturnUnitsService from "../../../../services/PurgeDamageReturnUnitsService";
import {
  resetPurgeClear,
  resetPurgeDamage,
  setCompanyFK,
  setListingData,
  setLoader,
  setNavigateByNextButton,
  setSelectId,
  setSpResponseData,
  setTotalElements,
  setTotalPages,
  setUpdateFlag,
} from "../../../../redux/PurgeDamageReturnUnitsSlice";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIcon from "../../../common/LoadingIcon";
import toast from "react-hot-toast";

const PageConfirmationContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // For corresponding dispatchPK

  const [loading, setLoading] = useState(true);

  const listingData = useSelector((state) => state.purgeDamageReturnUnits.listingData);
  const totalPages = useSelector((state) => state.purgeDamageReturnUnits.totalPages);
  const totalElements = useSelector((state) => state.purgeDamageReturnUnits.totalElements);
  const pageNumber = useSelector((state) => state.purgeDamageReturnUnits.pageNumber);
  const sortFlag = useSelector((state) => state.purgeDamageReturnUnits.sortFlag);
  const sortValue = useSelector((state) => state.purgeDamageReturnUnits.sortValue);
  const unitNumberLast5 = useSelector((state) => state.purgeDamageReturnUnits.unitNumberLast5);
  const unitNumberPK = useSelector((state) => state.purgeDamageReturnUnits.unitNumberPK);
  const unitNumberInput = useSelector((state) => state.purgeDamageReturnUnits.unitNumberInput);
  const unitDetails = useSelector((state) => state.purgeDamageReturnUnits.unitDetails);
  const selectId = useSelector((state) => state.purgeDamageReturnUnits.selectId);
  const updateFlag = useSelector((state) => state.purgeDamageReturnUnits.updateFlag);
  const spResponseData = useSelector((state) => state.purgeDamageReturnUnits.spResponseData);
  const selectionType = useSelector((state) => state.purgeDamageReturnUnits.selectionType);
  const navigateByNextButton = useSelector((state) => state.purgeDamageReturnUnits.navigateByNextButton);
  const [companyNames, setCompanyNames] = useState([]);
  const companyPK = useSelector((state) => state.purgeDamageReturnUnits.companyFK);
  const currentCompanyName = useSelector((state) => state.purgeDamageReturnUnits.currentCompanyName);

  const fetchDispatchDocumentsByID = () => {
    PurgeDamageReturnUnitsService.getPurgeDamageReturnRecords(
      "",
      "",
      0,
      sortValue,
      sortFlag,
      selectionType,
      id,
      updateFlag,
      "",
      "",
      companyPK
    )
      .then(({ data }) => {
        dispatch(setListingData(data?.content[0]));
        dispatch(setTotalElements(data?.totalElements));
        dispatch(setTotalPages(data?.totalPages));
        dispatch(setLoader(false));
        dispatch(setSpResponseData(data?.content[0]?.spResponseData));
        if (data?.content[0]?.spResponseData === 1) {
          navigate(`/purge-damage-return`);
        }
      })
      .catch((err) => {
        dispatch(setListingData(null));
        console.log("Error ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (navigateByNextButton === false) {
      dispatch(resetPurgeDamage());
      navigate(`/purge-damage-return`);
    }
  }, []);

  useEffect(() => {
    fetchDispatchDocumentsByID();
    if (updateFlag === 1) {
      {
        loading && <LoadingIcon />;
      }
      toast.success("Purge successfully completed");

      dispatch(resetPurgeClear());
      dispatch(setNavigateByNextButton(false));

      dispatch(setSelectId(null));
      dispatch(setNavigateByNextButton(false));
      dispatch(setUpdateFlag(0));

      setTimeout(() => {
        navigate(`/purge-damage-return`);
      }, 5);
    }
  }, [updateFlag]);

  return (
    <div className="p-2">
      <div className=" shadow-sm rounded border" style={{ height: "430px" }}>
        {/* {!loading&&    */}
        <div className="d-flex gap-2 ps-2 ">
          <div className="col-6 mt-5">
            <div className="d-flex align-items-center mb-3">
              <div className="col-3 ">Unit Number</div>
              <div className="col-7 d-flex" style={{ width: "200px" }}>
                <input
                  className="form-controlDriverService"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.unitNumber ? listingData.unitNumber : ""}
                  disabled
                  id="unitNumber"
                />
              </div>
            </div>

            <div className="d-flex align-items-center mb-3">
              <div className="col-3 ">Model</div>
              <div className="col-7" style={{ width: "200px" }}>
                <input
                  className="form-controlDriverService"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.model ? listingData.model : ""}
                  onChange={(e) => {}}
                  disabled
                  id="model"
                />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="col-3 ">VIN</div>
              <div className="col-2 " style={{ width: "200px" }}>
                {" "}
                <input
                  className={`form-controlDriverService `}
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.vin ? listingData.vin : ""}
                  onInput={(e) => {}}
                  disabled
                  id=""
                />
              </div>
            </div>
            <div className={`d-flex align-items-center mb-3 `}>
              <div className="col-3 ">Unit Type</div>
              <div className="col-2 " style={{ width: "200px" }}>
                {" "}
                <input
                  className="form-controlDriverService"
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.unitType ? listingData.unitType : ""}
                  onChange={(e) => {}}
                  disabled
                  id="currentAmount"
                />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="col-3 ">Special Code</div>
              <div className="col-2 " style={{ width: "200px" }}>
                {" "}
                <input
                  className="form-controlDriverService"
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.specialCode ? listingData.specialCode : ""}
                  onInput={(e) => {}}
                  disabled
                  id="specialCode"
                />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="col-3 ">Driver</div>
              <div className="col-2 " style={{ width: "300px" }}>
                {" "}
                <input
                  className="form-controlDriverService"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.driverName ? listingData.driverName : ""}
                  onInput={(e) => {}}
                  disabled
                  id="driver"
                />
              </div>
            </div>
          </div>
          <div className="col-6 p-0 mt-2">
            <div className="d-flex align-items-center mb-3">
              <div className="col-3 ">Customer</div>
              <div className=" " style={{ width: "250px" }}>
                {" "}
                <input
                  className={`form-controlDriverService `}
                  type="text"
                  maxLength={5}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.customerName ? listingData.customerName : ""}
                  onChange={(e) => {}}
                  disabled
                  id="percentage"
                />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="col-3 ">{/* Columname Hide */}</div>
              <div className=" " style={{ width: "250px" }}>
                {" "}
                <input
                  className={`form-controlDriverService `}
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.city ? listingData.city : ""}
                  onInput={(e) => {}}
                  disabled
                  id="mileageRate"
                />
              </div>
              <div className="ps-2" style={{ width: "50px" }}>
                {" "}
                <input
                  className={`form-controlDriverService `}
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.stateCode ? listingData.stateCode : ""}
                  onInput={(e) => {}}
                  disabled
                  id="mileageRate"
                />
              </div>
            </div>

            <div className="d-flex align-items-center mb-3">
              <div className="col-3 ">Pickup</div>
              <div className=" " style={{ width: "250px" }}>
                {" "}
                <input
                  className={`form-controlDriverService `}
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.pickUpName ? listingData.pickUpName : ""}
                  onInput={(e) => {}}
                  disabled
                  id="mileageRate"
                />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="col-3 ">{/* Column name1 */}</div>
              <div className=" " style={{ width: "250px" }}>
                {" "}
                <input
                  className={`form-controlDriverService `}
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.pickUpAddress1 ? listingData.pickUpAddress1 : ""}
                  onInput={(e) => {}}
                  disabled
                  id="mileageRate"
                />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="col-3 ">{/* Column Name2 */}</div>
              <div className=" " style={{ width: "250px" }}>
                {" "}
                <input
                  className={`form-controlDriverService `}
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.pickUpAddress2 ? listingData.pickUpAddress2 : ""}
                  onInput={(e) => {}}
                  disabled
                  id="mileageRate"
                />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="col-3 ">{/* Column Name3 */}</div>
              <div className=" " style={{ width: "250px" }}>
                {" "}
                <input
                  className={`form-controlDriverService `}
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.pickUpCity ? listingData.pickUpCity : ""}
                  onInput={(e) => {}}
                  disabled
                  id="mileageRate"
                />
              </div>
              <div className="ps-2" style={{ width: "50px" }}>
                {" "}
                <input
                  className={`form-controlDriverService `}
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.pickUpStateCode ? listingData.pickUpStateCode : ""}
                  onInput={(e) => {}}
                  disabled
                  id="mileageRate"
                />
              </div>
            </div>

            <div className="d-flex align-items-center mb-3">
              <div className="col-3 ">Delivery</div>
              <div className=" " style={{ width: "250px" }}>
                {" "}
                <input
                  className={`form-controlDriverService `}
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.deliveryName ? listingData.deliveryName : ""}
                  onInput={(e) => {}}
                  disabled
                  id="mileageRate"
                />
              </div>
            </div>

            <div className="d-flex align-items-center mb-3">
              <div className="col-3 ">{/* Column Name3 */}</div>
              <div className=" " style={{ width: "250px" }}>
                {" "}
                <input
                  className={`form-controlDriverService `}
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.deliveryAddress1 ? listingData.deliveryAddress1 : ""}
                  onInput={(e) => {}}
                  disabled
                  id="mileageRate"
                />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="col-3 ">{/* Column Name3 */}</div>
              <div className=" " style={{ width: "250px" }}>
                {" "}
                <input
                  className={`form-controlDriverService `}
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.deliveryAddress2 ? listingData.deliveryAddress2 : ""}
                  onInput={(e) => {}}
                  disabled
                  id="mileageRate"
                />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="col-3 ">{/* Column Name3 */}</div>
              <div className=" " style={{ width: "250px" }}>
                {" "}
                <input
                  className={`form-controlDriverService `}
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.deliveryCity ? listingData.deliveryCity : ""}
                  onInput={(e) => {}}
                  disabled
                  id="mileageRate"
                />
              </div>

              <div className="ps-2" style={{ width: "50px" }}>
                {" "}
                <input
                  className={`form-controlDriverService `}
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={listingData?.deliveryStateCode ? listingData.deliveryStateCode : ""}
                  onInput={(e) => {}}
                  disabled
                  id="mileageRate"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <LoadingIcon />}
    </div>
  );
};

export default PageConfirmationContent;
