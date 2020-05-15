import React from 'react';
import {Field} from 'formik';

export const withField = (WrappedComponent, key) => (fieldOptions) => {

    return (inputProps, onChangeFunction, onBlurFunction) => {

        return (
            <Field key={key} {...fieldOptions}>
                {
                    fieldProps => <WrappedComponent {...fieldProps} {...inputProps} onChangeFunction={onChangeFunction}
                                                    onBlurFunction={onBlurFunction}/>
                }
            </Field>
        );
    }
};

export const renderFields = (fieldsValues, onChangeFunction, onBlurFunction) => {
    return fieldsValues.map((fieldValuesForAuth, key) => {
        const {component, fieldOptions, inputProps} = fieldValuesForAuth;
        return withField(component, key)(fieldOptions)(inputProps, onChangeFunction, onBlurFunction);
    })
};