import React from "react";
import {createMessageSchema} from "../validationSchema";
import {Form, withFormik} from 'formik';
import {renderFields} from '../formsDataAndUtils/formsUtils';
import {fieldValuesForMessageCreating} from '../formsDataAndUtils/formsData';
import styles from './SendMessageForm.module.scss';
import {chatSocket} from '../../../api/ws';
import store from "../../../store";
import {connect} from 'react-redux';

const handleSubmit = values => {
    const {chat: {currentChat}, auth: {user: {_id}}} = store.getState();
    const {messageBody} = values;
    chatSocket.emit('message', currentChat, messageBody, _id);
    chatSocket.emit('stopTyping', _id, currentChat);
};

function SendMessageForm(props) {

    const {user: {_id, login}, submitForm, currentChat, resetForm, isSubmitting, isValid} = props;

    if (isSubmitting && isValid) {
        setTimeout(() => {
            resetForm();
        }, 1);
    }

    const handleChange = () => {
        chatSocket.emit('startTyping', _id, login, currentChat);
    };

    const onBlurFunction = () => {
        chatSocket.emit('stopTyping', _id, currentChat);
    };

    return (
      <div className={styles.container}>
          <Form>
              {
                  renderFields(fieldValuesForMessageCreating, handleChange, onBlurFunction)
              }
              <div className={styles.confirmButton} onClick={submitForm}>Send ></div>
          </Form>
      </div>
    );
}

const mapStateToProps = state => ({...state.auth, ...state.chat});

export default connect(mapStateToProps)(withFormik({
    mapPropsToValues: () => ({messageBody: '',/* picture: ''*/}),
    validationSchema: createMessageSchema,
    handleSubmit,
})(SendMessageForm));