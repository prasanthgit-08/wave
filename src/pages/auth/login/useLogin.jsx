import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { login } from "../../../store/slices/userAuth.slice.js";
import { emailRegex } from "../../../utils/validation/EmailRegex";
import authService from "../../../service/auth/auth.service.js";
import toast from "react-hot-toast";

const loginSchema = z.object({
  username: z.string().nonempty({ message: "Username is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
  email: z.string().regex(emailRegex, { message: "Invalid email address" }).optional(),
});

const useLogin = () => {
  const [showForgotLogin, setShowForgotLogin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const dispatch = useDispatch();

  const reactHookForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
  });

  useEffect(() => {
    reactHookForm.trigger();
  }, [reactHookForm]);

  const handleForgotPassword = async () => {
    setApiLoading(true);
    try {
      if (reactHookForm.watch("username")) {
        const response = await authService.forgotPassword(reactHookForm.watch("username"));
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
      setShowForgotPassword(false);
      setApiLoading(false);
    }
  };

  const handleForgotLogin = async () => {
    setApiLoading(true);
    try {
      if (reactHookForm.watch("email")) {
        const response = await authService.forgotLogin(reactHookForm.watch("email"));
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
      setShowForgotLogin(false);
      setApiLoading(false);
    }
  };

  const onSubmit = (values) => {
    dispatch(login({ username: values.username, password: values.password }));
  };

  return {
    reactHookForm,
    onSubmit,
    handleForgotPassword,
    showForgotLogin,
    setShowForgotLogin,
    showForgotPassword,
    setShowForgotPassword,
    apiLoading,
    handleForgotLogin,
  };
};

export default useLogin;
