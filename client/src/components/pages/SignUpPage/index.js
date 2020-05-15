import React          from 'react';
import { withRouter } from 'react-router';
import SignUpForm from "../../../components/forms/SignUpForm";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import './SignUpPage.module.scss';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpPage({user, error}) {

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
            {user ? <Redirect to={'/'}/> : <SignUpForm/>}
            {
                error && <ToastContainer/>
            }
        </>
    );
}

const mapStateToProps = state => state.auth;

export default connect(mapStateToProps)(withRouter(SignUpPage));