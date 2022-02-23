import { combineReducers } from 'redux';
import valhallaReducer from './valhalla';

export const rootReducer = combineReducers({
  valhalla: valhallaReducer,
});

const reducers = (state, action) => rootReducer(state, action);

export default reducers;