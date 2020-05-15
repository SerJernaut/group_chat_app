import ACTION_TYPES from '../actions/actionTypes.js';
import _ from 'lodash';

const initialState = {
    chats: new Map(),
    error: null,
    isFetching: false,
};

const loadChatsToMap = chats => {
  const chatsMap = new Map();
  chats.forEach(chat => {
     chatsMap.set(chat._id, chat);
  });
  return chatsMap;
};

function chatsReducer(state = initialState, action ) {

    switch ( action.type ) {
        case ACTION_TYPES.LOAD_CHATS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case ACTION_TYPES.LOAD_CHATS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                chats: loadChatsToMap(action.chats),
            };
        case ACTION_TYPES.LOAD_CHATS_ERROR:
            return {
                ...state,
                error: action.error,
                isFetching: false,
            };



        case ACTION_TYPES.CREATE_CHAT_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case ACTION_TYPES.CREATE_CHAT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                chats: _.clone(state.chats).set(action.chat._id, action.chat),
            };
        case ACTION_TYPES.CREATE_CHAT_ERROR:
            return {
                ...state,
                error: action.error,
                isFetching: false,
            };



        case ACTION_TYPES.JOIN_TO_CHAT_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case ACTION_TYPES.JOIN_TO_CHAT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                chats: _.clone(state.chats).set(action.chat._id, action.chat),
            };
        case ACTION_TYPES.JOIN_TO_CHAT_ERROR:
            return {
                ...state,
                error: action.error,
                isFetching: false,
            };

        default:
            return state;
    }
}

export default chatsReducer;