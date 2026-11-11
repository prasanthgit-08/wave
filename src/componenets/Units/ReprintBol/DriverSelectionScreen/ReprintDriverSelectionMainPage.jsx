import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReprintBolService from "../../../../services/ReprintBolService";
import ReprintDriverSelectionFilter from "./ReprintDriverSelectionFilter";
import ReprintDriverSelectionContent from "./ReprintDriverSelectionContent";
import ReprintDriverSelectionFooter from "./ReprintDriverSelectionFooter";
import {
  resetOutputconfirmationScreen,
  setDispatchId,
  setDriverData,
  setNextEnabled,
  setTotalPages,
} from "../../../../redux/ReprintBolSlice";
import { useNavigate } from "react-router-dom";

function ReprintDriverSelectionMainPage() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [nameFirst, setNameFirst] = useState("");
  const [nameSecond, setNameSecond] = useState("");

  const handleClose = () => {
    setNameFirst("");
    setNameSecond("");
    dispatch(resetOutputconfirmationScreen());
  };

  const searchCriteria = useSelector((state) => state.reprintBolReducer.searchCriteria);
  const firstName = useSelector((state) => state.reprintBolReducer.firstName);
  const lastName = useSelector((state) => state.reprintBolReducer.lastName);
  const activeString = useSelector((state) => state.reprintBolReducer.activeString);
  const sortValue = useSelector((state) => state.reprintBolReducer.sortValue);
  const sortType = useSelector((state) => state.reprintBolReducer.sortType);
  const pageNumber = useSelector((state) => state.reprintBolReducer.pageNumber);
  const driverStatus = useSelector((state) => state.reprintBolReducer.driverStatus);
  const driverId = useSelector((state) => state.reprintBolReducer.driverId);
  const rePrintBOL = useSelector((state) => state.reprintBolReducer.rePrintBOL);
  const navigate = useNavigate();

  const fetchDriver = () => {
    setLoader(true);
    dispatch(setDriverData([]));
    dispatch(setTotalPages(0));
    ReprintBolService.getDriverSelection({
      searchCriteria,
      pageNumber,
      firstName,
      lastName,
      activeString,
      sortValue,
      sortType,
      driverStatus,
    })
      .then((res) => {
        const { data } = res;

        if (data) {
          const driverList = data?.slice(0, data.length - 1) || [];
          const totalPages = data[data.length - 1]?.TotalPages || 0;

          dispatch(setDriverData(driverList));
          dispatch(setTotalPages(totalPages));

          if (driverId) {
            const selectedDriver = driverList.find((d) => d.DriverPK === driverId);

            if (selectedDriver) {
              dispatch(setNextEnabled(selectedDriver.T_Enabled));
              dispatch(setDispatchId(selectedDriver.DispatchPK));
            } else {
              dispatch(setNextEnabled(null));
            }
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    if (!rePrintBOL) {
      navigate("/reprint-selection-screen");
    }
  }, [rePrintBOL]);

  useEffect(() => {
    fetchDriver();
  }, [searchCriteria, firstName, lastName, activeString, sortValue, sortType, pageNumber, driverId]);

  return (
    <div className="customContainer">
      <div
        className="add-form-component quarterScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <ReprintDriverSelectionFilter />
        <ReprintDriverSelectionContent
          loader={loader}
          nameFirst={nameFirst}
          setNameFirst={setNameFirst}
          nameSecond={nameSecond}
          setNameSecond={setNameSecond}
        />
        <ReprintDriverSelectionFooter handleClose={handleClose} />
      </div>
    </div>
  );
}

export default ReprintDriverSelectionMainPage;
