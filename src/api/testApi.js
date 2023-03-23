import { getCommonJsonRequestProps,  getCommonHttpRequestProps, throwHttpErrors } from "../common";
import CookieLib from "../components/cookie-lib";

//read env variable
const host = process.env.REACT_APP_HOST_NAME;

export const submitTest = (answer, quiz_id) =>
  fetch(`${host}/api/ihru/test`, {
    method: "POST",
    ...getCommonJsonRequestProps(),
    body: JSON.stringify({"answer" : answer, "quiz_id" : quiz_id}),
  }).then(response => {
    if (response.headers.get('Authorization') && response.headers.get('Authorization').length > 0) {
      CookieLib.setCookieToken(response.headers.get('Authorization').replace('Bearer ', ''));
    }
    return response;
  })
  .then(response => throwHttpErrors(response))
    .then(response => response.json());

export const getResult = (test_id) => {
  return fetch(`${host}/api/ihru?test_id=${test_id}`, {
    method: "GET",
    ...getCommonHttpRequestProps(),
  }).then(response => {
    if (response.headers.get('Authorization') && response.headers.get('Authorization').length > 0) {
      CookieLib.setCookieToken(response.headers.get('Authorization').replace('Bearer ', ''));
    }
    return response;
  })
  .then(response => throwHttpErrors(response))
    .then(response => response.json());
}

export const getResults = () => {
  return fetch(`${host}/api/ihru/results/resp`, {
    method: "GET",
    ...getCommonHttpRequestProps(),
  }).then(response => {
    if (response.headers.get('Authorization') && response.headers.get('Authorization').length > 0) {
      CookieLib.setCookieToken(response.headers.get('Authorization').replace('Bearer ', ''));
    }
    return response;
  })
  .then(response => throwHttpErrors(response))
    .then(response => response.json());
};