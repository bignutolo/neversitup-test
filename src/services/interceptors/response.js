export const interceptorResponse = async (response) => {
  const customRes = {
    data: response.data.data,
    resStatusCode: response.status,
    resStatusText: response.statusText,
    resData: response.data,
  };

  // console.log("customRes", customRes);
  return customRes;
};

export const interceptorResponseError = async (error) => {
  console.log("interceptorResponseError:ERROR", error);

  if (error.response === undefined) {
    console.log("error.response", error.response);
    return Promise.reject(error);
  }

  // Reject promise if usual error
  if (error.response) {
    console.log("error.response.status", error.response.status);

    return Promise.reject(error);
  }
};
