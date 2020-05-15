import {put} from 'redux-saga/effects';
import {createJoinToChatSuccessAction, createJoinToChatErrorAction} from '../actions';
import {joinToChat} from '../api/http/chatConroller.js';

export function* joinToChatSaga({values}) {
    try {
        const response = yield joinToChat(values);
        yield put(createJoinToChatSuccessAction(response.data));
    } catch (e) {
        yield put(createJoinToChatErrorAction(e));
    }
}