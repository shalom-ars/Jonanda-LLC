import React from 'react';
import { FlowNode } from '../../../types/flow';

interface CanvasMinimapProps {
  nodes: FlowNode[];
  pan: { x: number; y: number };
  zoom: number;
  onPanChange: (pan: { x: number; y: number }) => void;
}

export const CanvasMinimap: React.FC<CanvasMinimapProps> = ({
  nodes,
  pan,
  zoom
}) => {
  // Minimap dimensions
  const mapWidth = 160;
  const mapHeight = 100;
  const scale = 0.04;

  const categoryDotColors: Record<string, string> = {
    trigger: '#10b981',
    action: '#f59e0b',
    logic: '#a855f7',
    data: '#3b82f6',
    ai: '#ec4899',
    database: '#06b6d4',
    integration: '#10b981',
    code: '#6366f1'
  };

  return (
    <div className="absolute bottom-4 right-4 z-20 w-40 h-28 rounded-2xl bg-white/80 dark:bg-[#0c0c14]/85 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-xl overflow-hidden pointer-events-auto p-2 select-none flex flex-col justify-between">
      <div className="flex items-center justify-between text-[9px] font-mono text-gray-500 font-bold border-b border-gray-200 dark:border-white/10 pb-1">
        <span>RADAR</span>
        <span>{nodes.length} NODES</span>
      </div>

      {/* Mini 2D Plane */}
      <div className="relative flex-1 w-full h-full overflow-hidden my-1 bg-gray-50 dark:bg-black/40 rounded-lg">
        {/* Node dots */}
        {nodes.map((node) => {
          const dotX = Math.min(Math.max((node.position.x * scale), 4), mapWidth - 10);
          const dotY = Math.min(Math.max((node.position.y * scale), 4), mapHeight - 10);
          const color = categoryDotColors[node.category] || '#f59e0b';

          return (
            <div
              key={node.id}
              style={{
                left: `${dotX}px`,
                top: `${dotY}px`,
                backgroundColor: color
              }}
              className="absolute w-2 h-1.5 rounded-sm opacity-90 shadow-sm"
              title={node.title}
            />
          );
        })}

        {/* Viewport Box */}
        <div
          style={{
            left: `${Math.max(0, -pan.x * scale * 0.5)}px`,
            top: `${Math.max(0, -pan.y * scale * 0.5)}px`,
            width: `${Math.min(mapWidth, 60 / zoom)}px`,
            height: `${Math.min(mapHeight, 40 / zoom)}px`
          }}
          className="absolute border border-amber-500/80 bg-amber-500/10 rounded-sm pointer-events-none"
        />
      </div>

      <div className="text-[8px] text-gray-400 font-mono text-center truncate">
        Zoom: {Math.round(zoom * 100)}%
      </div>
    </div>
  );
};
