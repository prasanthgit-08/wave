import React, { useEffect, useRef, useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import horizonLogo from "../../assets/horizontransport.jpg";
import waveLogo from "../../assets/newwave.png";
import AuthService from "../../services/AuthService";
import { loginUser } from "../../redux/AuthSlice";
import LoadingIcon from "../common/LoadingIcon";
import { emailRegex } from "../../utils/validation/EmailRegex";
import { setIsLoggedIn, setLoggedInUserData } from "../../store/slices/userAuth.slice";

const validationSchema = yup.object({
  username: yup.string().required("Username is a required field"),
  password: yup.string().required("Password is a required field"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const companyName = process.env.REACT_APP_COMPANY_NAME;
  const username = localStorage.getItem("username");
  const forcePasswordChange = localStorage.getItem("forcePasswordChange");

  const usernameRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordUser, setForgotPasswordUser] = useState("");
  const [showForgotLogin, setShowForgotLogin] = useState(false);
  const [email, setEmail] = useState("");

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

  const toggleEyeIcon = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  // Navigate to foce password change
  useEffect(() => {
    if (forcePasswordChange == "true") {
      navigate("/auth/force-password-change");
    }
  }, []);

  // Focus on input field on page load
  useEffect(() => {
    setTimeout(() => {
      usernameRef.current?.focus();
    }, 200);
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (username) {
        // Prevent multiple user sign in
        toast.error("Another User alread logged in!");
        setLoading(false);
        formik.setValues({
          username: "",
          password: "",
        });
      } else {
        // Invoke API call
        const response = await AuthService.login(values.username, values.password);
        const { data } = response;
        // Handle Error Case
        if (data?.errorModel?.errorCode === "1") {
          if (data?.errorModel?.errorMessage) {
            toast.error(data?.errorModel?.errorMessage || "Login failed! Please try again");
          } else {
            toast.error("Something went wrong!!");
          }
          formik.setValues({
            username: "",
            password: "",
          });
        } else {
          // Hande Success
          toast.success("Login Successful!");
          localStorage.removeItem("logout");
          localStorage.setItem("username", values.username);
          localStorage.setItem("usernameInDB", data?.usersData?.name);
          localStorage.setItem("forcePasswordChange", data?.usersData?.forcePasswordChange);
          localStorage.setItem("accessToken", data?.tokens.accessToken);
          localStorage.setItem("refreshToken", data?.tokens.refreshToken);
          localStorage.setItem("accessTokenExpiry", data?.tokens.accessToken_exp);
          localStorage.setItem("refreshTokenExpiry", data?.tokens.refreshToken_exp);
          const tokenExpiryTime = Date.now() + data?.tokens.accessToken_exp * 60 * 1000;
          localStorage.setItem("tokenExpiryTime", tokenExpiryTime);
          localStorage.setItem("tokenSetTime", Date.now());
          localStorage.setItem("menuList", JSON.stringify(data?.menuList || []));
          localStorage.setItem("loggedInUserData", JSON.stringify(data?.usersData || null));
          localStorage.setItem("deniedPermissions", JSON.stringify(data?.deniedPermissions || []));
          dispatch(loginUser(data));
          dispatch(setIsLoggedIn(true));
          dispatch(setLoggedInUserData(data?.usersData));
          formik.setValues({
            username: "",
            password: "",
          });
          if (data?.usersData?.forcePasswordChange) {
            navigate("/auth/force-password-change");
          } else {
            navigate("/");
          }
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("login error:", error);
      toast.error(error.message || "Something went wrong!!");
      formik.setValues({
        username: "",
        password: "",
      });
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      if (forgotPasswordUser) {
        const response = await AuthService.forgotPassword(forgotPasswordUser);
        const { data } = response;
        if (data?.errorModel?.errorCode === "1") {
          toast.error(data?.errorModel?.errorMessage);
        } else {
          toast.success("A temporary password has been sent to your email", {
            duration: 5000,
          });
        }
      }
    } catch (error) {
    } finally {
      formik.setValues({
        username: "",
        password: "",
      });
      setShowForgotPassword(false);
      setLoading(false);
      setForgotPasswordUser("");
    }
  };

  const handleForgotLogin = async () => {
    setLoading(true);
    try {
      if (email) {
        const response = await AuthService.forgotLogin(email);
        const { data } = response;
        if (data?.errorModel?.errorCode === "1") {
          toast.error(data?.errorModel?.errorMessage);
        } else {
          toast.success("Login details has been emailed to you", {
            duration: 4000,
          });
        }
      }
    } catch (error) {
    } finally {
      formik.setValues({
        username: "",
        password: "",
      });
      setEmail("");
      setShowForgotLogin(false);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: true,
    enableReinitialize: true,
  });

  const { values, errors, handleChange, handleBlur } = formik;

  return (
    <Form onSubmit={formik.handleSubmit}>
      {loading && <LoadingIcon />}
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
              <Col
                xxl={3}
                xl={3}
                lg={4}
                md={4}
                sm={4}
                xs={4}
                className="login-margin p-r-0 d-flex align-items-center"
              >
                <label className="login-label">Username</label>
              </Col>
              <Col xxl={9} xl={9} lg={8} md={8} sm={8} xs={8} className="login-margin">
                <input
                  ref={usernameRef}
                  autoComplete="username"
                  className={`customFormControl login-input ${errors.username ? "borderRed" : ""}`}
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={values.username}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                />
              </Col>

              <Col
                xxl={3}
                xl={3}
                lg={4}
                md={4}
                sm={4}
                xs={4}
                className="login-margin p-r-0 d-flex align-items-center"
              >
                <label className="login-label">Password</label>
              </Col>
              <Col xxl={9} xl={9} lg={8} md={8} sm={8} xs={8} className="login-margin">
                <div className="d-block position-relative pass-box">
                  <input
                    name="password"
                    placeholder="Enter password"
                    className={`customFormControl login-input ${errors.password ? "borderRed" : ""}`}
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    autoComplete="current-password"
                    aria-autocomplete="new-password"
                  />
                  <a className="cursor-pointer" onClick={toggleEyeIcon}>
                    <FontAwesomeIcon
                      className="font-24 account-icon text-primary eyeClass"
                      icon={showPassword ? faEye : faEyeSlash}
                    />
                  </a>
                </div>
              </Col>
            </Row>

            <div className="form-group login-buttons d-flex align-items-center justify-content-center">
              <button
                type="submit"
                label="Login"
                className="btn btn-dark btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 font-12"
              >
                Login
              </button>

              <button
                type="button"
                label="Forgot Password"
                className="btn btn-dark btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 font-12"
                disabled={!values.username}
                onClick={() => {
                  setShowForgotPassword(true);
                  setForgotPasswordUser(values.username || "");
                }}
              >
                Forgot Password
              </button>

              <button
                type="button"
                label="Forgot Login"
                className="btn btn-dark btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 font-12"
                // disabled
                onClick={() => setShowForgotLogin(true)}
              >
                Forgot Login
              </button>

              {/* Forgot Password */}
              <Modal
                show={showForgotPassword}
                onHide={() => setShowForgotPassword(false)}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="font-14 h-100">
                  <Row>
                    <Col></Col>
                  </Row>

                  <Row>
                    <Col lg={3} md={3} sm={3} xs={4} className="login-margin">
                      <label>Username</label>
                    </Col>
                    <Col lg={8} md={8} sm={8} xs={7} className="login-margin">
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Enter Login Id"
                        value={forgotPasswordUser}
                        name="userName"
                        onChange={(e) => setForgotPasswordUser(e.target.value)}
                        className={`customFormControl ${!forgotPasswordUser ? "borderRed" : ""}`}
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
                onHide={() => setShowForgotLogin(false)}
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
                    <Col lg={3} md={3} sm={3} xs={4} className="login-margin ">
                      <label>Email</label>
                    </Col>
                    <Col lg={8} md={8} sm={8} xs={7} className="login-margin">
                      <input
                        autoComplete="off"
                        className={`customFormControl ${!email.match(emailRegex) ? "borderRed" : ""}`}
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
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
                    disabled={!email.match(emailRegex)}
                  >
                    OK
                  </Button>
                  <Button
                    variant="secondary"
                    className="btn-medium-with btn-md m-l-5 m-r-5 m-b-5 font-12"
                    onClick={() => setShowForgotLogin(false)}
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
