import React, { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import ErrorMessage from '../helpers/error-message';
import styles from '@/styles/components/form-inputs/common-input.module.scss';

export interface InputFieldProps extends React.HTMLProps<HTMLInputElement> {
    name: string;
    onInput: React.FormEventHandler<HTMLInputElement>;
    formError?: string;
    maxLength?: number;
    errorShowOff?: boolean;
    validationFunction?: (name: string) => void;
    eyeAllowed?: boolean;
}

function InputField({
    label,
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
        <div className={styles.wrapper}>
            <label className={styles.label}>{label}</label>
            <input
                name={name}
                type={type === 'password' ? (eyeAllowed && eyeOpen ? 'text' : type) : type}
                placeholder={placeholder}
                className={styles.field}
                value={value}
                onInput={handleChange}
                maxLength={maxLength}
                onBlur={onBlur}
                onError={onError}
                required={required}
                autoComplete="off"
                aria-autocomplete="none"
            />
            {type === 'password' && eyeAllowed && (
                <div className="input-field__parent__eye-img" onClick={() => setEyeOpen(!eyeOpen)}>
                    {/* <Image
                            src={eyeOpen ? (eyeOn as StaticImageData) : (eyeOff as StaticImageData)}
                            alt={alt ?? ''}
                        /> */}
                </div>
            )}
            {formError && !errorShowOff && <ErrorMessage message={formError} />}
        </div>
    );
}

export default InputField;
