import RegistrationForm from '@/components/form-components/auth/registration-form';
import AuthLayout from '@/components/layouts/auth/layout';
import { type NextPageWithLayout } from '../_app';

const UserRegistrationPage: NextPageWithLayout = () => {
    return <RegistrationForm />;
};

UserRegistrationPage.getLayout = function getLayout(page: React.ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};

export default UserRegistrationPage;
