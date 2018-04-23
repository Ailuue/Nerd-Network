import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../utils/validation/isEmpty';

const initialState = {
  isAutheticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAutheticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
