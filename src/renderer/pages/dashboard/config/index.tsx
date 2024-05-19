import Trigger from '@/components/flow/Trigger';
import Dagre from '@dagrejs/dagre';
import DashboardLayout from '@/components/layouts/dashboard';
import { Button } from '@/components/ui/button';
import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  DefaultEdgeOptions,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  NodeTypes,
  Panel,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { contains: '' },
    type: 'trigger',
  },
  { id: '2', position: { x: 0, y: 200 }, data: { label: '1' } },
];
const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  g.setGraph({ rankdir: 'TB' });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y: y * 1.5 } };
    }),
    edges,
  };
};

function FlowConfiguration() {
  const { fitView } = useReactFlow();
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);

    window.requestAnimationFrame(() => {
      fitView();
    });
  }, [nodes, edges, setNodes, setEdges, fitView]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onConnect = useCallback(
    (connection: Edge | Connection) =>
      setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const addTrigger = useCallback(
    () =>
      setNodes((nds) => [
        ...nds,
        {
          id: uuidv4(),
          position: { x: 0, y: 0 },
          data: { contains: '' },
          type: 'trigger',
        },
      ]),
    [setNodes],
  );

  const nodeTypes: NodeTypes = useMemo(() => ({ trigger: Trigger }), []);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      defaultEdgeOptions={defaultEdgeOptions}
      onConnect={onConnect}
      fitView
    >
      <Panel position="top-left">
        <Button onClick={addTrigger}>Trigger</Button>
      </Panel>
      <Panel position="top-right">
        <Button onClick={onLayout}>Layout</Button>
      </Panel>
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  );
}

export default function ConfigPage() {
  return (
    <DashboardLayout>
      <main className="relative h-[calc(100vh-10rem)] py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="border mx-auto w-full min-w-0 h-full">
          <div style={{ width: '100%', height: '100%' }}>
            <ReactFlowProvider>
              <FlowConfiguration />
            </ReactFlowProvider>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
