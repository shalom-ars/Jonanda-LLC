import React, { useRef } from 'react';
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
  zoom,
  onPanChange
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  // Minimap dimensions
  const mapWidth = 160;
  const mapHeight = 100;
  const scale = 0.05;

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

  const handleMinimapClick = (e: React.MouseEvent) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const targetCanvasX = clickX / scale;
    const targetCanvasY = clickY / scale;

    onPanChange({
      x: Math.round(window.innerWidth / 2 - targetCanvasX * zoom),
      y: Math.round(window.innerHeight / 2 - targetCanvasY * zoom)
    });
  };

  return (
    <div className="absolute bottom-4 right-4 z-20 w-44 h-32 rounded-2xl bg-white/90 dark:bg-[#0c0c14]/90 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden pointer-events-auto p-2.5 select-none flex flex-col justify-between">
      <div className="flex items-center justify-between text-[9px] font-mono text-gray-500 font-bold border-b border-gray-200 dark:border-white/10 pb-1">
        <span className="text-amber-600 dark:text-gold-400 font-bold">RADAR OVERVIEW</span>
        <span>{nodes.length} NODES</span>
      </div>

      {/* Mini 2D Interactive Plane */}
      <div
        ref={mapRef}
        onClick={handleMinimapClick}
        className="relative flex-1 w-full h-full overflow-hidden my-1 bg-gray-100 dark:bg-black/50 rounded-xl cursor-crosshair border border-gray-200/50 dark:border-white/5"
      >
        {/* Node dots */}
        {nodes.map((node) => {
          const dotX = Math.min(Math.max(node.position.x * scale, 2), mapWidth);
          const dotY = Math.min(Math.max(node.position.y * scale, 2), mapHeight);
          const color = categoryDotColors[node.category] || '#f59e0b';

          return (
            <div
              key={node.id}
              style={{
                left: `${dotX}px`,
                top: `${dotY}px`,
                backgroundColor: color
              }}
              className="absolute w-2.5 h-2 rounded-sm shadow-sm"
              title={node.title}
            />
          );
        })}

        {/* Viewport Indicator Box */}
        <div
          style={{
            left: `${Math.max(0, -pan.x * scale * 0.4)}px`,
            top: `${Math.max(0, -pan.y * scale * 0.4)}px`,
            width: `${Math.min(mapWidth, 70 / zoom)}px`,
            height: `${Math.min(mapHeight, 45 / zoom)}px`
          }}
          className="absolute border-2 border-amber-500 bg-amber-500/15 rounded-md pointer-events-none shadow-sm"
        />
      </div>

      <div className="flex items-center justify-between text-[9px] text-gray-500 font-mono">
        <span>Click to Pan</span>
        <span className="font-bold text-gray-700 dark:text-gray-300">{Math.round(zoom * 100)}%</span>
      </div>
    </div>
  );
};
