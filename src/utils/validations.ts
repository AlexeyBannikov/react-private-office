export const loginValidation = (login: string) => {
  if (login.length >= 3 && !(login.trim() === '')) {
    return true;
  }

  return false;
};

export const passwordValidation = (password: string) => {
  if (password.length >= 3 && !(password.trim() === '')) {
    return true;
  }

  return false;
};

export const deviceValidation = (device: string) => {
  if (device.length >= 3 && !(device.trim() === '')) {
    return true;
  }

  return false;
};
