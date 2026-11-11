import React from "react";
import PropTypes from "prop-types";

import { Row } from "react-bootstrap";
import QuarterScreen from "../../styles/QuarterScreen.module.css";
/**
 * GroupsEditPageTemplate is a React component that serves as a template for editing groups.
 * It includes sections for form header, unassigned groups listing and pagination,
 * picker controller, assigned groups listing and pagination, and form footer.
 *
 * @param {React.Component} FormHeaderComponent - Component for rendering the form header.
 * @param {React.Component} UnassignedGroupsListing - Component for rendering the unassigned groups listing.
 * @param {React.Component} UnassignedGroupsPagination - Component for rendering pagination for unassigned groups.
 * @param {React.Component} PickerControllerComponent - Component for rendering the picker controller.
 * @param {React.Component} AssignedGroupsListing - Component for rendering the assigned groups listing.
 * @param {React.Component} AssignedGroupsPagination - Component for rendering pagination for assigned groups.
 * @param {React.Component} FormFooterComponent - Component for rendering the form footer.
 */

const GroupsEditPageQuarterScreenTemplate = ({
  FormHeaderComponent,
  UnassignedGroupsListing,
  UnassignedGroupsPagination,
  PickerControllerComponent,
  AssignedGroupsListing,
  AssignedGroupsPagination,
  FormFooterComponent,
}) => {
  return (
    <div className={`table-bordered ${QuarterScreen.container}`}>
      <div className={`border border-dark border-2 ${QuarterScreen.width}`}>
        {/* <FormHeader /> */}
        {FormHeaderComponent}

        {/* <EditGroupsContent /> */}
        <div className="border border-dark border-right-0 border-left-0">
          <Row className="groupsQuaterScreenMaintenanceGeneralHeight p-0 m-0">
            <div className={`p-r-0 p-l-0 col`}>
              <div className="d-flex h-100 justify-content-between">
                {/* <PaginationComponent
                  {...paginationProps}
                  firstPage
                  lastPage
                  singleArrowDown
                  singleArrowUp
                  hideBorderTop
                  hideBorderBottom
                  hideBorderLeft
                /> */}
                {UnassignedGroupsPagination}
                <div className="w-100">
                  {/* <UnassignedGroupsListing /> */}
                  {UnassignedGroupsListing}
                </div>
              </div>
            </div>
            <div className="col-auto border border-dark border-2 border-top-0 border-right-0 border-bottom-0 px-0">
              <div className="col-auto d-flex h-100 justify-content-between">
                {/* <PickerController
                  hideBorderLeft 
                  hideBorderRight 
                /> */}
                {PickerControllerComponent}
              </div>
            </div>
            <div className="col border border-dark border-2 border-top-0 border-right-0 border-bottom-0 px-0">
              <div className="d-flex h-100 justify-content-between">
                <div className="w-100">
                  {/* <CustomersListing /> */}
                  {AssignedGroupsListing}
                </div>
                {/* <PaginationComponent
                  {...paginationProps}
                  firstPage
                  lastPage
                  singleArrowDown
                  singleArrowUp
                  hideBorderTop
                  hideBorderBottom
                  hideBorderRight
                /> */}
                {AssignedGroupsPagination}
              </div>
            </div>
          </Row>
        </div>

        {/* <FormFooter /> */}
        {FormFooterComponent}
      </div>
    </div>
  );
};

GroupsEditPageQuarterScreenTemplate.propTypes = {
  FormHeaderComponent: PropTypes.element,
  UnassignedGroupsListing: PropTypes.element,
  UnassignedGroupsPagination: PropTypes.element,
  PickerControllerComponent: PropTypes.element,
  AssignedGroupsListing: PropTypes.element,
  AssignedGroupsPagination: PropTypes.element,
  FormFooterComponent: PropTypes.element,
};

export default GroupsEditPageQuarterScreenTemplate;
