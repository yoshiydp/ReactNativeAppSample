// Constants
import * as TEXT from "constants/text";
import * as VALUE from "constants/value";

const regexEmail = VALUE.REGEX_EMAIL;

export const validateEmail = (email: string, setState: (value: string) => void) => {
  if (!email) {
    setState(TEXT.ERROR_EMPTY_EMAIL);
  } else if (!regexEmail.test(email)) {
    setState(TEXT.ERROR_NOT_FORMAT_EMAIL);
  } else {
    setState(TEXT.ERROR_INVALID_EMAIL);
  }
};

export const validatePassword = (password: string, setState: (value: string) => void) => {
  if (!password) {
    setState(TEXT.ERROR_EMPTY_PASSWORD);
  } else if (password.length < 8) {
    setState(TEXT.ERROR_NOT_ENOUGH_PASSWORD);
  } else {
    setState(TEXT.ERROR_INVALID_PASSWORD);
  }
};

export const validateUserNotFound = (
  setEmailState: (emailValue: string) => void,
  password: string,
  setPasswordState: (passwordValue: string) => void
) => {
  setEmailState(TEXT.ERROR_NOT_FOUND_USER);
  if (password.length < 8) {
    setPasswordState(TEXT.ERROR_NOT_ENOUGH_PASSWORD);
  } else {
    setPasswordState(TEXT.ERROR_INVALID_PASSWORD);
  }
};

export const validateNetworkRequestFailed = (
  setEmailState: (emailValue: string) => void,
  setPasswordState: (passwordValue: string) => void
) => {
  setEmailState(TEXT.ERROR_NETWORK_FAILED);
  setPasswordState(TEXT.ERROR_NETWORK_FAILED);
};

export const validateTooManyRequests = (
  setEmailState: (emailValue: string) => void,
  setPasswordState: (passwordValue: string) => void
) => {
  setEmailState(TEXT.ERROR_TOO_MANY_REQUESTS);
  setPasswordState(TEXT.ERROR_TOO_MANY_REQUESTS);
};
