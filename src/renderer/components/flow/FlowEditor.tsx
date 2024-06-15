import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { useCallback, useContext, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
  Panel,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from 'reactflow';
import {
  CustomNodeKeys,
  CUSTOM_NODE_TYPES,
  CONTEXT_MENU_NAV,
  EDGE_OPTIONS,
} from '@/lib/config/flow';
import { getLayoutedElements } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { FlowEditorContext } from '@/components/layouts/providers';
import {
  CONTEXT_KEYS,
  FLOW_CHANNELS,
  STORE_CHANNELS,
} from '@/../shared-types';

export default function FlowEditor() {
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const [contextCoordinate, setContextCoordinate] = useState({ x: 0, y: 0 });
  const { fitView, screenToFlowPosition } = useReactFlow();
  const {
    edges = [],
    setEdges,
    nodes = [],
    setNodes,
  } = useContext(FlowEditorContext);
  const [runningFlow, setRunningFlow] = useState(false);
  const [nextId, setNextId] = useState(
    Math.max(...nodes.map((node) => Number(node.id))) + 1,
  );

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

  const addComponent = useCallback(
    (nodeType: CustomNodeKeys) => {
      const position = screenToFlowPosition({
        x: contextCoordinate.x,
        y: contextCoordinate.y,
      });
      setNodes((nds) => [
        ...nds,
        {
          id: nextId.toString(),
          position,
          data: {},
          type: nodeType as string,
        },
      ]);
      setNextId((id) => id + 1);
    },
    [
      contextCoordinate.x,
      contextCoordinate.y,
      nextId,
      screenToFlowPosition,
      setNodes,
    ],
  );

  const handleExecuteFlow = useCallback(async () => {
    setRunningFlow(true);
    await window.electron.ipcRenderer.invoke(
      STORE_CHANNELS.Set,
      CONTEXT_KEYS.flow,
      {
        nodes,
        edges,
      },
    );
    await window.electron.ipcRenderer
      .invoke(FLOW_CHANNELS.Run, [])
      .then(() => {
        toast({
          title: 'Success!',
          description: 'Successfully executed flow',
          variant: 'default',
        });
        return true;
      })
      .catch((err: Error) => {
        toast({
          title: 'Error during flow execution',
          description: err.message,
          variant: 'destructive',
        });
      });
    setRunningFlow(false);
  }, [edges, nodes]);

  return (
    <ContextMenu>
      <ContextMenuTrigger
        onContextMenu={(event) => {
          if (triggerRef.current) {
            const boundingRect = triggerRef.current.getBoundingClientRect();
            setContextCoordinate({
              x: event.pageX - boundingRect.x,
              y: event.clientY - boundingRect.y,
            });
          }
        }}
        className="border mx-auto w-full min-w-0 h-full"
        ref={triggerRef}
      >
        <ReactFlow
          nodes={nodes}
          nodeTypes={CUSTOM_NODE_TYPES}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          defaultEdgeOptions={EDGE_OPTIONS}
          onConnect={onConnect}
          proOptions={{ hideAttribution: true }}
          fitView
        >
          <Panel position="top-right">
            <Button className="m-1" onClick={onLayout}>
              Layout
            </Button>
            <Button
              className="m-1"
              disabled={runningFlow}
              onClick={handleExecuteFlow}
            >
              Execute
            </Button>
          </Panel>
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        {CONTEXT_MENU_NAV.map((contextMenu) => (
          <ContextMenuItem
            key={contextMenu.component}
            inset
            onClick={() => addComponent(contextMenu.component)}
          >
            {contextMenu.label}
            <ContextMenuShortcut>{contextMenu.shortCut}</ContextMenuShortcut>
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
