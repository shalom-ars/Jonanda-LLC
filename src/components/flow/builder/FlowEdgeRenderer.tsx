import React from 'react';
import { FlowEdge, FlowNode } from '../../../types/flow';

interface FlowEdgeRendererProps {
  edge: FlowEdge;
  nodes: FlowNode[];
  selected?: boolean;
  onDelete?: (edgeId: string) => void;
  onOpenQuickInsert?: (edgeId: string, posX: number, posY: number) => void;
}

export const FlowEdgeRenderer: React.FC<FlowEdgeRendererProps> = ({
  edge,
  nodes,
  selected = false,
  onDelete,
  onOpenQuickInsert
}) => {
  const sourceNode = nodes.find((n) => n.id === edge.sourceNodeId);
  const targetNode = nodes.find((n) => n.id === edge.targetNodeId);

  if (!sourceNode || !targetNode) return null;

  // Node dimension constants
  const nodeWidth = 240;
  const nodeHeight = 85;

  // Calculate anchor coordinates
  const startX = sourceNode.position.x + nodeWidth;
  const startY = sourceNode.position.y + nodeHeight / 2;

  const endX = targetNode.position.x;
  const endY = targetNode.position.y + nodeHeight / 2;

  // Compute smooth horizontal Bézier curve
  const dx = Math.abs(endX - startX) * 0.5;
  const curvature = Math.max(dx, 40);
  const path = `M ${startX} ${startY} C ${startX + curvature} ${startY}, ${endX - curvature} ${endY}, ${endX} ${endY}`;

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  return (
    <g className="group cursor-pointer">
      {/* Background thicker invisible path for easy clicking */}
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={24}
        onClick={() => onDelete && onDelete(edge.id)}
      />

      {/* Main Connection Wire */}
      <path
        d={path}
        fill="none"
        className={`transition-all duration-300 ${
          selected
            ? 'stroke-amber-400 dark:stroke-gold-400 stroke-[3px]'
            : 'stroke-gray-400/80 dark:stroke-white/30 group-hover:stroke-amber-500 dark:group-hover:stroke-gold-400 stroke-2'
        }`}
        strokeDasharray={edge.animated ? '6,4' : undefined}
      />

      {/* Animated Light Pulse travelling along the wire */}
      <circle r={3} fill="#f59e0b" className="animate-ping">
        <animateMotion path={path} dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Center Quick Insert '+' Button & Label */}
      <g
        transform={`translate(${midX}, ${midY})`}
        className="pointer-events-auto"
        onClick={(e) => {
          e.stopPropagation();
          if (onOpenQuickInsert) {
            onOpenQuickInsert(edge.id, midX, midY);
          }
        }}
      >
        <circle
          r={10}
          className="fill-white dark:fill-[#141424] stroke-gray-300 dark:stroke-white/20 group-hover:stroke-amber-500 dark:group-hover:stroke-gold-400 transition-transform group-hover:scale-125 shadow-sm"
          strokeWidth={1.5}
        />
        <text
          x={0}
          y={3.5}
          textAnchor="middle"
          className="text-[10px] font-bold fill-gray-600 dark:fill-gray-300 group-hover:fill-amber-600 dark:group-hover:fill-gold-300 select-none"
        >
          +
        </text>
      </g>

      {/* Optional Branch Label (YES / NO / TRUE / FALSE) */}
      {edge.label && (
        <g transform={`translate(${midX}, ${midY - 16})`}>
          <rect
            x={-24}
            y={-10}
            width={48}
            height={20}
            rx={10}
            className="fill-white dark:fill-[#12121c] stroke-gray-300 dark:stroke-white/20"
            strokeWidth={1}
          />
          <text
            x={0}
            y={3.5}
            textAnchor="middle"
            className="text-[9px] font-mono font-bold fill-amber-700 dark:fill-gold-300 select-none"
          >
            {edge.label}
          </text>
        </g>
      )}
    </g>
  );
};
