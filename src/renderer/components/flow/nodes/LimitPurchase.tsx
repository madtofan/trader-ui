import { ChangeEvent, useCallback } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface ConstantData {
  price: number;
  ticker: string;
}

export default function IfCondition({ id, data }: NodeProps<ConstantData>) {
  const { getEdges, setNodes } = useReactFlow();
  const onPriceChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const changedValue = Number(evt.target.value as string);
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

  const onTickerChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const changedValue = Number(evt.target.value as string);
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
      <CardHeader>Limit Purchase</CardHeader>
      <CardContent>
        <Input
          name={`${id}_PRICE`}
          onChange={onPriceChange}
          type="number"
          value={data.price}
          className="nodrag"
        />
        <Input
          name={`${id}_TICKER`}
          onChange={onTickerChange}
          type="text"
          value={data.ticker}
          className="nodrag"
        />
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
