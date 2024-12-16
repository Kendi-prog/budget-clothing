//import { configureStore } from "@reduxjs/toolkit";
import { compose, createStore, applyMiddleware } from "redux";
//import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const loggerMiddleWare = (state) => (next) => (action) => {
    if(!action.type){
        return next(action);
    }

    next(action);
}

const middleWares = [loggerMiddleWare];

const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composeEnhancers);

/* export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(logger), // Add redux-logger
});*/