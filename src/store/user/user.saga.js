import { all, call, takeLatest, put } from "redux-saga/effects";
import { signInSuccess, signInFailed } from "./user.action";
import { USER_ACTION_TYPES } from "./user.type";
import { getCurrentUser, createUserDocumentFromAuth } from "../../utils/firebase.utils";


export function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
    try{
        const userSnapshot = yield call(
            createUserDocumentFromAuth, 
            userAuth, 
            additionalInformation);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        console.log(userSnapshot);
        console.log(userSnapshot.data());
    } catch(error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}


export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
    yield all([call(onCheckUserSession)]);
}