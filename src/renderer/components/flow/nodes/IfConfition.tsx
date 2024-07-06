import { useCallback } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import { IF_CONDITIONS, IfConditionData } from '@/../shared-types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function IfCondition({ id, data }: NodeProps<IfConditionData>) {
  const { getEdges, setNodes } = useReactFlow();
  const onChange = useCallback(
    (changedValue: string) => {
      if (changedValue) {
        setNodes((oldNodes) =>
          oldNodes.map((node) => {
            if (node.id === id) {
              node.data = {
                ...node.data,
                condition: changedValue,
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
          data-handlepos="left"
          style={{ width: 12, height: 12 }}
        >
          A
        </div>
      </Handle>
      <Handle
        type="target"
        position={Position.Top}
        id="input-2"
        isValidConnection={() => {
          const edges = getEdges();
          return !edges.some(
            (edge) => edge.target === id && edge.id === 'input-2',
          );
        }}
        style={{ right: 5 }}
      >
        <div
          className="source"
          data-handleid="input-2"
          data-nodeid={id}
          data-handlepos="right"
          style={{ width: 12, height: 12 }}
        >
          B
        </div>
      </Handle>
      <CardHeader>If Condition</CardHeader>
      <CardContent>
        <Select onValueChange={onChange} defaultValue={data.condition}>
          <SelectTrigger>
            <SelectValue defaultValue={data.condition} />
          </SelectTrigger>
          <SelectContent>
            {Object.values(IF_CONDITIONS).map((value) => (
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
        id="then"
        isValidConnection={() => {
          const edges = getEdges();
          return !edges.some((edge) => edge.source === id);
        }}
      >
        <div
          className="source"
          data-handleid="then"
          data-nodeid={id}
          data-handlepos="bottom"
          style={{ width: 12, height: 12 }}
        >
          Then
        </div>
      </Handle>
      <Handle
        type="source"
        position={Position.Right}
        id="else"
        isValidConnection={() => {
          const edges = getEdges();
          return !edges.some((edge) => edge.source === id);
        }}
      >
        <div
          className="source"
          data-handleid="else"
          data-nodeid={id}
          data-handlepos="bottom"
          style={{ width: 12, height: 12 }}
        >
          Else
        </div>
      </Handle>
    </Card>
  );
}
