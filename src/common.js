export const getCommonHttpRequestProps = () => {
    const props = {credentials: "same-origin"};
    const token = "qwertyuiopasdfghjklzxcvbnm1234567890"
    if (token) {
      props.headers = {Authorization: `Bearer ${token}`};
    }
    return props;
  };

export const getCommonJsonRequestProps = () => {
    const commonHttpRequestProps = getCommonHttpRequestProps();
    const headers = {Accept: "application/json", "Content-Type": "application/json"};
    if (commonHttpRequestProps.headers && commonHttpRequestProps.headers.Authorization) {
      headers.Authorization = commonHttpRequestProps.headers.Authorization;
    }
    return {
      ...commonHttpRequestProps,
      headers,
    };
};

export const throwHttpErrors = (response) => {
    if (response.status >= 400 && response.status <= 599) {
      return new Promise((resolve, reject) => response.text()
        .then(text => reject(new Error(`${response.status} ${response.statusText}}`))));
    }
    return response;
  };