import axios from "axios";
import { isIE10, isIE11 } from "utils/browser";

export interface IApiProps {
  method: string;
  url: string;
  params?: object;
  headers?: object;
}

const defaultHeaders = {
  common: {
    "Content-type": "application/json",
    Pragma: "no-cache"
  }
};

export const buildUrlPath = (
  path: string,
  query?: any,
  page?: number
): string => {
  const parseQuery = query !== null ? query : "";
  const params = new URLSearchParams(parseQuery);

  if (page) {
    params.append("page", page.toString());
  }

  const paramsToString = params.toString();
  const url = paramsToString ? `${path}?${paramsToString}` : path;

  return url;
};

export const api = ({
  method,
  url,
  params,
  headers = defaultHeaders
}: IApiProps) =>
  axios({
    method,
    url: `${AppConfig.workspaceBackendUrl}${url}`,
    data: params,
    headers,
    withCredentials: true
  });

const workspaceAPI = axios.create({
  baseURL: AppConfig.workspaceBackendUrl,
  headers: defaultHeaders,
  withCredentials: true
});

// IE10 and IE11 cache concecutive requests to the same
// URL and as result sometimes no requests are being
// triggered, thus making the app to look unresponsive.
// This interceptor adds a `t` param with a timestamp
// to the URL in order to trick the browser.
workspaceAPI.interceptors.request.use(config => {
  if (isIE11() || isIE10()) {
    const t = +new Date();
    const params = { ...config.params, t };
    return { ...config, params };
  } else {
    return config;
  }
});

export const uploadDocAPI = (headers: object = defaultHeaders) =>
  axios.create({
    baseURL: AppConfig.workspaceBackendUrl,
    headers,
    withCredentials: true
  });

// export const downloadDocAPI = (headers: object = defaultHeaders) =>
//   axios.create({
//     baseURL: AppConfig.workspaceBackendUrl,
//     headers,
//     withCredentials: true,
//     responseType: "blob"
//   });

export default workspaceAPI;
