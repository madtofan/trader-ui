import Store from 'electron-store';
import { BrowserWindow } from 'electron';
import { Edge, Node } from 'reactflow';
import { CONTEXT_KEYS } from '../../../shared-types';
import { OptionalIb } from '../../types';
import { NodeRunnerArgs } from './type';
import FlowNode from './node';

export const runFlow = async (
  store: Store,
  mainWindow: BrowserWindow,
  getIb: () => OptionalIb,
) => {
  const nodes: Node[] = store.get(CONTEXT_KEYS.flowNodes) as Node[];
  const edges: Edge[] = store.get(CONTEXT_KEYS.flowEdges) as Edge[];
  const flowNodes = new Map<string, FlowNode>();
  nodes.forEach((node) => {
    flowNodes.set(node.id, new FlowNode(node));
  });
  edges.forEach(edge => {
    const fromNode = flowNodes.get(edge.source);
    const toNode = flowNodes.get(edge.target);
    if (fromNode && toNode) {
      fromNode.addOutput(edge.sourceHandle || 'input', toNode);
      toNode.addInput(edge.targetHandle || 'output', fromNode);
    }
  })
  const nodeRunnerArgs: NodeRunnerArgs = { store, mainWindow, getIb };
  const startNode = nodes.find((node) => node.type === 'start');
  let currentNode = flowNodes.get(startNode?.id || 'null') || null;

  if (!currentNode) throw Error(`Missing start node!`);
  while (currentNode) currentNode = await currentNode.executeNode(nodeRunnerArgs);

  console.log('End flow');
}
