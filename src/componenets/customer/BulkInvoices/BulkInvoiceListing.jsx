import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setSelectedIdInvoice,
  setNormalSortValue,
  setNormalSortFlag,
  setCustomerData,
  setTotalPagesInvoice,
  setTotalElementsInvoice,
  setSearchTerms,
  setEditBulkInvoice,
  setSelectedValue,
  setsearchCriteria,
  resetFiels,
} from "../../../redux/CustomerBulkInvoiceSlice";
import CustomerBulkInvoice from "../../../services/CustomerBulkInvoice";
import Loading from "../../../components/common/loading";

function BulkInvoiceListing() {
  const params = useParams();
  const customerFK = params.cpk;
  const id = params.cpk;
  const pageNum = params.pageNumber;
  const searchTerms = useSelector((state) => state.customerBulkInvoice.searchTerms);
  const searchCriteria = useSelector((state) => state.customerBulkInvoice.searchCriteria);
  const selecteActiveType = useSelector((state) => state.customerBulkInvoice.selecteActiveType);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pageNumber } = useSelector((state) => state.customerBulkInvoice);
  const { customerData, selectedId } = useSelector((state) => state.customerBulkInvoice);
  const [selectedRow, setSelectedRow] = useState("");
  const sortFlag = useSelector((state) => state.customerBulkInvoice.normalSortFlag);

  const sortValue = useSelector((state) => state.customerBulkInvoice.normalSortValue);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  const fetchBulkInvoice = () => {
    setLoader(true);
    CustomerBulkInvoice.getBulkInvoices(
      pageNumber,
      searchCriteria,
      searchTerms,
      selecteActiveType,
      id,
      sortValue,
      sortFlag
    )
      .then((res) => {
        setLoader(false);
        dispatch(setCustomerData(res?.data?.content || []));
        dispatch(setTotalPagesInvoice(res?.data?.totalPages || 0));
        dispatch(setTotalElementsInvoice(res?.data?.totalElements || 0));
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      })
      .finally(() => setLoader(false));
  };
  useEffect(() => {
    setLoader(true);
    const debounceFunction = setTimeout(() => {
      fetchBulkInvoice();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [pageNumber, searchCriteria, searchTerms, selecteActiveType, id, sortValue, sortFlag]);

  const renderData = customerData?.map((i, index) => {
    return (
      <tr
        key={index}
        className={selectedId === i.bulkInvoicePK ? "tableSelected" : ""}
        id="rowId"
        onDoubleClick={() => {
          setSelectedRow(i.bulkInvoicePK);
          dispatch(resetFiels());
          setTimeout(() => {
            navigate("/bulk-invoices/" + customerFK + "/" + pageNum + "/add-bulkinvoice/" + i.bulkInvoicePK);
          }, 200);
        }}
        onClick={() => {
          dispatch(setSelectedIdInvoice(i.bulkInvoicePK));
        }}
      >
        <td className="f-w-600">{i.description} </td>
      </tr>
    );
  });

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              {t("bulkinvoice.page.filter.discription")}
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        {loader ? "" : renderData != 0 && <tbody> {renderData}</tbody>}
      </table>
      {loader ? (
        <Loading />
      ) : (
        renderData == 0 && (
          <h2 className="empty-list pt-1" align="center">
            No Records Available
          </h2>
        )
      )}
    </div>
  );
}

export default BulkInvoiceListing;
