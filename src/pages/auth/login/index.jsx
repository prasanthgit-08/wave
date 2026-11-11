import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import horizonLogo from "../../../assets/horizontransport.jpg";
import waveLogo from "../../../assets/newwave.png";
import useLogin from "./useLogin";
import Input from "../../../components/common/input";
import CustomButton from "../../../components/common/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emailRegex } from "../../../utils/validation/EmailRegex.js";
import Loading from "../../../components/common/loading/index.jsx";
import Checkbox from "../../../components/common/checkbox/index.jsx";
import DropdownAutoComplete from "../../../components/common/dropdownAutoComplete/index.jsx";

const Login = () => {
  const {
    onSubmit,
    reactHookForm,
    handleForgotPassword,
    showForgotLogin,
    setShowForgotLogin,
    showForgotPassword,
    setShowForgotPassword,
    apiLoading,
    handleForgotLogin,
  } = useLogin();

  const loading = useSelector((state) => state.userAuth.loading);

  const companyName = process.env.REACT_APP_COMPANY_NAME;
  const username = localStorage.getItem("username");
  const forcePasswordChange = localStorage.getItem("forcePasswordChange");

  const getLogo = () => {
    switch (companyName) {
      case "Horizon":
        return "/images/horizontransport.jpg";
      case "Wave":
        return "/images/newWave.jpg";
      default:
        return "/images/horizontransport.jpg";
    }
  };

  const getLogoHeight = () => {
    switch (companyName) {
      case "Horizon":
        return "120px";
      case "Wave":
        return "150px";
      default:
        return "120px";
    }
  };

  return (
    <Form onSubmit={reactHookForm.handleSubmit(onSubmit)}>
      {(loading || apiLoading) && <Loading />}
      <div className="login-wrapper">
        <Col
          xl={4}
          lg={5}
          md={6}
          sm={8}
          xs={10}
          xxl={3}
          className="sub-wrapper loginBoxShadow"
          style={{ minWidth: "450px" }}
        >
          <div className="login-main border shadow-sm rounded">
            <div className="logo-bg d-flex align-items-center justify-content-center my-3">
              <img className="login-logo-img" src={getLogo()} alt="HorizonLogo" height={getLogoHeight()} />
            </div>

            <Row>
              <Col xl={3} xs={4} className="login-margin p-r-0 d-flex align-items-center">
                <label className="login-label">Username</label>
              </Col>
              <Col xl={9} xs={8} className="login-margin">
                <Input
                  type="text"
                  control={reactHookForm.control}
                  name={"username"}
                  placeholder="Enter username"
                  required
                  focusFlag={true}
                  className={`customFormControl login-input`}
                />
              </Col>

              <Col xl={3} xs={4} className="login-margin p-r-0 d-flex align-items-center">
                <label className="login-label">Password</label>
              </Col>
              <Col xl={9} xs={8} className="login-margin">
                <Input
                  type="password"
                  control={reactHookForm.control}
                  name={"password"}
                  placeholder="Enter password"
                  required
                  className={`customFormControl login-input`}
                />
              </Col>
            </Row>

            <div className="form-group login-buttons d-flex align-items-center justify-content-center">
              <CustomButton type="submit" label={"Login"} disabled={loading} className={"btn-dark"} />
              <CustomButton
                type="button"
                label={"Forgot Password"}
                className={"btn-dark "}
                disabled={!reactHookForm.watch("username")}
                onClick={() => {
                  setShowForgotPassword(true);
                }}
              />

              <CustomButton
                type="button"
                label={"Forgot Login"}
                className={"btn-dark"}
                onClick={() => setShowForgotLogin(true)}
              />

              {/* Forgot Password */}
              <Modal
                show={showForgotPassword}
                onHide={() => setShowForgotPassword(false)}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="font-18 h-100">
                    Please enter the username to send the temporary password
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-14 h-100">
                  <Row>
                    <Col></Col>
                  </Row>

                  <Row>
                    <Col sm={3} xs={4} className="login-margin">
                      <label>Username</label>
                    </Col>
                    <Col sm={8} xs={7} className="login-margin">
                      <Input
                        type="text"
                        control={reactHookForm.control}
                        name={"username"}
                        placeholder="Enter username"
                        required
                        className={`customFormControl login-input`}
                      />
                    </Col>
                  </Row>
                  <Row />
                  <Col />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="btn-small-with btn-md m-l-5 m-r-5 m-b-5 font-12"
                    variant="primary"
                    onClick={handleForgotPassword}
                  >
                    OK
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* Forgot Login */}
              <Modal
                show={showForgotLogin}
                onHide={() => {
                  reactHookForm.resetField("email");
                  setShowForgotLogin(false);
                }}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="font-18 h-100">
                    {"Please enter the email to send the login details "}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-14 h-100">
                  <Row>
                    <Col></Col>
                  </Row>

                  <Row>
                    <Col sm={3} xs={4} className="login-margin ">
                      <label>Email</label>
                    </Col>
                    <Col sm={8} xs={7} className="login-margin">
                      <Input
                        type="email"
                        control={reactHookForm.control}
                        name={"email"}
                        placeholder="Enter email"
                        className={`customFormControl`}
                      />
                    </Col>
                  </Row>
                  <Row />
                  <Col />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="btn-small-with btn-md m-l-5 m-r-5 m-b-5 font-12"
                    variant="primary"
                    onClick={handleForgotLogin}
                    disabled={!reactHookForm.watch("email")?.match(emailRegex)}
                  >
                    OK
                  </Button>
                  <Button
                    variant="secondary"
                    className="btn-medium-with btn-md m-l-5 m-r-5 m-b-5 font-12"
                    onClick={() => {
                      reactHookForm.resetField("email");
                      setShowForgotLogin(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </Col>
      </div>
    </Form>
  );
};

export default Login;
