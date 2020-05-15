import { put } from 'redux-saga/effects';
import {createLoadChatMessagesSuccessAction, createLoadChatMessagesErrorAction} from '../actions';
import {getChatMessages} from '../api/http/chatConroller.js';

export function* loadChatMessagesSaga({value}) {
    try {
        const { data } = yield getChatMessages(value);
        yield put( createLoadChatMessagesSuccessAction( data ) );
    } catch ( e ) {
        yield put( createLoadChatMessagesErrorAction( e ) );
    }
}