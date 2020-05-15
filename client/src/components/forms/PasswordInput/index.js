import React, {Component} from 'react';
import classNames from 'classnames';
import styles from '../Input/Input.module.scss';
import {mdiEyeOffOutline, mdiEyeOutline} from '@mdi/js';
import Icon from '@mdi/react';

class PasswordInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true,
        }
    }

    toggleEye = () => {
        this.setState({
            isHidden: !this.state.isHidden,
        })
    };

    renderEyeIcon = () => {
        const {isHidden} = this.state;
        return (
            <Icon className={styles.eyeIcon} onClick={this.toggleEye}
                  path={isHidden
                      ? mdiEyeOutline
                      : mdiEyeOffOutline} size={1}
            />
        );
    };

    render() {
        const {field, form, meta: {error, touched}, onChangeFunction, onBlurFunction, ...props} = this.props;
        const {isHidden} = this.state;
        const inputClassName = classNames(styles.field, {
            [styles.fieldInvalid]: (touched && error),
            [styles.fieldValid]: (touched && !error),
        });

        return (
            <label className={styles.container}>
                <input {...field} className={inputClassName} {...props} type={isHidden ? 'password' : 'text'}/>
                {
                    this.renderEyeIcon()
                }
                {error && touched && <div className={styles.errorTip}>{error}</div>}
            </label>
        );
    }
}

export default PasswordInput;
