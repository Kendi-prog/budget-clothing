import { all, call, takeLatest, put } from "typed-redux-saga/macro";
import { User, AuthError, AuthErrorCodes } from "firebase/auth";
import { 
    signInSuccess, 
    signInFailed, 
    signUpSuccess, 
    signUpFailed, 
    signOutFailed, 
    signOutSuccess,
    EmailSignInStart,
    SignUpStart, 
    SignUpSuccess,
 } from "./user.action";
import { USER_ACTION_TYPES } from "./user.type";
import { 
    getCurrentUser, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword ,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    AdditionalInformation
} from "../../utils/firebase/firebase.utils";


export function* getSnapshotFromUserAuth(
    userAuth : User, 
    additionalInformation?: AdditionalInformation
) {
    try{
        const userSnapshot = yield* call(
            createUserDocumentFromAuth, 
            userAuth, 
            additionalInformation);

        if(userSnapshot){
            yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        }
    } catch(error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithGoogle() {
    try{
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    } catch(error) {
        yield* put(signInFailed(error as Error));
}
}

export function* signInWithEmail({ payload: { email, password } } : EmailSignInStart) {
    try{
        const userCredentials = yield* call(signInAuthUserWithEmailAndPassword, email, password);
        if(userCredentials){
            const { user } = userCredentials;
            yield* call(getSnapshotFromUserAuth, user);
        }
    }catch(error) {
        const authError = error as AuthError;
        
        if (authError.code === AuthErrorCodes.INVALID_PASSWORD || authError.code === AuthErrorCodes.USER_DELETED) {
            yield* put(signInFailed(new Error("Invalid email or password.")));
        } else if (authError.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
            yield* put(signInFailed(new Error("Too many failed attempts. Please try again later.")));
        } else {
            yield* put(signInFailed(authError)); // Catch other errors
        }
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signUp({ payload: { email, password, displayName } } : SignUpStart) {
    try{
        const userCredentials = yield* call(createAuthUserWithEmailAndPassword, email, password);
        if(userCredentials) {
            const { user } = userCredentials;
            yield* put(signUpSuccess(user, { displayName }));
        }
    } catch(error) {
        yield* put(signUpFailed(error as Error));
    }
}

export function* signOut() {
    try{
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch(error) {
        yield* put(signOutFailed(error as Error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalInformation } }: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalInformation);
}

export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}


export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
    yield* all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}