import { getCommonJsonRequestProps,  getCommonHttpRequestProps, throwHttpErrors } from "../common";

export const submitTest = (answer) =>
  fetch(`http://localhost:3001/api/ihru/test`, {
    method: "POST",
    ...getCommonJsonRequestProps(),
    body: JSON.stringify({"answer" : answer}),
  }).then(response => throwHttpErrors(response))
    .then(response => {
      console.log(response);
      return response.json();
    });

export const getResult = (test_id) => {
  return fetch(`http://localhost:3001/api/ihru?test_id=${test_id}`, {
    method: "GET",
    ...getCommonHttpRequestProps(),
  }).then(response => throwHttpErrors(response))
    .then(response => response.json());
}

export const getResults = () => {
  return fetch(`http://localhost:3001/api/ihru/results/resp`, {
    method: "GET",
    ...getCommonHttpRequestProps(),
  }).then(response => throwHttpErrors(response))
    .then(response => response.json());
}