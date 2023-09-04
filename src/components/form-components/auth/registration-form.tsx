import React, { useReducer } from 'react';
import styles from '@/styles/auth/registration-form.module.scss';
import { api } from '@/utils/api';

type FormState = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    privacyPolicy: boolean;
};

type ErrorFormState = Omit<FormState, 'privacyPolicy'> & {
    privacyPolicy: string;
};

type All = FormState | ErrorFormState;

type FormAction<T extends All> = { type: 'CHANGE'; field: keyof T; value: string | boolean };

function formReducer<T extends All>(state: T, action: FormAction<T>): T {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                [action.field]: action.value,
            };
        default:
            return state;
    }
}

const RegistrationForm = () => {
    const { mutateAsync } = api.auth.signup.useMutation();
    const initialState: FormState = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        privacyPolicy: false,
    };
    const errorInitialState: ErrorFormState = { ...initialState, privacyPolicy: '' };

    const [formData, dispatch] = useReducer<React.Reducer<FormState, FormAction<FormState>>>(formReducer, initialState);
    const [formErrors, setFormErrors] = useReducer<React.Reducer<ErrorFormState, FormAction<ErrorFormState>>>(
        formReducer,
        errorInitialState
    );

    function handleChange(field: keyof FormState, value: string | boolean) {
        dispatch({ type: 'CHANGE', field, value });
        if (field !== 'confirmPassword' && formErrors[field]) {
            setFormErrors({ type: 'CHANGE', field, value: '' });
        }
    }

    function handleRepeatPassword(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        const { value } = e.currentTarget;
        if (!formData.password) {
            setFormErrors({ type: 'CHANGE', field: 'password', value: 'Password not yet entered' });
            return;
        } else if (formData.password !== value) {
            setFormErrors({ type: 'CHANGE', field: 'confirmPassword', value: 'Password does not match' });
            return;
        }
        setFormErrors({ type: 'CHANGE', field: 'confirmPassword', value: '' });
        return;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const errors: Partial<ErrorFormState> = {};
        if (!formData.name) {
            errors.name = 'Name is required';
        }
        if (!formData.email) {
            errors.email = 'Email is required';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required';
        }
        if (!formData.privacyPolicy) {
            errors.privacyPolicy = 'Privacy Policy agreement is required';
        }

        // If no errors, proceed with form submission
        if (Object.keys(errors).length === 0) {
            const { confirmPassword, privacyPolicy, ...user } = formData;
            mutateAsync(user)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            Object.entries(errors).map(([key, value]) => {
                setFormErrors({ type: 'CHANGE', field: key as keyof ErrorFormState, value: value });
            });
        }
    }

    return (
        <div className={styles.registrationForm}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    {formErrors.name && <span className={styles.error}>{formErrors.name}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                    {formErrors.email && <span className={styles.error}>{formErrors.email}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                    />
                    {formErrors.password && <span className={styles.error}>{formErrors.password}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        onInput={handleRepeatPassword}
                    />
                    {formErrors.confirmPassword && <span className={styles.error}>{formErrors.confirmPassword}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>
                        <input
                            type="checkbox"
                            checked={formData.privacyPolicy}
                            onChange={() => handleChange('privacyPolicy', !formData.privacyPolicy)}
                        />
                        I agree to the privacy policy
                    </label>
                    {formErrors.privacyPolicy && <span className={styles.error}>{formErrors.privacyPolicy}</span>}
                </div>
                <button type="submit" className={styles.submitButton}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
