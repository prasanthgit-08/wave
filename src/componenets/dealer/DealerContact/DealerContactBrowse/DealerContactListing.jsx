import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedId, setSortType, setSortValue } from "../../../../redux/DealerContacts";
import LoadingIcon from "../../../common/LoadingIcon";

/**
 * @param {boolean} loader - true while the list API call is pending
 * @param {boolean} initialLoading - true until the first response (rows hidden only then)
 */
function DealerContactListing({ loader, initialLoading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const pagenum = params.pageNumber;

  const [selectedRow, setSelectedRow] = useState("");

  const listingData = useSelector((state) => state.dealerContacts.dealerContactsData);

  const { sortValue, sortType } = useSelector((state) => state.dealerContacts);

  const selectedId = useSelector((state) => state.dealerContacts.selectedId);

  const renderDatas = listingData.map((i, index) => {
    return (
      <tr
        id="rowId"
        className={
          selectedId == i.dealerContactPK
            ? "tableSelected"
            : selectedRow == i.dealerContactPK
              ? "tableSelected"
              : ""
        }
        onClick={() => {
          dispatch(setSelectedId(""));
        }}
        key={index}
        onDoubleClick={(event) => {
          setSelectedRow(i.dealerContactPK);
          dispatch(setSelectedId(i.dealerContactPK));
          setTimeout(() => {
            navigate("/dealer-contacts/" + id + "/" + pagenum + "/add/" + i.dealerContactPK);
          }, 100);
        }}
      >
        <td className="f-w-600">{i.contact} </td>
      </tr>
    );
  });

  return (
    <div className="fixTableHead">
      {/* Overlay on top of the table (keeps the current rows visible) and blocks clicks while loading */}
      {loader && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                dispatch(setSortValue("contact"));
                if (sortType) {
                  dispatch(setSortType(false));
                } else {
                  dispatch(setSortType(true));
                }
              }}
              className="f-w-600"
            >
              Contact
              {sortValue === "contact" && sortType && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "contact" && !sortType && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {initialLoading
            ? null
            : listingData.length >= 1 &&
              listingData.map((i, index) => (
                <tr
                  id="rowId"
                  className={
                    selectedId == i.dealerContactPK
                      ? "tableSelected"
                      : selectedRow == i.dealerContactPK
                        ? "tableSelected"
                        : ""
                  }
                  onClick={() => {
                    dispatch(setSelectedId(""));
                  }}
                  key={index}
                  onDoubleClick={(event) => {
                    setSelectedRow(i.dealerContactPK);
                    dispatch(setSelectedId(i.dealerContactPK));
                    setTimeout(() => {
                      navigate("/dealer-contacts/" + id + "/" + pagenum + "/add/" + i.dealerContactPK);
                    }, 100);
                  }}
                >
                  <td className="f-w-600">{i.contact} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {initialLoading || loader
        ? ""
        : listingData.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
    </div>
  );
}

export default DealerContactListing;
