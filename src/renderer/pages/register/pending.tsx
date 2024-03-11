import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layouts/main-layout';
import { Link } from 'react-router-dom';

export default function PendingPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-screen-xl max-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <p className="mt-4 ">
            Your registration is successful! You have just been sent an email
            containing account activations instructions.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Return to
            <Link className="underline pl-1" to="/">
              login page.
            </Link>
          </p>
          <Button type="submit">Sign in</Button>
        </div>
      </div>
    </MainLayout>
  );
}
