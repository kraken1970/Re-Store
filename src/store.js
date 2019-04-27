import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import reducer from "./reducers";
// next - по сути - следующий dispatch
const logMiddleware = ({ getState }) => next => action => {
  console.log(action.type, getState());
  return next(action);
};

const stringMiddleware = () => next => action => {
  if (typeof action === "string") {
    return next({
      type: action
    });
  }
  return next(action);
};

//!ВАЖНО соблюдать порядок:

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware)
);

const delayedActionCreator = timeout => dispatch => {
  setTimeout(
    () =>
      dispatch({
        type: "DELAYED_ACTION"
      }),
    timeout
  );
};

store.dispatch(delayedActionCreator(3000));

export default store;
