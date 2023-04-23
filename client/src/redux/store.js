import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./reducer";
import thunkMidddleware from "redux-thunk";

const commposeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore(
    rootReducer,
    commposeEnhancer(applyMiddleware(thunkMidddleware))
);

export default store; 