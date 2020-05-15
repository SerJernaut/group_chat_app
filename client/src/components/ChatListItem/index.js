import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {createSelectChatAction} from "../../actions";
import classNames from 'classnames';
import {chatSocket} from "../../api/ws";

const ListItem = (props) => {

    const {
        user,
        users,
        chatSelector,
        currentChat,
        chatItemClassName,
        selectedChatClass,
        name, id
    } = props;

    useEffect(() => {
        if (users && users.some(u => u === user._id)) {
            chatSocket.emit('join', id);
        }
    });

    const handleClick = (e) => {
        if (currentChat !== id) {
            chatSelector(id)
        }
    };

    return (
        <li className={classNames(chatItemClassName, {[selectedChatClass]: currentChat === id})}
            onClick={handleClick}>
            <div>
                {
                    name
                }
            </div>
        </li>
    );
};

const mapDispatchToProps = (dispatch) => ({
    chatSelector: (id) => {
        dispatch(createSelectChatAction(id))
    }
});

const mapStateToProps = state => ({...state.chat, ...state.auth});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);