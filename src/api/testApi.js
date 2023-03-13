import { getCommonJsonRequestProps,  getCommonHttpRequestProps, throwHttpErrors } from "../common";
import CookieLib from "../components/cookie-lib";

export const submitTest = (answer, quiz_id) =>
  fetch(`http://localhost:3001/api/ihru/test`, {
    method: "POST",
    ...getCommonJsonRequestProps(),
    body: JSON.stringify({"answer" : answer, "quiz_id" : quiz_id}),
  }).then(response => throwHttpErrors(response))
  .then(response => {
    if (!CookieLib.getCookieToken() || CookieLib.getCookieToken().length == 0) {
      CookieLib.setCookieToken(response.headers.get('Authorization'));
    } 
    return response.json(); 
  });

export const getResult = (test_id) => {
  return fetch(`http://localhost:3001/api/ihru?test_id=${test_id}`, {
    method: "GET",
    ...getCommonHttpRequestProps(),
  }).then(response => throwHttpErrors(response))
  .then(response => {
    if (!CookieLib.getCookieToken() || CookieLib.getCookieToken().length == 0) {
      CookieLib.setCookieToken(response.headers.get('Authorization'));
    } 
    return response.json(); 
  });
}

export const getResults = () => {
  return fetch(`http://localhost:3001/api/ihru/results/resp`, {
    method: "GET",
    ...getCommonHttpRequestProps(),
  }).then(response => throwHttpErrors(response))
    .then(response => {
      if (!CookieLib.getCookieToken() || CookieLib.getCookieToken().length == 0) {
        CookieLib.setCookieToken(response.headers.get('Authorization'));
      } 
      return response.json(); 
    });
}