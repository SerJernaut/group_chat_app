import http from "./index";

export const getAllChats = () =>
    http.get( '/chat_list', {
        headers: {
            'Content-type': 'application/json',
        },

    } );

export const getChatMessages = ( chatId ) =>
    http.get( `/chat/${chatId}/message`, {
        headers: {
            'Content-type': 'application/json',
        }
    } );

export const createChat = async (data) => {
    try {
        return await http.post('/chat', data, {
            headers: {
                'Content-type': 'application/json',
            }
        })
    } catch (e) {
        throw e;
    }
};

export const joinToChat = async ( chatId  ) => {
    try {
        return await http.post(`/chat/${chatId}/users`, null,{
            headers: {
                'Content-type': 'application/json',
            }
        })
    } catch (e) {
        throw e;
    }
};