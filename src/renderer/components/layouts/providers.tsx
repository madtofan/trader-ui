import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  ReactElement,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { useTheme } from '@/lib/theme';
import { STORE_CHANNELS, ElectronContextType } from '@/../shared-types';

interface ProvidersProps {
  children: ReactElement;
}

export const ElectronContext = createContext<ElectronContextType>({});

export const ThemeContext = createContext([
  'system',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (themeName: string) => { },
]);

export default function Providers({ children }: ProvidersProps): ReactElement {
  const queryClient = new QueryClient();
  const themeChanger = useTheme();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [electronContext, setElectronContext] = useState({});

  useEffect(() => {
    window.electron.ipcRenderer.on(STORE_CHANNELS.Update, (arg) => {
      setElectronContext(arg as ElectronContextType);
    });
  }, []);

  const setThemeCallback = useCallback(
    (themeName: string) => {
      themeChanger(themeName);
      setTheme(themeName);
    },
    [themeChanger],
  );

  const providerValue = useMemo(
    () => [theme, setThemeCallback],
    [setThemeCallback, theme],
  );

  return (
    <QueryClientProvider client={queryClient} contextSharing>
      <ElectronContext.Provider value={electronContext}>
        <ThemeContext.Provider value={providerValue}>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeContext.Provider>
      </ElectronContext.Provider>
      <Toaster />
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
