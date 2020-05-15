import {put} from 'redux-saga/effects';
import {createChatCreatingSuccessAction, createChatCreatingErrorAction} from '../actions';
import {createChat} from '../api/http/chatConroller.js';

export function* createChatSaga({values}) {
    try {
        const response = yield createChat(values);
        yield put(createChatCreatingSuccessAction(response.data));
    } catch (e) {
        yield put(createChatCreatingErrorAction(e));
    }
}