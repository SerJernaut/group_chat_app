import React, {Component} from "react";
import {chatSocket} from "../../api/ws";
import {connect} from 'react-redux';
import {createLoadChatMessagesRequestAction} from "../../actions";
import Message from "../Message";

class MessageList extends Component {

    constructor(props) {
        super(props);
        this.messagesEndRef = React.createRef()
    }

    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView()
    };

    componentDidMount() {
        const {loadMessages, currentChat, loadNewMessage, user, chats} = this.props;
        chatSocket.emit('join', currentChat);
        loadMessages(currentChat);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const {loadMessages, currentChat} = this.props;
        if (prevProps.currentChat !== currentChat) {
            chatSocket.emit('join', currentChat);
            loadMessages(currentChat);
        }
        this.scrollToBottom();
    }

    renderMessages = () => {
        const {chatMessages} = this.props;
        if (chatMessages) {
            return [...chatMessages.values()].map(message => <Message key={message._id} {...message}/>)
        }
        return null;
    };

    render() {
        const {isFetching, chatMessages} = this.props;
        return (
            <>
                {
                    isFetching && chatMessages.size === 0
                        ? (<li key={1}>LOADING...</li>)
                        : this.renderMessages()
                }
                <li key={2} ref={this.messagesEndRef}/>
            </>
        );
    }
}

const mapStateToProps = state => state.chat;

const mapDispatchToProps = (dispatch) => ({
    loadMessages: (chatId) => {
        dispatch(createLoadChatMessagesRequestAction(chatId))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);