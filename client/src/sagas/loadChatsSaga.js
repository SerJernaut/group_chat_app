import { put } from 'redux-saga/effects';
import {createLoadChatsErrorAction, createLoadChatsSuccessAction} from '../actions';
import {getAllChats} from '../api/http/chatConroller.js';

export function* loadChatsSaga(action) {
    try {
        const { data } = yield getAllChats();
        yield put( createLoadChatsSuccessAction( data ) );
    } catch ( e ) {
        yield put( createLoadChatsErrorAction( e ) );
    }
}