import {put} from 'redux-saga/effects';
import {createAuthErrorAction, createAuthSuccessAction} from '../actions';
import {loginUser, signUpUser} from '../api/http/authController.js';

export function* authSaga({values}) {
    try {
        const response = values instanceof FormData
            ? yield signUpUser(values)
            : yield loginUser(values);
        yield put(createAuthSuccessAction(response.data));
    } catch (e) {
        yield put(createAuthErrorAction(e));
    }
}


