import React, { useId } from 'react';
import styles from '@/styles/components/form-inputs/checkbox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> & {
    label: string;
    error: string;
};

function CheckBox({ label, error = '', ...rest }: CheckBoxProps) {
    const checkBoxId = useId();
    return (
        <React.Fragment>
            <div className={styles.wrapper}>
                <input
                    {...rest}
                    className={[styles.field, error ? styles.field__error : ''].join(' ')}
                    type="checkbox"
                    id={checkBoxId}
                    aria-errormessage={error}
                />
                <label className={styles.label} htmlFor={checkBoxId}>
                    {label}
                </label>
            </div>
            {error && <h6 className={styles.error_message}>{'! ' + error}</h6>}
        </React.Fragment>
    );
}

export default CheckBox;
