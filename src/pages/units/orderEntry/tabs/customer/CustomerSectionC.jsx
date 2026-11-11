import { Col, Form } from "react-bootstrap";
import { useFormContext, useWatch } from "react-hook-form";
import Checkbox from "../../../../../components/common/checkbox";
import Input from "../../../../../components/common/input";
import CommonModal from "../../../../../components/common/commonModal";
import AutoComplete from "../../../../../components/common/autoComplete";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import ButtonLookup from "../../../../../components/common/buttonLookup";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setIsCreditCardRequired } from "../../../../../store/slices/unit.slice";
import { useDispatch } from "react-redux";
import AddBulkInvoice from "../../../../../componenets/OrderEntry/OrderEntryProcess/edit-order-entry/tabs/misc/AddBulkInvoice";

const CustomerSectionC = ({
  styles,
  selectedCustomerPickupPlant,
  handleBulkInvoiceSelection,
  updateCustomerFields,
  handleCheckBatchLoadValues,
  getBulkInvoiceDetailsLastElement,
}) => {
  const dispatch = useDispatch();
  const [showBulkInvoiceModal, setShowBulkInvoiceModal] = useState(false);
  const [showAddBulkInvoice, setShowAddBulkInvoice] = useState(false);
  const [BulkInvoiceSave, setBulkInvoiceSave] = useState(false);

  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);

  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const customer = useWatch({ name: "customer" });
  const unitNumber = useWatch({ name: "unit.unitNumber" });
  const batchSequenceLength = 21 - unitNumber?.length < 5 ? 21 - unitNumber?.length : 5;

  useEffect(() => {
    if (!showAddBulkInvoice && customer.bulkUnit && BulkInvoiceSave) {
      getBulkInvoiceDetailsLastElement();
    }
  }, [showAddBulkInvoice]);

  return (
    <Col xs={2} className={styles.lastCol}>
      <div>
        <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
          <Col xs={7} className="p-0">
            <Form.Label className={` customColFormLabel`}>Reload</Form.Label>
          </Col>

          <Col xs={3} className="p-0">
            <Checkbox
              name="customer.reload"
              control={control}
              disabled={!customer.customerDataId}
              onChange={(value) => {
                updateCustomerFields({ reload: value });
                if (!value) {
                  updateCustomerFields({ returnRates: false });
                }
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
            customer.reload && selectedCustomer?.allowReturnRates ? "" : "hide-elements"
          }`}
        >
          <Col xs={7} className="p-0">
            <Form.Label className={` customColFormLabel`}>Return Rates</Form.Label>
          </Col>

          <Col xs={3} className="p-0">
            <Checkbox
              name="customer.returnRates"
              control={control}
              onChange={(value) => updateCustomerFields({ returnRates: value })}
              disabled={!customer.reload}
            />
          </Col>
        </Form.Group>

        <Form.Group
          className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
            customer.pickupAtPlant &&
            (selectedCustomerPickupPlant?.yardFK || selectedCustomerPickupPlant?.selectYard) &&
            selectedCustomerPickupPlant?.shuttleCityFK &&
            customer.hasprinter &&
            customer.bolPrinterFk &&
            customer.shuttleToYard
              ? ""
              : "hide-elements"
          }`}
        >
          <Col xs={7} className="p-0">
            <Form.Label className={` customColFormLabel`}>Print BOL</Form.Label>
          </Col>

          <Col xs={3} className="p-0">
            <Checkbox
              name="customer.printBOL"
              control={control}
              disabled={!customer.customerDataId}
              onChange={(value) => updateCustomerFields({ printBOL: value })}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
          <Col xs={7} className="p-0">
            <Form.Label className={` customColFormLabel`}>Duplicate Loads</Form.Label>
          </Col>

          <Col xs={3} className="p-0">
            <Checkbox
              name="customer.duplicateLoads"
              onChange={(value) => updateCustomerFields({ duplicateLoads: value })}
              control={control}
              disabled={!customer.customerDataId || customer.batchLoads}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
          <Col xs={7} className="p-0">
            <Form.Label className={` customColFormLabel`}>Batch Loads</Form.Label>
          </Col>

          <Col xs={3} className="p-0">
            <Checkbox
              name="customer.batchLoads"
              control={control}
              disabled={!customer.customerDataId || customer.duplicateLoads}
              onChange={(value) => {
                updateCustomerFields({ batchLoads: value });

                if (!value) {
                  updateCustomerFields({
                    firstBatchSequence: "",
                    lastBatchSequence: "",
                  });
                }
              }}
            />
          </Col>
        </Form.Group>

        <div className={`${customer.batchLoads ? "" : "hide-elements"}`}>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col xs={7} className="p-0">
              <Form.Label htmlFor="name" className={` customColFormLabel`}>
                First Batch Sequence
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0">
              <Input
                name={"customer.firstBatchSequence"}
                type="search"
                onChange={(e) => {
                  const newValue = e.target.value;
                  updateCustomerFields({ firstBatchSequence: newValue });
                  handleCheckBatchLoadValues(newValue, customer.lastBatchSequence);
                }}
                control={control}
                maxLength={batchSequenceLength}
                width={"60px"}
                value={customer.firstBatchSequence.toUpperCase()}
                required
                disabled={!customer.batchLoads}
                className={`customFormControl`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col xs={7} className="p-0">
              <Form.Label htmlFor="name" className={` customColFormLabel`}>
                Last Batch Sequence
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0">
              <Input
                className={`customFormControl`}
                name={"customer.lastBatchSequence"}
                type="search"
                control={control}
                disabled={!customer.batchLoads}
                maxLength={batchSequenceLength}
                width={"60px"}
                value={customer.lastBatchSequence.toUpperCase()}
                onChange={(e) => {
                  const newValue = e.target.value;
                  updateCustomerFields({ lastBatchSequence: newValue });
                  handleCheckBatchLoadValues(customer.firstBatchSequence, newValue);
                }}
                required
              />
            </Col>
          </Form.Group>
        </div>

        <Form.Group
          className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
            customer.pickupAtPlant && customer.pickupCustomerPlantFK ? "" : "hide-elements"
          }`}
        >
          <Col xs={7} className="p-0">
            <Form.Label htmlFor="name" className={` customColFormLabel`}>
              Plant Code
            </Form.Label>
          </Col>

          <Col xs={4} className="p-0">
            <Input
              className={`form-control`}
              name={"customer.plantCode"}
              type="search"
              control={control}
              maxLength={10}
              width={"90px"}
              value={customer.plantCode}
              disabled={!customer.customerDataId}
              onChange={(value) => updateCustomerFields({ plantCode: value })}
            />
          </Col>
        </Form.Group>
      </div>
      <div style={{ marginTop: "-2rem" }}>
        <Form.Group
          className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
            customer.customerDataId &&
            (selectedCustomer?.creditCardPayments === "Y" || selectedCustomer?.creditCardPayments === "A")
              ? ""
              : "hide-elements"
          }`}
        >
          <Col xs={7} className="p-0">
            <Form.Label className={` customColFormLabel`}>Charge Credit Card</Form.Label>
          </Col>

          <Col xs={3} className="p-0">
            <Checkbox
              name="customer.creditCardPrepaid"
              control={control}
              disabled={
                !customer.customerDataId ||
                selectedCustomer?.creditCardPayments === "Y" ||
                customer.openBalancePrepaid ||
                customer.checkPrepaid ||
                customer.bulkUnit
              }
              onChange={(value) =>
                updateCustomerFields({
                  creditCardPrepaid: value,
                  openBalancePrepaid: false,
                  bulkUnit: false,
                })
              }
            />
          </Col>
        </Form.Group>

        <Form.Group
          className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
            customer.customerDataId && selectedCustomer?.allDealersFOD ? "" : "hide-elements"
          }`}
        >
          <Col xs={7} className="p-0">
            <Form.Label className={` customColFormLabel`}>Check Prepaid</Form.Label>
          </Col>

          <Col xs={3} className="p-0">
            <Checkbox
              name="customer.checkPrepaid"
              control={control}
              disabled={
                !customer.customerDataId ||
                customer.openBalancePrepaid ||
                customer.creditCardPrepaid ||
                customer.bulkUnit
              }
              onChange={(value) => {
                updateCustomerFields({
                  checkPrepaid: value,
                  openBalancePrepaid: false,
                  bulkUnit: false,
                });

                dispatch(setIsCreditCardRequired(!!value));
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group
          className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
            customer.customerDataId &&
            (selectedCustomer?.openBalancePayments === "Y" || selectedCustomer?.openBalancePayments === "A")
              ? ""
              : "hide-elements"
          }`}
        >
          <Col xs={7} className="p-0">
            <Form.Label className={` customColFormLabel`}>Use Open Balance</Form.Label>
          </Col>

          <Col xs={3} className="p-0">
            <Checkbox
              name="customer.openBalancePrepaid"
              control={control}
              disabled={
                !customer.customerDataId ||
                selectedCustomer?.openBalancePayments === "Y" ||
                customer.creditCardPrepaid ||
                customer.checkPrepaid ||
                customer.bulkUnit
              }
              onChange={(value) => updateCustomerFields({ openBalancePrepaid: value })}
            />
          </Col>
        </Form.Group>
      </div>
      <div>
        <Form.Group
          className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
            customer.customerDataId &&
            (selectedCustomer?.bulkInvoices === "Y" || selectedCustomer?.bulkInvoices === "A") &&
            !selectedCustomer?.openBulkInvoices
              ? ""
              : "hide-elements"
          }`}
        >
          <Col xs={7} className="p-0">
            <Form.Label className={` customColFormLabel`}>Bulk Unit Invoice</Form.Label>
          </Col>

          <Col xs={3} className="p-0">
            <Checkbox
              name="customer.bulkUnit"
              control={control}
              onChange={(value) =>
                updateCustomerFields({
                  bulkUnit: value,
                  openBalancePrepaid: false,
                  checkPrepaid: false,
                  creditCardPrepaid: false,
                })
              }
              disabled={
                !customer.customerDataId ||
                selectedCustomer?.bulkInvoices === "Y" ||
                customer.checkPrepaid ||
                customer.openBalancePrepaid ||
                customer.creditCardPrepaid
              }
            />
          </Col>
        </Form.Group>

        <Form.Group
          className={`mt-3 form-group m-t-5 m-b-5 align-items-center row  m-l-0 m-r-0 ${
            !customer.customerDataId ||
            !customer.bulkUnit ||
            selectedCustomer?.bulkInvoices === "N" ||
            selectedCustomer?.bulkInvoices === "O" ||
            selectedCustomer?.openBulkInvoices
              ? "hide-elements"
              : ""
          }`}
        >
          <Col xs={12} className={`p-0 ${styles.selectContainer}`}>
            {/* Bulk Unit Invoice Autocomplete */}

            <AutoComplete
              searchString={customer.bulkInvoiceName}
              handleSearchString={(string) => updateCustomerFields({ bulkInvoiceName: string })}
              onSelect={handleBulkInvoiceSelection}
              selectedId={customer.bulkInvoiceFK}
              renderItemId={(invoice) => invoice.bulkInvoicePK}
              renderItemField={(invoice) => invoice.description}
              queryKey={["bulkInvoiceDetails"]}
              queryFn={(term) =>
                OrderEntryServices.fetchBulkUnitdetails({
                  searchTerms: term || "",
                  customerFK: customer.customerDataId,
                  pageSize: 100,
                })
              }
              disabled={!customer.bulkUnit}
              towardsTop
              className={`${errors?.customer?.bulkInvoiceFK ? "borderRed" : "borderGreen"}`}
              clearInputCallback={() => {
                updateCustomerFields({ bulkInvoiceFK: null });
              }}
            />

            <ButtonLookup
              className={`fa-solid fa-plus lookupMagnifierIcon`}
              onClick={() => setShowBulkInvoiceModal(true)}
            />
          </Col>
        </Form.Group>

        {/* Bulk Invoice Warning */}
        <CommonModal
          show={showBulkInvoiceModal}
          onHide={() => setShowBulkInvoiceModal(false)}
          title={"Add Open Bulk Invoice"}
          body={"Do you want to add an Open Bulk Invoice?"}
          handleYES={() => {
            setShowBulkInvoiceModal(false);
            setShowAddBulkInvoice(true);
          }}
          handleNO={() => setShowBulkInvoiceModal(false)}
        />

        {/* Add Bulk Invoice Modal */}
        <AddBulkInvoice
          show={showAddBulkInvoice}
          onHide={() => setShowAddBulkInvoice(false)}
          setBulkInvoiceSave={setBulkInvoiceSave}
        />
      </div>
    </Col>
  );
};

export default memo(CustomerSectionC);
