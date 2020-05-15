import React from 'react';
import {withRouter} from 'react-router';
import SignInForm from "../../../components/forms/SignInForm";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import './SignInPage.module.scss';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignInPage({user, error}) {

    if (error?.response && !toast.isActive(1)) {
        const {response: {data}} = error;
        const notify = () => {
            toast(data, {
                toastId: 1,
            });
        };
        notify();
    }

    return (
        <>
            {user ? <Redirect to={'/'}/> : <SignInForm/>}
            {
                error && <ToastContainer/>
            }
        </>
    );
}

const mapStateToProps = state => state.auth;

export default connect(mapStateToProps)(withRouter(SignInPage));