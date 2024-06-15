import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import { Card, CardHeader } from '@/components/ui/card';

interface StartData { }

export default function Start({ id }: NodeProps<StartData>) {
  const { getEdges } = useReactFlow();

  return (
    <Card>
      <CardHeader>Start</CardHeader>
      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        isValidConnection={() => {
          const edges = getEdges();
          return !edges.some((edge) => edge.source === id);
        }}
      />
    </Card>
  );
}
