/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { useTheme } from '@/lib/utils';
import { STORE_CHANNELS, ElectronContextType, Flow } from '@/../shared-types';
import {
  Edge,
  ReactFlowProvider,
  Node,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { initialEdges, initialNodes } from '@/lib/config/flow';

interface ProvidersProps {
  children: ReactElement;
}

export const ElectronContext = createContext<ElectronContextType>({});

interface FlowEditorContextInterface extends Flow {
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>;
  setNodes: Dispatch<SetStateAction<Node<any>[]>>;
}

export const FlowEditorContext = createContext<FlowEditorContextInterface>({
  edges: [],
  setEdges: (edges: any) => { },
  nodes: [],
  setNodes: (nodes: any) => { },
});

export const ThemeContext = createContext([
  'system',
  (themeName: string) => { },
]);

export default function Providers({ children }: ProvidersProps): ReactElement {
  const queryClient = new QueryClient();
  const themeChanger = useTheme();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [electronContext, setElectronContext] = useState({});
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [nodes, setNodes] = useNodesState(initialNodes);

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

  const themeProviderValue = useMemo(
    () => [theme, setThemeCallback],
    [setThemeCallback, theme],
  );

  const flowEditorProviderValue = useMemo(
    () => ({
      edges,
      setEdges,
      nodes,
      setNodes,
    }),
    [edges, nodes, setEdges, setNodes],
  );

  return (
    <QueryClientProvider client={queryClient} contextSharing>
      <ElectronContext.Provider value={electronContext}>
        <FlowEditorContext.Provider value={flowEditorProviderValue}>
          <ThemeContext.Provider value={themeProviderValue}>
            <ReactFlowProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </ReactFlowProvider>
          </ThemeContext.Provider>
        </FlowEditorContext.Provider>
      </ElectronContext.Provider>
      <Toaster />
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
