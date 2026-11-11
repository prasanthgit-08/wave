import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import FormContent from "./FormContent";
import QuarterScreenWrapper from "../../../../../../Templates/Screens/QuarterScreenWrapper";
import ThankYouCardsService from "../../../../../../../services/ThankYouCardsService";

const validationSchema = yup.object().shape({
  forDriver: yup.boolean(),
  driver: yup.number().when("forDriver", {
    is: true,
    then: yup.number().required(),
  }),
  driverInput: yup.string(),
  recipient: yup.string().when("forDriver", {
    is: false,
    then: yup.string().required(),
  }),
  address1: yup.string().when("forDriver", {
    is: false,
    then: yup.string().required(),
  }),
  address2: yup.string(),
  thankYouText: yup.string().required(),

  postalCodePK: yup.string().when("forDriver", {
    is: false,
    then: yup.string().required(),
  }),
});

const ThankYouCard = () => {
  const navigate = useNavigate();
  const { driverId } = useParams();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      forDriver: false,
      driver: "",
      driverInput: "",
      recipient: "",
      address1: "",
      address2: "",
      thankYouText: "",
      city: "",
      stateCode: "",
      postalCode: "",
      canadian: false,
      postalCodePK: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const formData = {
        driverFK: values.driver || null,
        name: values.recipient,
        address1: values.address1,
        address2: values.address2,
        cardText: values.thankYouText,
        city: values.city,
        stateCode: values.stateCode,
        postalCode: values.postalCode,
        canadian: values.canadian,
        postalCodePK: values.postalCodePK || "",
      };

      setLoading(true);
      ThankYouCardsService.saveThankYouCard(formData)
        .then((response) => {
          toast.success("Thank You Card Created");
          setSubmitting(false);
          handleClose();
        })
        .catch(() => {
          toast.error("Thank You Card Submission Failed");
        })
        .finally(() => {
          setLoading(false);
        });
    },
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: true,
    enableReinitialize: true,
  });

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
    setErrors,
    setFieldError,
    isValid,
    initialValues,
  } = formik;

  const handleClose = () => {
    setValues(initialValues);
    navigate(`/driver-service-selection/${driverId}/form`);
  };

  // For Postal Code Bugfix
  useEffect(() => {
    if (values.postalCodePK === null) {
      setFieldValue("postalCodePK", "");
    }
  }, [values.postalCodePK]);

  return (
    <QuarterScreenWrapper>
      <FormHeader handleClose={() => handleClose()} />
      <FormContent
        driverId={driverId}
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setValues={setValues}
        setErrors={setErrors}
        setFieldValue={setFieldValue}
        setFieldError={setFieldError}
      />
      <FormFooter isFormValid={isValid} handleSave={handleSubmit} />
    </QuarterScreenWrapper>
  );
};

export default ThankYouCard;
