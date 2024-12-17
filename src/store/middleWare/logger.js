export const loggerMiddleWare = (state) => (next) => (action) => {
    if(!action.type){
        return next(action);
    }

    next(action);
}