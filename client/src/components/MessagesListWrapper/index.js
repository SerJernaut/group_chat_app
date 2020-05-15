import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './MessageListWrapper.module.scss';
import {createJoinToChatRequestAction, createLoadNewMessageRequestAction} from "../../actions";
import MessageList from "../MessageList";
import SendMessageForm from "../forms/SendMessageForm";
import MessagesListWrapperHeader from "../MessagesListWrapperHeader";
import {chatSocket} from "../../api/ws";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MIDISounds from 'midi-sounds-react';

class MessagesListWrapper extends Component {

    componentDidMount() {
        chatSocket.on('new_message', (chatId, message) => {
            const {chats, user, loadNewMessage, currentChat} = this.props;
            const {authorId: {login, _id}, body} = message;
            if (user._id !== _id && !toast.isActive(message._id) && chats) {
                const chatName = chats.get(chatId).name;
                const notify = () => {
                    toast(`${login} wrote to ${chatName}: ${body}`, {
                        toastId: message._id
                    });
                };
                this.midiSounds.playChordNow(1, [40], 1.0);
                //const audio = new Audio('./notification.mp3');
                //audio.play();
                notify();
            }
            if (chatId === currentChat) {
                loadNewMessage(message);
            }
        });
    }

    checkIfUserInChat = () => {
        const {chats, currentChat, user} = this.props;
        if (chats && currentChat) {
            return chats.get(currentChat).users.some(u => u === user._id);
        }
        return false;
    };

    render() {
        const {currentChat, joinToChat} = this.props;
        return (
            <div className={styles.container}>
                <ToastContainer/>
                <MIDISounds ref={(ref) => (this.midiSounds = ref)}/>
                <MessagesListWrapperHeader className={styles.chatHeader}/>
                <ul className={styles.messagesContainer}>
                    {
                        currentChat
                            ? this.checkIfUserInChat()
                            ? (<MessageList/>)
                            : (<li>
                                <button onClick={() => {
                                    joinToChat(currentChat)
                                }}>Join to chat
                                </button>
                            </li>)
                            : (<li>Select chat</li>)
                    }
                </ul>
                {
                    currentChat && this.checkIfUserInChat() && <SendMessageForm/>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({...state.auth, ...state.chats, ...state.chat});

const mapDispatchToProps = dispatch => {
    return {
        joinToChat: (data) => {
            dispatch(createJoinToChatRequestAction(data));
        },
        loadNewMessage: (message) => {
            dispatch(createLoadNewMessageRequestAction(message))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesListWrapper);