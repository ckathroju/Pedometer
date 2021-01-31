import { PEDOMETER_ACTIONS } from "../actions/actions";

const initialState = {
  currentSteps: 0,
  pastSteps: 0,
};

const pedometerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PEDOMETER_ACTIONS.SET_PAST_STEPS:
      return {
        ...state,
        pastSteps: action.payload,
      };
    case PEDOMETER_ACTIONS.SET_CURRENT_STEPS:
      return {
        ...state,
        currentSteps: action.payload,
      };
    default:
      return state;
  }
};

export default pedometerReducer;
