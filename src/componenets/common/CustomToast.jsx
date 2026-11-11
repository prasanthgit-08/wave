import PropTypes from "prop-types";
import { toast } from "react-hot-toast";

// Usage Example
// *************
// import customToast from common folder
// customToast({message: 'Validation Failed'});
// customToast({message: 'Validation Failed', type: 'error'});
// customToast({message: 'Validation Successful', type: 'success'});

const customToast = ({
  message, // custom error message
  type = "error", // type of toast required, 'error' by default
  position = "top-center", // position of the toast message
  // autoClose = false,
}) => {
  let toastOptions = {
    position: position,
    // if duration not given autoClose by default
    // duration: !autoClose ? Infinity : undefined
  };

  switch (type) {
    case "error":
      return toast.error(message, toastOptions);
    case "success":
      return toast.success(message, toastOptions);
    case "loading":
      return toast.loading(message, toastOptions);
    default:
      return toast(message, toastOptions);
  }
};

customToast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["error", "success", "loading"]),
  position: PropTypes.oneOf([
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-right",
    "bottom-center",
  ]),
  // autoClose: PropTypes.bool
};

export default customToast;
