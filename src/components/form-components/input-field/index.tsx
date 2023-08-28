import React, { type HTMLInputTypeAttribute, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import eyeOff from '@/public/icons/eye-slash.svg';
import eyeOn from '@/public/icons/eye-open.svg';
import ErrorMessage from '../helpers/error-message';
import './input-field.module.scss';

export interface InputFieldProps extends React.HTMLProps<HTMLInputElement> {
    type: HTMLInputTypeAttribute;
    name: string;
    onInput: React.FormEventHandler<HTMLInputElement>;
    formError?: string;
    maxLength?: number;
    errorShowOff?: boolean;
    validationFunction?: (name: string) => void;
    eyeAllowed?: boolean;
}

function InputField({
    required,
    type,
    name,
    value,
    placeholder,
    onInput,
    formError,
    maxLength,
    errorShowOff,
    onBlur,
    validationFunction,
    eyeAllowed,
    onError,
    alt,
}: InputFieldProps) {
    const [eyeOpen, setEyeOpen] = useState(false);

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        onInput(e);
        if (formError && validationFunction) {
            validationFunction(name);
        }
    }

    return (
        <div className="input-field">
            <div className="input-field__parent">
                <input
                    name={name}
                    type={type === 'password' ? (eyeAllowed && eyeOpen ? 'text' : type) : type}
                    placeholder={placeholder}
                    className={`input-field__input ${formError && 'input-field__input--error'}`}
                    value={value}
                    onInput={handleChange}
                    maxLength={maxLength}
                    onBlur={onBlur}
                    onError={onError}
                    required={required}
                />
                {type === 'password' && eyeAllowed && (
                    <div className="input-field__parent__eye-img" onClick={() => setEyeOpen(!eyeOpen)}>
                        <Image
                            src={eyeOpen ? (eyeOn as StaticImageData) : (eyeOff as StaticImageData)}
                            alt={alt ?? ''}
                        />
                    </div>
                )}
            </div>
            {formError && !errorShowOff && <ErrorMessage message={formError} />}
        </div>
    );
}

export default InputField;
