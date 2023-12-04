import React, { useReducer } from 'react';
import styles from '@/styles/auth/user-registration.module.scss';
import { api } from '@/utils/api';
import InputField from '../input-field';
import CheckBox from '../check-box';
import { signIn } from 'next-auth/react';

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
        <div className={styles.form_container}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <h1 className={styles.title}>Sign up</h1>
                <p className={styles.alredy_member_message}>If you already have an account register</p>
                <p className={styles.login_message}>
                    <span>You can </span>
                    <button
                        type="button"
                        className={styles.login_link}
                        onClick={() =>
                            void signIn('credentials', {
                                callbackUrl: '/dashboard',
                            })
                        }
                    >
                        Login here !
                    </button>
                </p>
                <div className={styles.field_wrapper}>
                    <InputField
                        required
                        label="Name"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onInput={(e) => handleChange('name', e.currentTarget.value)}
                        formError={formErrors.name}
                    />
                </div>
                <div className={styles.field_wrapper}>
                    <InputField
                        required
                        label="Email"
                        placeholder="Enter your email address"
                        name="email"
                        value={formData.email}
                        onInput={(e) => handleChange('email', e.currentTarget.value)}
                        formError={formErrors.email}
                    />
                </div>
                <div className={styles.field_wrapper}>
                    <InputField
                        required
                        type="password"
                        label="Password"
                        placeholder="Enter your Password"
                        name="password"
                        value={formData.password}
                        onInput={(e) => handleChange('password', e.currentTarget.value)}
                        formError={formErrors.password}
                    />
                </div>
                <div className={styles.field_wrapper}>
                    <InputField
                        required
                        type="password"
                        label="Confrim Password"
                        placeholder="Confrim your Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.currentTarget.value)}
                        onInput={handleRepeatPassword}
                        formError={formErrors.confirmPassword}
                    />
                </div>
                <div className={styles.field_wrapper}>
                    <CheckBox
                        required
                        label="I agree to the privacy policy"
                        name="privacyPolicy"
                        checked={formData.privacyPolicy}
                        onChange={() => handleChange('privacyPolicy', !formData.privacyPolicy)}
                        error={formErrors.privacyPolicy}
                    />
                </div>
                <button type="submit" className={styles.submit_btn}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
