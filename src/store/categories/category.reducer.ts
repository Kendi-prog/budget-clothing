import { AnyAction } from "redux";
import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import { CategoryAction, fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";


export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoriesReducer = (
    state= CATEGORIES_INITIAL_STATE, 
    action= {} as AnyAction
) : CategoriesState => {
    if(fetchCategoriesStart.match(action)) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if(fetchCategoriesSuccess.match(action)) {
        return {
            ...state,
            isLoading: false,
            categories: action.payload
        }
    }

    if(fetchCategoriesFailed.match(action)) {
        return {
            ...state,
            isLoading: false,
            error: action.payload
        }
    }

    return state;
   
}