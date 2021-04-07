const MONTH_MAP = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sept",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

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

export const getDateString = (date) => {
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
};

export const getDateMonthString = (date) => {
  return `${MONTH_MAP[date.getMonth()]} ${date.getDate()}`;
};
