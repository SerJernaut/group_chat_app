import React from "react";
import styles from './CreateChatForm.module.scss';
import {Form, withFormik} from 'formik';
import store from "../../../store";
import {createChatCreatingRequestAction} from '../../../actions';
import {createChatSchema} from "../validationSchema";
import {renderFields} from '../formsDataAndUtils/formsUtils'
import {fieldValuesForChatCreating} from '../formsDataAndUtils/formsData';
import {chatSocket} from '../../../api/ws';


const handleSubmit = values => {
    store.dispatch(createChatCreatingRequestAction(values));
    chatSocket.emit('newChat');
};

function CreateChatForm(props) {

    const { resetForm, isSubmitting, isValid} = props;

    if (isSubmitting && isValid) {
        setTimeout(() => {
            resetForm();
        }, 1);
    }

    return (
        <>
            <div className={styles.container}>
                <h4>Please fill in this form to create chat</h4>
                <Form>
                    {
                        renderFields(fieldValuesForChatCreating)
                    }
                    <div className={styles.confirmButton} onClick={props.submitForm}>Create chat</div>
                </Form>
            </div>
        </>
    );
}

export default withFormik({
    mapPropsToValues: () => ({chatName: '',}),
    validationSchema: createChatSchema,
    handleSubmit,
})(CreateChatForm);