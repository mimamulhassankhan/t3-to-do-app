import RegistrationForm from '@/components/form-components/auth/registration-form';
import { type NextPageWithLayout } from '../_app';

const RegisterPage: NextPageWithLayout = () => {
    return (
        <div>
            <h1>User Registration</h1>
            <RegistrationForm />
        </div>
    );
};

export default RegisterPage;
