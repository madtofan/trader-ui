import {
  Constant,
  IfCondition,
  LimitPurchase,
  MathOperator,
  Start,
} from '@/components/flow/nodes';
import { DefaultEdgeOptions, Edge, MarkerType, Node } from 'reactflow';

export const EDGE_OPTIONS: DefaultEdgeOptions = {
  animated: false,
  markerEnd: { type: MarkerType.Arrow },
};

export const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: {},
    type: 'start',
  },
];
export const initialEdges: Edge[] = [];

export const CUSTOM_NODE_TYPES = {
  start: Start,
  constant: Constant,
  ifCondition: IfCondition,
  mathOperator: MathOperator,
  limitPurchase: LimitPurchase,
};

export type CustomNodeKeys = keyof typeof CUSTOM_NODE_TYPES;

type ContextMenuNav = {
  label: string;
  component: CustomNodeKeys;
  shortCut: string;
};

export const CONTEXT_MENU_NAV: ContextMenuNav[] = [
  {
    label: 'Start',
    component: 'start',
    shortCut: 's',
  },
  {
    label: 'If Condition',
    component: 'ifCondition',
    shortCut: 'i',
  },
  {
    label: 'Constant',
    component: 'constant',
    shortCut: 'c',
  },
  {
    label: 'Math Operator',
    component: 'mathOperator',
    shortCut: 'm',
  },
  {
    label: 'Limit Purchase',
    component: 'limitPurchase',
    shortCut: 'l',
  },
];
