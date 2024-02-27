import Icons from '@/components/icons';
import MainLayout from '@/components/layouts/main-layout';
import { useVerifyRegistration } from '@/hooks/userApi';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function VerifyPage() {
  const navigate = useNavigate();
  const { token } = useParams();
  const { isLoading, isError } = useVerifyRegistration(token || '');

  if (isError) {
    navigate('/');
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-screen-xl max-h-screen px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <div className="flex items-center text-sm text-muted-foreground">
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-screen-xl max-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Registration Verified
          </h1>

          <p className="mt-4 ">
            You may now log in to the system with your credentials
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <Link className="underline pl-1" to="/">
              Back to login page
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
