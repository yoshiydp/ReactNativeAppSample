// Constants
import * as TEXT from 'constants/text';
import * as VALUE from 'constants/value';

const regexUserName = VALUE.REGEX_USERNAME;
const regexEmail = VALUE.REGEX_EMAIL;
const regexPassword = VALUE.REGEX_PASSWORD;

export const validateUserName = (userName: string, setState: (value: string) => void) => {
  if (!userName) {
    setState(TEXT.ERROR_EMPTY_USERNAME);
  } else if (!regexUserName.test(userName)) {
    setState(TEXT.ERROR_NOT_FORMAT_USERNAME);
  }
}

export const validateEmail = (email: string, setState: (value: string) => void) => {
  if (!email) {
    setState(TEXT.ERROR_EMPTY_EMAIL);
  } else if (!regexEmail.test(email)) {
    setState(TEXT.ERROR_NOT_FORMAT_EMAIL);
  }
}

export const validatePassword = (password: string, setState: (value: string) => void) => {
  if (!password) {
    setState(TEXT.ERROR_EMPTY_PASSWORD);
  } else if (!regexPassword.test(password) && password.length < 8) {
    setState(TEXT.ERROR_NOT_FORMAT_PASSWORD);
  } else if (!regexPassword.test(password)) {
    setState(TEXT.ERROR_NOT_FORMAT_PASSWORD);
  }
}

export const validateNetworkRequestFailed = (
  setEmailState: (emailValue: string) => void,
  setPasswordState: (passwordValue: string) => void
) => {
  setEmailState(TEXT.ERROR_NETWORK_FAILED);
  setPasswordState(TEXT.ERROR_NETWORK_FAILED);
}

export const validateTooManyRequests = (
  setEmailState: (emailValue: string) => void,
  setPasswordState: (passwordValue: string) => void
) => {
  setEmailState(TEXT.ERROR_TOO_MANY_REQUESTS);
  setPasswordState(TEXT.ERROR_TOO_MANY_REQUESTS);
}
