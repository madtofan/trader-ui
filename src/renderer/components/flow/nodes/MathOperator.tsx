import { useCallback } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import { MATH_OPERATOR } from '@/../shared-types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ConstantData {
  operator: MATH_OPERATOR;
}

export default function MathOperator({ id, data }: NodeProps<ConstantData>) {
  const { getEdges, setNodes } = useReactFlow();
  const onChange = useCallback(
    (changedValue: MATH_OPERATOR) => {
      if (changedValue) {
        setNodes((oldNodes) =>
          oldNodes.map((node) => {
            if (node.id === id) {
              node.data = {
                ...node.data,
                operator: changedValue,
              };
            }
            return node;
          }),
        );
      }
    },
    [id, setNodes],
  );

  return (
    <Card>
      <Handle
        type="target"
        position={Position.Top}
        id="input-1"
        isValidConnection={() => {
          const edges = getEdges();
          return !edges.some(
            (edge) => edge.target === id && edge.id === 'input-1',
          );
        }}
        style={{ left: 5 }}
      >
        <div
          className="source"
          data-handleid="input-1"
          data-nodeid={id}
          data-handlepos="top"
          style={{ width: 12, height: 12 }}
        >
          A
        </div>
      </Handle>
      <Handle
        type="target"
        position={Position.Left}
        id="input-2"
        isValidConnection={() => {
          const edges = getEdges();
          return !edges.some(
            (edge) => edge.target === id && edge.id === 'input-2',
          );
        }}
      >
        <div
          className="source"
          data-handleid="input-2"
          data-nodeid={id}
          data-handlepos="left"
          style={{ width: 12, height: 12 }}
        >
          B
        </div>
      </Handle>
      <CardHeader>Operator</CardHeader>
      <CardContent>
        <Select onValueChange={onChange} defaultValue={data.operator}>
          <SelectTrigger>
            <SelectValue defaultValue={data.operator} />
          </SelectTrigger>
          <SelectContent>
            {Object.values(MATH_OPERATOR).map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        isValidConnection={() => {
          const edges = getEdges();
          return !edges.some((edge) => edge.source === id);
        }}
      >
        <div
          className="source"
          data-handleid="output"
          data-nodeid={id}
          data-handlepos="bottom"
          style={{ width: 12, height: 12 }}
        >
          Output
        </div>
      </Handle>
    </Card>
  );
}
