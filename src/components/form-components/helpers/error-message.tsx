import React from 'react';
import './error-messaage.module.scss';

export interface ErrorMessageProps {
    message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className="error-message">
            <span className="error-message__icon">！</span>
            <div className="error-message__text">{message}</div>
        </div>
    );
}

export default ErrorMessage;
