import React      from 'react';
import classNames from 'classnames';
import styles     from './Input.module.scss';

const Input = ({ field, form, meta: {error, touched}, onChangeFunction, onBlurFunction, ...props }) => {
    const inputClassName = classNames( styles.field, {
        [styles.fieldInvalid]: (touched && error),
        [styles.fieldValid]: (touched && !error),
    } );

    return (
        <label className={styles.container}>
            <input {...field} className={inputClassName} {...props} onChange={(e) => {
                if (onChangeFunction) {
                    onChangeFunction();
                }
                field.onChange(e);
            }} onBlur={e => {
                field.onBlur(e);
                if (onBlurFunction) {
                    onBlurFunction();
                }
            }}/>
            {error && touched && <div className={styles.errorTip}>{error}</div>}
        </label>
    );
};

export default Input;