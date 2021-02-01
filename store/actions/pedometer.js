import { PEDOMETER_ACTIONS } from "./actions";

export const setYesterdayStepCount = (data) => {
  return {
    type: PEDOMETER_ACTIONS.SET_PAST_STEPS,
    payload: data,
  };
};

export const setCurrentAppStepCount = (data) => {
  return {
    type: PEDOMETER_ACTIONS.SET_CURRENT_APP_STEPS,
    payload: data,
  };
};

export const setCurrentDayStepCount = (data) => {
  return {
    type: PEDOMETER_ACTIONS.SET_CURRENT_DAY_STEPS,
    payload: data,
  };
};
