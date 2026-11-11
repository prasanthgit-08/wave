import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { useFormik } from "formik";
import AuthService from "../../services/AuthService";
import toast from "react-hot-toast";
import { handleSessionClear } from "../../utils/authUtils";

const validationSchema = yup.object({
  newPassword: yup.string().required("Password is a required field"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords much match")
    .required("Confirm password is a required field"),
});

const ForcePasswordChange = () => {
  const username = localStorage.getItem("username");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleEyeIcon = (setShowPassword) => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleSubmit = async (values) => {
    try {
      const { data } = await AuthService.changePassword(username, values.newPassword);
      if (data?.errorModel?.errorCode === "1") {
        toast.error(data?.errorModel?.errorMessage);
        setValues({ newPassword: "", confirmPassword: "" });
      } else {
        toast.success("Password Changed Successfully!");
        setTimeout(() => {
          handleSessionClear();
          window.location.href = "/login";
        }, 1000);
      }
    } catch (error) {
      console.error("logout error", error);
      toast.error("Password Change Failed!!");
    }
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: true,
    enableReinitialize: true,
  });

  const { values, errors, handleChange, handleBlur, setValues } = formik;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="login-wrapper force-password-wrapper">
        <Col
          xl={5}
          lg={6}
          md={6}
          sm={8}
          xs={10}
          xxl={4}
          className="sub-wrapper loginBoxShadow"
          style={{ minWidth: "450px" }}
        >
          <div className="login-main border shadow-sm rounded">
            <div className="h3 text-center my-3">Change Password</div>

            <Row>
              <Col
                xxl={3}
                xl={3}
                lg={4}
                md={4}
                sm={4}
                xs={4}
                className="login-margin p-r-0 d-flex align-items-start mt-3"
              >
                <label className="login-label-for">New Password </label>
              </Col>
              <Col xxl={9} xl={9} lg={8} md={8} sm={8} xs={8} className="login-margin">
                <div className="d-block position-relative pass-box">
                  <input
                    className={`customFormControl login-input ${errors.newPassword ? "borderRed" : ""}`}
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    name="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <a className="cursor-pointer" onClick={() => toggleEyeIcon(setShowNewPassword)} name="eye2">
                    <FontAwesomeIcon
                      className="font-24 account-icon text-primary eyeClass"
                      icon={showNewPassword ? faEye : faEyeSlash}
                    />
                  </a>
                </div>
              </Col>
              <Col
                xxl={3}
                xl={3}
                lg={4}
                md={4}
                sm={4}
                xs={4}
                className="login-margin p-r-0 d-flex align-items-start mt-3"
              >
                <label className="login-label-for">Confirm Password </label>
              </Col>
              <Col xxl={9} xl={9} lg={8} md={8} sm={8} xs={8} className="login-margin">
                <div className="d-block position-relative pass-box">
                  <input
                    className={`customFormControl login-input ${errors.confirmPassword ? "borderRed" : ""}`}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <a className="cursor-pointer" onClick={() => toggleEyeIcon(setShowConfirmPassword)}>
                    <FontAwesomeIcon
                      className="font-24 account-icon text-primary eyeClass"
                      icon={showConfirmPassword ? faEye : faEyeSlash}
                    />
                  </a>
                </div>
              </Col>
            </Row>

            <div className="d-flex justify-content-center align-items-center mb-2 mt-4">
              <button type="submit" className="btn btn-dark btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 font-12">
                Change Password
              </button>
            </div>
          </div>
        </Col>
      </div>
    </Form>
  );
};

export default ForcePasswordChange;
