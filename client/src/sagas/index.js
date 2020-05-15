import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from '../actions/actionTypes.js';
import {authSaga} from './authSaga.js';
import {loadChatsSaga} from "./loadChatsSaga.js";
import {createChatSaga} from "./createChatSaga";
import {joinToChatSaga} from "./jointToChatSaga";
import {loadChatMessagesSaga} from "./loadChatMessagesSaga";

export default function * () {
  yield takeLatest(ACTION_TYPES.AUTH_REQUEST, authSaga);
  yield takeLatest(ACTION_TYPES.LOAD_CHATS_REQUEST, loadChatsSaga);
  yield takeLatest(ACTION_TYPES.CREATE_CHAT_REQUEST, createChatSaga);
  yield takeLatest(ACTION_TYPES.JOIN_TO_CHAT_REQUEST, joinToChatSaga);
  yield takeLatest(ACTION_TYPES.LOAD_CHAT_MESSAGES_REQUEST, loadChatMessagesSaga);
}