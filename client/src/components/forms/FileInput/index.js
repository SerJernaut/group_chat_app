import React      from 'react';
import styles     from '../Input/Input.module.scss';
import classNames from 'classnames';

const FileInput = ({ field, form, meta: {error, touched}, onChangeFunction, onBlurFunction, ...props }) => {

    const inputClassName = classNames( styles.field, {
        [styles.fieldInvalid]: (touched && error),
        [styles.fieldValid]: (touched && !error),
    } );

    const handleImageChange = e => {
        let file = e.target.files[0];
        if (file) {
            form.setFieldValue(field.name, file);
        }
    };
    return (
        <label className={styles.container}>
            <input {...field} className={inputClassName} {...props} onChange={handleImageChange} value='' title='Image'/>
            {error && touched && <div className={styles.errorTip}>{error}</div>}
        </label>
    );
};

export default FileInput;