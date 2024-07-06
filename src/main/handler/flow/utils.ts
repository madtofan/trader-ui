import { Edge, Node } from "reactflow";
import { NodeRunnerArgs } from './type';
import { CONTEXT_KEYS } from "../../../shared-types";

export const walkInputValue = async (
  handleToWalk: string,
  currentNode: Node,
  nodeRunnerArgs: NodeRunnerArgs,
) => {
  const { store, mainWindow, getIb } = nodeRunnerArgs;
  const edges: Edge[] = store.get(CONTEXT_KEYS.flowEdges) as Edge[];

};

