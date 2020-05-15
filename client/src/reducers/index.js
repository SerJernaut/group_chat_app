import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import chatReducer from './chatReducer.js';
import chatsReducer from "./chatsReducer";

export default combineReducers({
  auth: authReducer,
  chat: chatReducer,
  chats: chatsReducer,

});