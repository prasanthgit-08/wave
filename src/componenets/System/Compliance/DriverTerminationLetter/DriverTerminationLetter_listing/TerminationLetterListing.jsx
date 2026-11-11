import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DriverTerminationLetterService from "../../../../../services/DriverTerminationLetterService";
import {
  setChangeColor,
  setId,
  setLetterListingData,
  setSort,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../../redux/DriverTerminationLetterSlice";
import LoadingText from "../../../../common/LoadingText";

const TerminationLetterListing = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pageNumber = useSelector((state) => state.driverTerminationLetterReducer.pageNumber);
  const searchCriteria = useSelector((state) => state.driverTerminationLetterReducer.searchCriteria);
  const searchTerm = useSelector((state) => state.driverTerminationLetterReducer.searchTerm);
  const letterListingData = useSelector((state) => state.driverTerminationLetterReducer.letterListingData);
  const sort = useSelector((state) => state.driverTerminationLetterReducer.sort);
  const sortValue = useSelector((state) => state.driverTerminationLetterReducer.sortValue);
  const id = useSelector((state) => state.driverTerminationLetterReducer.id);
  const changeColor = useSelector((state) => state.driverTerminationLetterReducer.changeColor);

  const getLetters = () => {
    setLoading(true);
    DriverTerminationLetterService.getDriverTerminationLetters(
      pageNumber,
      searchCriteria,
      searchTerm,
      sort,
      sortValue
    )
      .then((response) => {
        dispatch(setLetterListingData(response.data.content));
        dispatch(setTotalPages(response.data.totalPages));
        dispatch(setTotalElements(response.data.totalElements));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      getLetters();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [pageNumber, searchCriteria, searchTerm, sort, sortValue]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                dispatch(setSort());
                dispatch(setSortValue("description"));
              }}
            >
              Description
              {sort && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sort && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            letterListingData?.map((letter) => (
              <tr
                key={letter.driverTerminationLetterPK}
                className={id === letter.driverTerminationLetterPK && changeColor ? "tableSelected" : ""}
                onClick={() => {
                  dispatch(setChangeColor(false));
                  dispatch(setId(letter.driverTerminationLetterPK));
                }}
                onDoubleClick={() => {
                  dispatch(setChangeColor(true));
                  dispatch(setId(letter.driverTerminationLetterPK));
                  setTimeout(() => {
                    navigate(
                      "/edit-driver-termination-letter/" + letter.driverTerminationLetterPK + "/" + pageNumber
                    );
                  }, 200);
                }}
              >
                <td className="f-w-600">{letter.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        letterListingData?.length === 0 && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )
      )}
    </div>
  );
};

export default TerminationLetterListing;
