import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ListTab from "./tabs/ListTab";
import DetailsTab from "./tabs/DetailsTab";
import MiscInvoiceService from "../../../../services/Invoicing/MiscInvoiceService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setExistingInvoiceDetails, setExistingInvoices } from "../../../../redux/Invoicing/MiscInvoiceSlice";
import LoadingIcon from "../../../common/LoadingIcon";

function DisplayExistingInvoiceContent() {
  const [activeKey, setActiveKey] = useState("list");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const existingInvoices = useSelector((state) => state.miscInvoiceReducer.existingInvoices);
  const invoiceFK = useSelector((state) => state.miscInvoiceReducer.invoiceFK);
  const creditCardNavigation = useSelector((state) => state.miscInvoiceReducer.creditCardNavigation);
  const creditCardCase = useSelector((state) => state.miscInvoiceReducer.creditCardCase);

  /****
   * API call to get the existing Invoices for the Unit
   * *****/
  const getExistingInvoices = (id) => {
    if (id !== undefined) {
      setLoader(true);
      MiscInvoiceService.getExistingInvoicesById(id)
        .then((response) => {
          const data = response?.data;
          /***Dispatch actions to set state in Redux****/
          dispatch(setExistingInvoices(data?.invoice));
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  };
  useEffect(() => {
    if (id) {
      getExistingInvoices(id);
    }
  }, [id]);
  return (
    <div className="shadow-sm rounded border p-1" style={{ height: "432px" }}>
      {loader && <LoadingIcon />}
      <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Tab eventKey={"list"} title={"List"}>
          <ListTab />
        </Tab>
        <Tab eventKey={"details"} title={"Details"} disabled={!invoiceFK}>
          <DetailsTab />
        </Tab>
      </Tabs>
    </div>
  );
}

export default DisplayExistingInvoiceContent;
