import { Middleware } from "redux";

import { RootState } from "../store";





export const loggerMiddleWare : Middleware<{}, RootState> = (store) => (next) => (action) => {
    if(!action.type){
        return next(action);
    }

    next(action);
}