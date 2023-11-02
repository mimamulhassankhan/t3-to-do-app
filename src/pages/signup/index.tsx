import RegistrationForm from '@/components/form-components/auth/registration-form';
import AuthLayout from '@/components/layouts/auth/layout';
import { type NextPageWithLayout } from '../_app';

const UserRegistrationPage: NextPageWithLayout = () => {
    return (
        <div>
            <h1>User Registration</h1>
            <RegistrationForm />
        </div>
    );
};

UserRegistrationPage.getLayout = function getLayout(page: React.ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};

export default UserRegistrationPage;
