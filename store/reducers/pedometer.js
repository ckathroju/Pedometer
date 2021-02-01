import { PEDOMETER_ACTIONS } from "../actions/actions";

const initialState = {
  currentAppStepCount: 0,
  currentDayStepCount: 0,
  yesterdayStepCount: 0,
  goal: 10000,
};

const pedometerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PEDOMETER_ACTIONS.SET_PAST_STEPS:
      return {
        ...state,
        yesterdayStepCount: action.payload,
      };
    case PEDOMETER_ACTIONS.SET_CURRENT_APP_STEPS:
      return {
        ...state,
        currentAppStepCount: action.payload,
      };
    case PEDOMETER_ACTIONS.SET_CURRENT_DAY_STEPS:
      return {
        ...state,
        currentDayStepCount: action.payload,
      };
    default:
      return state;
  }
};

export default pedometerReducer;
