import React from "react";
import {Form, withFormik} from 'formik';
import {signUpSchema} from "../validationSchema";
import styles from './SignUpForm.module.scss';
import { NavLink } from 'react-router-dom';
import {fieldValuesForAuth} from '../formsDataAndUtils/formsData'
import {renderFields} from '../formsDataAndUtils/formsUtils'
import store from '../../../store';
import {createAuthRequestAction} from '../../../actions';

const handleSubmit = values => {
    const formData = new FormData();
    for (let prop in values) {
        formData.append(prop, values[ prop ]);
    }
    store.dispatch(createAuthRequestAction(formData));
};

function SignUpForm(props) {

    return (
        <>
            <div className={styles.formWrapper}>
                <h1>Sign Up</h1>
                <h4>Please fill in this form to create an account</h4>
                <Form className={styles.container}>
                    {
                        renderFields(fieldValuesForAuth)
                    }
                    <div className={styles.confirmButton} onClick={props.submitForm}>Sign Up</div>
                </Form>
            </div>
            <NavLink className={styles.navLink} to='./sign_in'>Already have an account? Login here</NavLink>
        </>
    );
}

export default withFormik({
    mapPropsToValues: () => ({login: '', password: '', confirmPassword: '', profilePicture: ''}),
    validationSchema: signUpSchema,
    handleSubmit,
})(SignUpForm);