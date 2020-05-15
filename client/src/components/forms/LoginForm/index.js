import React from 'react';
import Input from '../Input';
import { Field, Formik, Form } from 'formik';

let LoginForm = props => {

  const { onSubmit } = props;

  return (
    <Formik onSubmit={ onSubmit } initialValues={ {
      email: '',
      password: '',
    } }>
      {
        ({}) => (
          <Form>
            <Field name={ 'email' }>{
              (props) => ( <Input label={ 'Email: ' } { ...props }/> )
            }</Field>
            <Field name={ 'password' }>{
              (props) => ( <Input label={ 'Password: ' } { ...props }/> )
            }</Field>
            <button type={ 'submit' }>login</button>
          </Form>
        )
      }
    </Formik>
  );
};

export default LoginForm;
