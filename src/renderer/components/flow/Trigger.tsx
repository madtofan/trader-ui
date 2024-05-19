import { ChangeEvent, useCallback } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader } from '../ui/card';

interface TriggerData {
  contains: string;
}

export default function Trigger({ id, data }: NodeProps<TriggerData>) {
  const { setNodes } = useReactFlow();
  const onChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const changedValue = evt.target.value as string;
      if (changedValue) {
        setNodes((oldNodes) =>
          oldNodes.map((node) => {
            if (node.id === id) {
              node.data = {
                ...node.data,
                contains: changedValue,
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
      <CardHeader>Trigger</CardHeader>
      <CardContent>
        <Input
          name={id}
          onChange={onChange}
          value={data.contains}
          className="nodrag"
        />
      </CardContent>
      <Handle type="source" position={Position.Bottom} id="output" />
    </Card>
  );
}
