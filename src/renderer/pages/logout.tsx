import Icons from '@/components/icons';
import MainLayout from '@/components/layouts/main-layout';
import { useEffect } from 'react';
import { CONTEXT_KEYS, STORE_CHANNELS } from '../../shared-types';

function Logout() {
  useEffect(() => {
    localStorage.setItem('bearerToken', '');
    localStorage.setItem('refreshToken', '');
    window.electron.ipcRenderer.invoke(
      STORE_CHANNELS.Set,
      CONTEXT_KEYS.loggedIn,
      false,
    );
    window.location.href = '/';
  }, []);

  return (
    <MainLayout>
      <div className="mx-auto max-w-screen-xl max-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            Logging out...
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Logout;
