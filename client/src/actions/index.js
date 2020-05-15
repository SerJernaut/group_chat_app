import ACTION_TYPES from './actionTypes.js';

export const createAuthRequestAction = (values) => ( {
  type: ACTION_TYPES.AUTH_REQUEST,
  values,
} );

export const createAuthSuccessAction = (user) => ( {
  type: ACTION_TYPES.AUTH_SUCCESS,
  user,
} );

export const createAuthErrorAction = (error) => ( {
  type: ACTION_TYPES.AUTH_ERROR,
  error,
} );

export const createLoadChatsRequestAction = () => ( {
  type: ACTION_TYPES.LOAD_CHATS_REQUEST,
} );

export const createLoadChatsSuccessAction  = (chats) => ( {
  type: ACTION_TYPES.LOAD_CHATS_SUCCESS,
  chats,
} );

export const createLoadChatsErrorAction = (error) => ( {
  type: ACTION_TYPES.LOAD_CHATS_ERROR,
  error,
} );

export const createSelectChatAction = (chatId) => ( {
  type: ACTION_TYPES.SELECT_CHAT_ACTION,
  chatId,
} );

export const createLoadChatMessagesRequestAction = ( value ) => ( {
  type: ACTION_TYPES.LOAD_CHAT_MESSAGES_REQUEST,
  value,
} );

export const createLoadChatMessagesSuccessAction = (messages) => ( {
  type: ACTION_TYPES.LOAD_CHAT_MESSAGES_SUCCESS,
  messages,
} );

export const createLoadChatMessagesErrorAction = ( error ) => ( {
  type: ACTION_TYPES.LOAD_CHAT_MESSAGES_ERROR,
  error
} );

export const createChatCreatingRequestAction = (values) => ( {
  type: ACTION_TYPES.CREATE_CHAT_REQUEST,
  values,
} );

export const createChatCreatingSuccessAction = (chat) => ( {
  type: ACTION_TYPES.CREATE_CHAT_SUCCESS,
  chat,
} );

export const createChatCreatingErrorAction = (error) => ( {
  type: ACTION_TYPES.CREATE_CHAT_ERROR,
  error,
} );

export const createJoinToChatRequestAction = (values) => ( {
  type: ACTION_TYPES.JOIN_TO_CHAT_REQUEST,
  values,
} );

export const createJoinToChatSuccessAction = (chat) => ( {
  type: ACTION_TYPES.JOIN_TO_CHAT_SUCCESS,
  chat,
} );

export const createJoinToChatErrorAction = (error) => ( {
  type: ACTION_TYPES.JOIN_TO_CHAT_ERROR,
  error,
} );

export const createLoadNewMessageRequestAction = (message) => ( {
  type: ACTION_TYPES.LOAD_NEW_MESSAGE_REQUEST,
  message,
} );

export const createAddTypingPersonAction = (_id, login) => ( {
  type: ACTION_TYPES.ADD_TYPING_PERSON_REQUEST,
  _id,
  login,
} );

export const createDeleteTypingPersonAction = (person) => ( {
  type: ACTION_TYPES.DELETE_TYPING_PERSON_REQUEST,
  person,
} );