import { ChangeEvent, useCallback } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface ConstantData {
  value: string;
}

export default function Constant({ id, data }: NodeProps<ConstantData>) {
  const { getEdges, setNodes } = useReactFlow();
  const onChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const changedValue = evt.target.value as string;
      setNodes((oldNodes) =>
        oldNodes.map((node) => {
          if (node.id === id) {
            node.data = {
              ...node.data,
              value: changedValue,
            };
          }
          return node;
        }),
      );
    },
    [id, setNodes],
  );

  return (
    <Card>
      <CardHeader>
        <Handle
          type="target"
          position={Position.Top}
          id="input"
          isValidConnection={() => {
            const edges = getEdges();
            return !edges.some((edge) => edge.target === id);
          }}
        >
          <div
            className="source"
            data-handleid="input"
            data-nodeid={id}
            data-handlepos="top"
            style={{ width: 12, height: 12 }}
          >
            Input
          </div>
        </Handle>
      </CardHeader>
      <CardContent>
        Constant
        <Input
          name={id}
          onChange={onChange}
          value={data.value}
          className="nodrag"
        />
      </CardContent>
      <CardFooter>
        <Handle
          type="source"
          position={Position.Bottom}
          id="output"
          isValidConnection={() => {
            const edges = getEdges();
            return !edges.some((edge) => edge.source === id);
          }}
        />
      </CardFooter>
    </Card>
  );
}
