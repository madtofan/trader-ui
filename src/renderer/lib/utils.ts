import Dagre from '@dagrejs/dagre';
import { useEffect, useState } from 'react';
import { type ClassValue, clsx } from 'clsx';
import { Edge, Node } from 'reactflow';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  g.setGraph({ rankdir: 'TB' });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node: any) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y: y * 1.5 } };
    }),
    edges,
  };
};

export const useTheme = () => {
  const [theme, setInnerTheme] = useState(
    localStorage.getItem('theme') || 'system',
  );

  useEffect(() => {
    document.body.classList.remove('light', 'dark', 'system');
    document.body.classList.add(theme);
  }, [theme]);

  const setTheme = (themeName: string) => {
    setInnerTheme(themeName);
    localStorage.setItem('theme', themeName);
  };

  return setTheme;
};
