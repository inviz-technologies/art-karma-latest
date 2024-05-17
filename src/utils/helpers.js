import { toast } from "react-toastify";

export const showToast = (type, message) => {
  try {
    toast({
      type: type || "info",
      text1: message,
    });
  } catch (error) {
    console.log("SHOW TOAST ERROR", error);
  }
};

export const handlePostRequest = async (requestFunction, requestBody) => {
  try {
    // console.log('REQUESTING API');
    let res = await requestFunction(requestBody);
    // console.log('API RESPONSE', res);
    if (res && res.data) {
      return {
        success: true,
        data: res.data,
      };
    }
    if (res && res.error) {
      if (res.error?.error == "TypeError: Network request failed") {
        showToast("error", "Network Request Error");
        return {
          success: false,
          error: "Network Request Error.",
        };
      }
      switch (res.error.status) {
        case 400:
          // alert('res.error?.data?.message');
          showToast("error", res.error?.data?.message || "Bad Request.");
          return {
            success: false,
            error: res.error?.data?.message || "Bad Request.",
          };

        case 401:
          showToast(
            "error",
            res.error?.data?.message || "You are unauthorized."
          );
          return {
            success: false,
            error: "You are unauthorized.",
          };

        case 404:
          showToast("error", res.error?.data?.message || "Not Found.");
          return {
            success: false,
            error: "Not Found.",
          };

        case 500:
          showToast(
            "error",
            res.error?.data?.message || "Internal Server Error"
          );
          return {
            success: false,
            error: "Internal Server Error",
          };

        case 502:
          showToast("error", res.error?.data?.message || "Bad Gateway Error.");
          return {
            success: false,
            error: "Bad Gateway Error",
          };

        case 503:
          showToast("error", res.error?.data?.message || "Server timed out");
          return {
            success: false,
            error: "Server timed out",
          };

        default:
          showToast(
            "error",
            res.error?.data?.message || "Something went wrong"
          );
          return {
            success: false,
            error: "Something went wrong",
          };
      }
    }

    return {
      success: null,
      error: "Oops! There might be an issue.",
    };
  } catch (error) {
    console.log("REQUEST HANDLER ERROR CATCH", error);
    return {
      error: error.message,
      success: false,
    };
  }
};
