import { put, delay } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "axios";

export function* logoutSaga(action) {
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("expirationDate");
    yield localStorage.removeItem("userId");
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    const timeout = action.expirationTime * 1000;
    yield delay(timeout);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9vsq4IfJSBPL2GvzpU4HZ-q5Dj0eNd2c";
    if (!action.isSignup) {
        url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9vsq4IfJSBPL2GvzpU4HZ-q5Dj0eNd2c";
    }
    try {
        const response = yield axios.post(url, authData, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const expirationDate = new Date(
            new Date().getTime() + response.data.expiresIn * 1000
        );
        yield localStorage.setItem("token", response.data.idToken);
        yield localStorage.setItem("expirationDate", expirationDate);
        yield localStorage.setItem("userId", response.data.localId);
        yield put(actions.authSuccess(response.data));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (err) {
        yield put(actions.authFail(err.message));
    }
}

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem("token");
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(
            localStorage.getItem("expirationDate")
        );
        if (expirationDate < new Date()) {
            yield put(actions.logout());
        } else {
            const localId = yield localStorage.getItem("userId");
            yield put(
                actions.authSuccess({ idToken: token, localId: localId })
            );
            yield put(
                actions.checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                )
            );
        }
    }
}
