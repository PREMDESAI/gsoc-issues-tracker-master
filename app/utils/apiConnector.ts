import axios from "axios";

const axiosInstance = axios.create({});

export const apiConnector = (
  method: String,
  url: String,
  bodyData: any,
  headers: any,
  parameters: any
) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: parameters ? parameters : null,
  });
};
