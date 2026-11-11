import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CustomerDealerRoutesService from "../../../../services/CustomerDealerRoutesService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setDisableDown,
  setDisableSaveSequence,
  setDisableUp,
  setSelectedId,
  setSequenceChangeColor,
  setSequencePagelistingData,
} from "../../../../redux/CustomerDealerRoutesSlice";

const SequenceListing = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const listingData = useSelector((state) => state.customerDealerRoutes.sequencePageListingData);
  const id = params.id;
  const loadedPage = useSelector((state) => state.customerDealerRoutes.loadedPage);
  const selectedId = useSelector((state) => state.customerDealerRoutes.selectedId);
  const changeColor = useSelector((state) => state.customerDealerRoutes.sequenceChangeColor);

  const handleArrow = (index) => {
    if (index === 0 && index === listingData.length - 1) {
      dispatch(setDisableDown(true));
      dispatch(setDisableUp(true));
    } else if (index === 0) {
      dispatch(setDisableDown(false));
      dispatch(setDisableUp(true));
    } else if (index === listingData.length - 1) {
      dispatch(setDisableDown(true));
      dispatch(setDisableUp(false));
    } else {
      dispatch(setDisableDown(false));
      dispatch(setDisableUp(false));
    }
  };
  const fetchTableData = () => {
    setLoad(true);
    CustomerDealerRoutesService.fetchRoutesList(id)
      .then((response) => {
        const data = response.data;
        if (data) {
          if (data?.length > 1) {
            const sortedData = data.slice().sort((a, b) => a?.sequence - (b?.sequence || 0));
            dispatch(setSequencePagelistingData(sortedData));
          } else {
            dispatch(setSequencePagelistingData(data));
          }
          setLoad(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoad(false);
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, []);

  const sortSequence = () => {
    if (listingData?.length > 1) {
      const sortedItems = [...listingData].sort((first, second) => first?.sequence - (second?.sequence || 0));
      setSequencePagelistingData(sortedItems);
    }
  };
  useEffect(() => {
    sortSequence();
  }, [listingData]);

  useEffect(() => {
    dispatch(setSelectedId(null));
    dispatch(setDisableSaveSequence(true));
  }, []);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th className="f-w-600">City</th>
            <th className="f-w-600">State</th>
            <th className="f-w-600">Sequence</th>
          </tr>
        </thead>
        <tbody>
          {!load &&
            loadedPage.map((route, index) => (
              <tr
                key={route.customerDealerRoutePK}
                className={changeColor && selectedId === route.customerDealerRoutePK ? "tableSelected" : ""}
                onClick={() => {
                  dispatch(setSequenceChangeColor(true));
                  dispatch(setSelectedId(route.customerDealerRoutePK));
                  const searchIndex = listingData.findIndex(
                    (item) => item["customerDealerRoutePK"] === route.customerDealerRoutePK
                  );
                  handleArrow(index, searchIndex);
                }}
                onDoubleClick={() => {
                  dispatch(setSequenceChangeColor(true));
                  dispatch(setSelectedId(route.customerDealerRoutePK));
                }}
              >
                <td className="f-w-600">{route.city}</td>
                <td className="f-w-600">{route.stateCode}</td>
                <td className="f-w-600">{route.sequence}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {load && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      {listingData.length === 0 && !load && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default SequenceListing;
