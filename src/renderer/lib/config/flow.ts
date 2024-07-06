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

// export const initialNodes: Node[] = [
//   {
//     id: '1',
//     position: { x: 0, y: 0 },
//     data: {},
//     type: 'start',
//   },
// ];
// export const initialEdges: Edge[] = [];
export const initialNodes: Node[] = [
  {
    "id": "1",
    "position": {
      "x": 116,
      "y": 55.5
    },
    "data": {},
    "type": "start",
    "width": 85,
    "height": 74,
    "positionAbsolute": {
      "x": 116,
      "y": 55.5
    }
  },
  {
    "id": "2",
    "position": {
      "x": 116,
      "y": 286.5
    },
    "data": {
      "value": "somethibg TSLA awats"
    },
    "type": "constant",
    "width": 232,
    "height": 134,
    "selected": false,
    "positionAbsolute": {
      "x": 116,
      "y": 286.5
    },
    "dragging": false,
  },
  {
    "id": "3",
    "position": {
      "x": 257,
      "y": 562.5
    },
    "data": {
      "condition": "Contains"
    },
    "type": "ifCondition",
    "width": 149,
    "height": 134,
    "selected": false,
    "positionAbsolute": {
      "x": 257,
      "y": 562.5
    },
    "dragging": false,
  },
  {
    "id": "4",
    "position": {
      "x": 398,
      "y": 286.5
    },
    "data": {
      "value": "TSLA"
    },
    "type": "constant",
    "width": 232,
    "height": 134,
    "positionAbsolute": {
      "x": 398,
      "y": 286.5
    }
  },
  {
    "id": "5",
    "position": {
      "x": 145.25,
      "y": 865.5
    },
    "data": {},
    "type": "mathOperator",
    "width": 115,
    "height": 134,
    "selected": false,
    "positionAbsolute": {
      "x": 145.25,
      "y": 865.5
    },
    "dragging": false,
  },
  {
    "id": "6",
    "position": {
      "x": 368.75,
      "y": 865.5
    },
    "data": {},
    "type": "limitPurchase",
    "width": 232,
    "height": 170,
    "selected": true,
    "positionAbsolute": {
      "x": 368.75,
      "y": 865.5
    },
    "dragging": false,
  }
];
export const initialEdges: Edge[] = [
  {
    "animated": false,
    "source": "1",
    "sourceHandle": "output",
    "target": "2",
    "targetHandle": "input",
    "id": "reactflow__edge-1output-2input"
  },
  {
    "animated": false,
    "source": "2",
    "sourceHandle": "output",
    "target": "3",
    "targetHandle": "input-1",
    "id": "reactflow__edge-2output-3input-1"
  },
  {
    "animated": false,
    "source": "4",
    "sourceHandle": "output",
    "target": "3",
    "targetHandle": "input-2",
    "id": "reactflow__edge-4output-3input-2"
  },
  {
    "animated": false,
    "source": "3",
    "sourceHandle": "then",
    "target": "5",
    "targetHandle": "input-1",
    "id": "reactflow__edge-3then-5input-1"
  },
  {
    "animated": false,
    "source": "3",
    "sourceHandle": "else",
    "target": "6",
    "targetHandle": "input",
    "id": "reactflow__edge-3else-6input"
  }
];

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
