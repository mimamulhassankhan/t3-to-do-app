import React from 'react';
import styles from './error-messaage.module.scss';

export interface ErrorMessageProps {
    message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className={styles.wrapper}>
            <span className={styles.icon}>！</span>
            <div className={styles.text}>{message}</div>
        </div>
    );
}

export default ErrorMessage;
