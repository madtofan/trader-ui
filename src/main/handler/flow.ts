import { CustomNodeKeys } from '@/config/flow';
import Store from 'electron-store';
import { BrowserWindow } from 'electron';
import { Edge, Node } from 'reactflow';
import { CONTEXT_KEYS } from '../../shared-types';
import { getPositions } from './ib';
import { OptionalIb } from '../types';

interface NodeRunnerArgs {
  store: Store;
  mainWindow: BrowserWindow;
  getIb: () => OptionalIb;
}

const walkInputValue = async (
  currentNode: Node,
  nodeRunnerArgs: NodeRunnerArgs,
) => {
  const { store, mainWindow, getIb } = nodeRunnerArgs;
  const edges: Edge[] = store.get(CONTEXT_KEYS.flowEdges) as Edge[];

};

const handleNode = async (
  currentNode: Node,
  nodeRunnerArgs: NodeRunnerArgs,
): Promise<string> => {
  const { store, mainWindow, getIb } = nodeRunnerArgs;
  const nodeType = currentNode.type as CustomNodeKeys;

  let nextSourceHandle = 'output';
  switch (nodeType) {
    case 'start':
      console.log('Start Node');
      break;
    case 'constant':
      console.log('Constant Node');
      break;
    case 'ifCondition':
      console.log('IfCondition Node');
      nextSourceHandle = 'than';
      break;
    case 'mathOperator':
      console.log('Math Operator Node');
      break;
    case 'limitPurchase':
      console.log('Limit Purchase Node');
      // eslint-disable-next-line no-await-in-loop
      await getPositions(store, mainWindow, getIb)
        .then((result) => console.log(result))
        .catch((err) => {
          throw Error(`${err}`);
        });
      break;
    default:
      throw Error(`Node type ${nodeType} not recognized`);
  }
  return nextSourceHandle;
};

export const runFlow = async (
  store: Store,
  mainWindow: BrowserWindow,
  getIb: () => OptionalIb,
) => {
  const nodes: Node[] = store.get(CONTEXT_KEYS.flowNodes) as Node[];
  const edges: Edge[] = store.get(CONTEXT_KEYS.flowEdges) as Edge[];
  const nodeRunnerArgs: NodeRunnerArgs = { store, mainWindow, getIb };
  const startNode = nodes.find((node) => node.type === 'start');
  if (!startNode) {
    throw Error('No start node found');
  }

  let currentNode: Node | undefined = startNode;
  while (currentNode !== undefined) {
    const nextSourceHandle = await handleNode(currentNode, nodeRunnerArgs);

    const outputEdge = edges.find(
      // eslint-disable-next-line no-loop-func
      (edge) =>
        edge.source === currentNode?.id &&
        edge.sourceHandle === nextSourceHandle,
    );
    currentNode = nodes.find((node) => node.id === outputEdge?.target);
  }
  console.log('End flow');
};
