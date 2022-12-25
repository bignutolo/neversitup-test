import httpClient from "../httpClient";

export async function request(config) {
  const response = await httpClient(config);
  let _return;

  if (response.resStatusCode === 200) {
    _return = {
      data: { ...response.resData },
      status: response.resStatusCode,
    };
  } else {
    _return = {
      data: { ...response.data.data },
      status: response.status,
    };
  }
  return _return;
}
