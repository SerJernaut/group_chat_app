import ACTION_TYPES from '../actions/actionTypes.js';
import _ from 'lodash';

const initialState = {
  currentChat: null,
  chatMessages: new Map(),
  chatTypingPersons: new Map(),
  error: null,
  isFetching: false,
};

const loadMessagesToMap = messages => {
  const messagesMap = new Map();
  messages.forEach(message => {
    messagesMap.set(message._id, message);
  });
  return messagesMap;
};


function chatReducer (state = initialState, action) {

  switch (action.type) {

    case ACTION_TYPES.SELECT_CHAT_ACTION:
      return {
        ...state,
        chatMessages: new Map(),
        chatTypingPersons: new Map(),
        currentChat: action.chatId,
      };
    case ACTION_TYPES.LOAD_CHAT_MESSAGES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ACTION_TYPES.LOAD_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        chatMessages: loadMessagesToMap(action.messages),
      };
    case ACTION_TYPES.LOAD_CHAT_MESSAGES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case ACTION_TYPES.LOAD_NEW_MESSAGE_REQUEST:
      return {
        ...state,
        chatMessages: _.clone(state.chatMessages).set(action.message._id, action.message),
      };

    case ACTION_TYPES.ADD_TYPING_PERSON_REQUEST:
      return {
        ...state,
        chatTypingPersons: _.clone(state.chatTypingPersons).set(action._id, action.login),
      };

    case ACTION_TYPES.DELETE_TYPING_PERSON_REQUEST:
      const newMap = _.clone(state.chatTypingPersons);
      newMap.delete(action.person);
      return {
        ...state,
        chatTypingPersons: newMap,
      };


    default:
      return state;
  }

}

export default chatReducer;