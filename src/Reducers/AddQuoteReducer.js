import _ from 'lodash'
import {ADD_QUOTE_SET_CONTENT,
        ADD_QUOTE_SET_FROM,
        ADD_QUOTE_SUBMIT_FINISH} from '../Actions'

const initialState = {
  content: '',
  from: '',
  ready: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUOTE_SET_CONTENT:
      const newState = Object.assign(state, action.payload);
      return newState;

    case ADD_QUOTE_SET_FROM:
      const newState1 = Object.assign(state, action.payload, {ready: true});
      return newState1;

    case ADD_QUOTE_SUBMIT_FINISH:
      const newState2 = Object.assign(state, {ready: false});
      return newState2;

    default:
      return state;
  }
}
