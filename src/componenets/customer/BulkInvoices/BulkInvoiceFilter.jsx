import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import ButtonComponent from "../../common/Button";
import InputField from "../../common/InputField";
import { useNavigate, useParams } from "react-router-dom";
import { t } from "i18next";
import CustomerBulkInvoice from "../../../services/CustomerBulkInvoice";
import { useDispatch, useSelector } from "react-redux";
import {
  setTotalElementsInvoice,
  setTotalPagesInvoice,
  setCustomerData,
} from "../../../redux/CustomerBulkInvoiceSlice";

function BulkInvoiceFilter({ setLoader }) {
  const params = useParams();
  const id = params.cpk;
  const pageNum = params.pageNumber;
  const [selectedValue, setSelectedValue] = useState("Beginning");
  const [selecteActiveType, setSelecteActiveType] = useState(null);
  const [searchTerms, setSearchTerms] = useState("");

  const dispatch = useDispatch();

  const { pageNumber } = useSelector((state) => state.customerBulkInvoice);

  useEffect(() => {
    CustomerBulkInvoice.getBulkInvoices(pageNumber, selectedValue, searchTerms, selecteActiveType, id)
      .then((res) => {
        setLoader(false);
        dispatch(setCustomerData(res?.data?.content || []));
        dispatch(setTotalPagesInvoice(res?.data?.totalPages || 0));
        dispatch(setTotalElementsInvoice(res?.data?.totalElements || 0));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNumber, selectedValue, searchTerms, selecteActiveType]);

  return (
    <Row className="border border-dark border-2 p-t-10 p-b-10 layout-1">
      <Col md={12}>
        <Row className="m-0 p-0 justify-content-between">
          <Col md={9} sm={9} lg={9} xs={9} className="p-l-0">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center search-box">
                <span className="p-r-20">
                  <ButtonComponent
                    route={"/bulk-invoices/" + id + "/" + pageNum + "/add-bulkinvoice"}
                    className="btn btn-secondary btn-sm font-12 btn-small-width"
                    label={t("dealers.list.page.new.button")}
                  />
                </span>
              </div>
              <div className="col-5">
                <span className="p-l-20">
                  <label className="f-w-600 m-r-15">{t("dealers.list.page.search.button")}</label>
                  <InputField
                    type="text"
                    name="searchTerm"
                    autoComplete="off"
                    aria-autocomplete="list"
                    placeholder={t("dealers.list.page.global.search")}
                    className="search-input w-50"
                    onChange={(e) => {
                      setSearchTerms(e.target.value);
                    }}

                    autocomplete="autocomplete_off_randString"
                  />
                </span>
              </div>

              <div className="d-flex align-items-center">
                <RadioGroup
                  name="searchCriteria"
                  selectedValue={selectedValue}
                  onChange={(value) => {
                    setSelectedValue(value);
                  }}
                >
                  <div className="d-flex align-items-center m-b-5">
                    <Radio value="Beginning" />
                    <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.begining")}</label>
                  </div>
                  <div className="d-flex align-items-center m-b-5">
                    <Radio value="Contains" />
                    <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.contains")}</label>
                  </div>
                </RadioGroup>
              </div>

              <div className="d-flex flex-column">
                <RadioGroup
                  name="status"
                  selectedValue={selecteActiveType}
                  onChange={(value) => {
                    setSelecteActiveType(value);
                  }}
                >
                  <div className="d-flex align-items-center m-b-5">
                    <Radio value={null} />
                    <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.all")}</label>
                  </div>

                  <div className="d-flex align-items-center m-b-5">
                    <Radio value={true} />
                    <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.active")}</label>
                  </div>

                  <div className="d-flex align-items-center m-b-5">
                    <Radio value={false} />
                    <label className="f-w-600 m-l-5">Closed</label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Col>
          <Col md={2} sm={2} lg={2} xs={2} className="p-l-0 text-end align-items-center ">
            <ButtonComponent
              route={"/add-customer/" + id + "/" + pageNum}
              className="btn btn-secondary mt-4 px-4 btn-sm font-12 btn-small-width close-button"
              label={t("dealers.list.page.advanced.close.button")}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default BulkInvoiceFilter;
