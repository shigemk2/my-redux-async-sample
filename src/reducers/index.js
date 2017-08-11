import { combineReducers } from 'redux'
import {
  SELECT_BANK, INVALIDATE_BANK,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

const selectedBank = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_BANK:
      return action.bank;
    default:
      return state
  }
};

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_BANK:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      };
    default:
      return state
  }
};

const postsByBank = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_BANK:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.bank]: posts(state[action.bank], action)
      };
    default:
      return state
  }
};

const rootReducer = combineReducers({
  postsByBank,
  selectedBank
});

export default rootReducer
