import React from "react";

import QuarterScreen from "../../styles/QuarterScreen.module.css";
import PropTypes from "prop-types";

import { Col, Row } from "react-bootstrap";
/**
 * GroupsDetailsPageTemplate is a React component that serves as a template for displaying
 * details of groups. It includes sections for form header, content, listing, pagination, and form footer.
 *
 * @param {boolean} viewDetail - Flag indicating whether to display the detailed view.
 * @param {React.Component} FormHeaderComponent - Component for rendering the form header.
 * @param {React.Component} FormContentComponent - Component for rendering the form content.
 * @param {React.Component} GroupsListingComponent - Component for rendering the groups listing.
 * @param {React.Component} PaginationComponent - Component for rendering pagination.
 * @param {React.Component} FormFooterComponent - Component for rendering the form footer.
 */

const GroupsDetailsPageQuarterScreenTemplate = ({
  viewDetail,
  FormHeaderComponent,
  FormContentComponent,
  GroupsListingComponent,
  PaginationComponent,
  FormFooterComponent,
}) => {
  return (
    <div className={`add-form-component p-0 ${QuarterScreen.container}`}>
      <div>
        <div className={`border border-dark border-2 quarterScreenWidth`}>
          {/* <FormHeader /> */}
          {FormHeaderComponent}

          {/* <FormContent  /> */}
          <div className="border border-dark border-right-0 border-left-0 ">
            <Row className="groupsQuaterScreenMaintenanceGeneralHeight">
              <Col xs={6}>
                <div className="ms-4">
                  {/* <FormContent  /> */}
                  {FormContentComponent}
                </div>
              </Col>

              {viewDetail && (
                <Col
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  xs={6}
                  className="row border border-dark border-top-0 border-bottom-0 border-right-0 p-0"
                >
                  <div className="d-flex h-100 p-0">
                    <div className="w-100">
                      {/* <GroupsListing /> */}
                      {GroupsListingComponent}
                    </div>

                    {/* <PaginationComponent
                      {...paginationProps}
                      firstPage
                      lastPage
                      singleArrowUp
                      singleArrowDown
                      hideBorderBottom
                      hideBorderRight
                      hideBorderTop
                    /> */}
                    {PaginationComponent}
                  </div>
                </Col>
              )}
            </Row>
          </div>

          {/* <FormFooter /> */}
          {FormFooterComponent}
        </div>
      </div>
    </div>
  );
};

GroupsDetailsPageQuarterScreenTemplate.propTypes = {
  viewDetail: PropTypes.bool,
  FormHeaderComponent: PropTypes.element,
  FormContentComponent: PropTypes.element,
  GroupsListingComponent: PropTypes.element,
  PaginationComponent: PropTypes.element,
  FormFooterComponent: PropTypes.element,
};

export default GroupsDetailsPageQuarterScreenTemplate;
