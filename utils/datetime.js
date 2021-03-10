export const dateToEpoch = (date) => {
  return date.getTime() / 1000;
};

export const epochToDate = (seconds) => {
  const date = new Date(0);
  date.setUTCSeconds(seconds);
  return date;
};

export const getCurrentDate = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getPreviousDate = (days) => {
  let date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - days);
  return date;
};

export const getCurrentDateInEpoch = () => {
  return dateToEpoch(getCurrentDate());
};
