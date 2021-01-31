import { PEDOMETER_ACTIONS } from "./actions";

export const setPastSteps = (data) => {
  return {
    type: PEDOMETER_ACTIONS.SET_PAST_STEPS,
    payload: data,
  };
};

export const setCurrentSteps = (data) => {
  return {
    type: PEDOMETER_ACTIONS.SET_CURRENT_STEPS,
    payload: data,
  };
};
