import React from "react";
import styles from './Message.module.scss';
import classNames from 'classnames';
import {connect} from "react-redux";

function Message(props) {

    const {body, authorId, authorId: {login, profilePicture}, user} = props;

    return (
        <li className={classNames(styles.container, {[styles.ourMessage]: authorId._id === user._id} )}>
            <div className={styles.authorData}>
                <img src={profilePicture} alt='avatar' onError={(e) => {
                    e.target.src = 'https://www.barcamania.com/sites/default/files/no_avatar.jpg';
                }}/>
                <h5>{login}</h5>
            </div>
            <p>{body}</p>
        </li>
    )
}

const mapStateToProps = state => state.auth;

export default connect(mapStateToProps)(Message);