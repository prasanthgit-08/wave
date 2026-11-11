import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TollByPlateService from "../../../../services/Invoicing/TollByPlateService";
import { updateField } from "../../../../redux/Invoicing/TollsByPlateSlice";
import { useNavigate } from "react-router-dom";
import LoadingText from "../../../common/LoadingText";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import useDebouncer from "../../../../hooks/useDebouncer";
import { getStringCombination } from "../../../../utils/utils";

const TollsByPlateSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setloading] = useState(false);

  const listingData = useSelector((state) => state.tollsByPlate.listingData);
  const pageNumber = useSelector((state) => state.tollsByPlate.pageNumber);
  const sortValue = useSelector((state) => state.tollsByPlate.sortValue);
  const sortType = useSelector((state) => state.tollsByPlate.sortType);
  const selectedPlate = useSelector((state) => state.tollsByPlate.selectedPlate);
  const selectedDescription = useSelector((state) => state.tollsByPlate.selectedDescription);
  const selectedSource = useSelector((state) => state.tollsByPlate.selectedSource);
  const selectedDriverFK = useSelector((state) => state.tollsByPlate.selectedDriverFK);
  const plateNumber = useSelector((state) => state.tollsByPlate.plateNumber);

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const handleNormalSort = (val, data) => {
    updateData("sortValue", val);
    updateData("sortType", data);
  };

  const fetchListingData = useDebouncer((val) => {
    if (val) {
      TollByPlateService.fetchList(val, pageNumber, 11, sortType, sortValue)
        .then(({ data }) => {
          const browseData = data?.slice(0, data?.length - 1); // Slice everything except the last item
          const pagination = data?.slice(data?.length - 1); // Get only the last item (or empty array if data is empty)
          updateData("totalPages", pagination[0]?.TotalPages);
          updateData("totalElements", pagination[0]?.TotalElements);
          updateData("listingData", browseData);
        })
        .catch()
        .finally(() => {
          setloading(false);
        });
    } else {
      setloading(false);
      updateData("totalPages", 0);
      updateData("totalElements", 0);
      updateData("listingData", []);
    }
  }, 300);

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      fetchListingData(plateNumber);
    }, 50);
  }, [plateNumber, sortType, sortValue, pageNumber]);

  const resetSelection = () => {
    updateData("selectedPlate", "");
    updateData("selectedDescription", "");
    updateData("selectedSource", "");
    updateData("selectedDriver", "");
    updateData("selectedDriverFK", "");
  };

  return (
    <div className="fixTableHead ">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                handleNormalSort("Plate", !sortType);
              }}
              className="f-w-600"
            >
              Plate
              {sortType && sortValue === "Plate" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Plate" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              onClick={() => {
                handleNormalSort("Description", !sortType);
              }}
              className="f-w-600"
            >
              Description{" "}
              {sortType && sortValue === "Description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => {
                handleNormalSort("Source", !sortType);
              }}
              className="f-w-600"
            >
              Source{" "}
              {sortType && sortValue === "Source" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Source" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => {
                handleNormalSort("Driver", !sortType);
              }}
              className="f-w-600"
            >
              Driver{" "}
              {sortType && sortValue === "Driver" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Driver" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            listingData.map((item) => (
              <tr
                onClick={() => {
                  resetSelection();
                }}
                onDoubleClick={() => {
                  updateData("selectedPlate", item?.Plate);
                  updateData("selectedDescription", item?.Description);
                  updateData("selectedSource", item?.Source);
                  updateData("selectedDriver", item?.Driver);
                  updateData("selectedDriverFK", item?.DriverPK);
                }}
                className={
                  getStringCombination(
                    "-",
                    selectedPlate,
                    selectedDescription,
                    selectedSource,
                    selectedDriverFK
                  ) ===
                  getStringCombination("-", item?.Plate, item?.Description, item?.Source, item?.DriverPK)
                    ? "tableSelected"
                    : ""
                }
              >
                <td className="f-w-600">{item?.Plate} </td>
                <td className="f-w-600">{item?.Description} </td>
                <td className="f-w-600">{item?.Source} </td>
                <td className="f-w-600">{item?.Driver} </td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        (!listingData || listingData?.length === 0) && plateNumber && <NoRecordsMessage />
      )}
    </div>
  );
};

export default TollsByPlateSelection;
