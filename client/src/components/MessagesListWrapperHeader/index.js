import React, { Component} from "react";
import {chatSocket} from '../../api/ws';
import {connect} from 'react-redux';
import {createAddTypingPersonAction, createDeleteTypingPersonAction} from "../../actions";

class MessagesListWrapperHeader extends Component {

    componentDidMount() {
        chatSocket.on('typing', (_id, login, chat) => {
            const {currentChat, chatTypingPersons, addTypingPerson, user} = this.props;

            if (chat === currentChat && chatTypingPersons && !chatTypingPersons.get(_id) && _id !== user._id) {

                addTypingPerson(_id, login);
            }

        });

        chatSocket.on('stop_typing', (_id, chat) => {
            const {currentChat, deleteTypingPerson} = this.props;
            if (chat === currentChat) {
                deleteTypingPerson(_id);
            }
        });
    }

    createUserText = (person, arraySize, index) => {
        if (arraySize - 1 === index) {
            return `${person}`
        } else {
            return `${person},`
        }
    };

    renderTypingPersons = () => {
        const {chatTypingPersons} = this.props;
        if (chatTypingPersons.size > 0) {
            return [...chatTypingPersons.values()].map((person, index) => <li
                key={index}>{this.createUserText(person, chatTypingPersons.size, index)}</li>)
        }
        return null;
    };

    render() {

        const {className} = this.props;

        return (
            <header className={className}>
                <h5>Typing users: </h5>
                <ul>
                    {
                        this.renderTypingPersons()
                    }
                </ul>
            </header>
        );
    }
}

const mapStateToProps = state => ({...state.chat, ...state.auth});

const mapDispatchToProps = (dispatch) => ({
    addTypingPerson: (id, login) => {
        dispatch(createAddTypingPersonAction(id, login))
    },
    deleteTypingPerson: (id) => {
        dispatch(createDeleteTypingPersonAction(id))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesListWrapperHeader)