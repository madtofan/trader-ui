import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  ReactElement,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useTheme } from '@/lib/theme';

interface ProvidersProps {
  children: ReactElement;
}

export const ThemeContext = createContext([
  'system',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (themeName: string) => {},
]);

export default function Providers({ children }: ProvidersProps): ReactElement {
  const queryClient = new QueryClient();
  const themeChanger = useTheme();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

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
      <ThemeContext.Provider value={providerValue}>
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeContext.Provider>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
