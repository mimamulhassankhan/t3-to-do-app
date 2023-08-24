import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.scss';

const Signup = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const { mutateAsync: signup } = useMutation('signup');

    function handleSignup() {
        // try {
        //     await signup({ email, password });
        //     router.push('/dashboard'); // Redirect to dashboard after successful signup
        // } catch (error) {
        //     // Handle error
        //     console.error('Signup failed:', error);
        // }
    }

    return (
        <div className={styles.signupContainer}>
            <h1>Sign Up</h1>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className={styles.signupButton} onClick={handleSignup}>
                Sign Up
            </button>
        </div>
    );
};

export default Signup;
