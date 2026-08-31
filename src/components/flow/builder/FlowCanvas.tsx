import React, { useState, useRef, useEffect } from 'react';
import { FlowNode, FlowEdge, Workflow, WorkflowCategory } from '../../../types/flow';
import { FLOW_NODE_DEFINITIONS } from '../../../data/flowNodesData';
import { FlowNodeCard } from './FlowNodeCard';
import { FlowEdgeRenderer } from './FlowEdgeRenderer';
import { NodeLibrarySidebar } from './NodeLibrarySidebar';
import { NodeConfigPanel } from './NodeConfigPanel';
import { BuilderTopBar } from './BuilderTopBar';
import { CanvasMinimap } from './CanvasMinimap';
import { WorkflowTestModal } from './WorkflowTestModal';
import { useFlow } from '../../../context/FlowContext';

interface FlowCanvasProps {
  initialWorkflow: Workflow;
}

export const FlowCanvas: React.FC<FlowCanvasProps> = ({ initialWorkflow }) => {
  const { saveWorkflow, publishWorkflowVersion } = useFlow();
  const [workflow, setWorkflow] = useState<Workflow>(initialWorkflow);

  // Undo / Redo History Stack
  const [history, setHistory] = useState<Workflow[]>([initialWorkflow]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Viewport State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isMinimapOpen, setIsMinimapOpen] = useState(true);

  // Sidebar & Modal States
  const [isLibraryOpen, setIsLibraryOpen] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  // Dragging Node State
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Connecting Ports State
  const [connectingState, setConnectingState] = useState<{
    sourceNodeId: string;
    sourcePortId: string;
    currentMousePos: { x: number; y: number };
  } | null>(null);

  const canvasRef = useRef<HTMLDivElement | null>(null);

  // Push to history helper
  const recordHistoryState = (nextWf: Workflow) => {
    setHistory((prev) => {
      const truncated = prev.slice(0, historyIndex + 1);
      return [...truncated, nextWf].slice(-25); // Cap to 25 steps
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 24));
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      setHistoryIndex(targetIndex);
      setWorkflow(history[targetIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const targetIndex = historyIndex + 1;
      setHistoryIndex(targetIndex);
      setWorkflow(history[targetIndex]);
    }
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
        e.preventDefault();
        handleRedo();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedNodeId && !['input', 'textarea'].includes((e.target as HTMLElement).tagName.toLowerCase())) {
          handleDeleteNode(selectedNodeId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history, selectedNodeId]);

  // Pan Canvas Handler
  const handleMouseDownOnCanvas = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('canvas-background')) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      setSelectedNodeId(null);
      setSelectedEdgeId(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    } else if (draggingNodeId) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = (e.clientX - rect.left - pan.x) / zoom;
      const mouseY = (e.clientY - rect.top - pan.y) / zoom;

      setWorkflow((prev) => ({
        ...prev,
        nodes: prev.nodes.map((n) =>
          n.id === draggingNodeId
            ? {
                ...n,
                position: {
                  x: Math.round(mouseX - dragOffset.x),
                  y: Math.round(mouseY - dragOffset.y)
                }
              }
            : n
        )
      }));
    } else if (connectingState) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = (e.clientX - rect.left - pan.x) / zoom;
      const mouseY = (e.clientY - rect.top - pan.y) / zoom;

      setConnectingState((prev) =>
        prev
          ? {
              ...prev,
              currentMousePos: { x: mouseX, y: mouseY }
            }
          : null
      );
    }
  };

  const handleMouseUp = () => {
    if (draggingNodeId) {
      recordHistoryState(workflow);
    }
    setIsPanning(false);
    setDraggingNodeId(null);
    setConnectingState(null);
  };

  // Node Drag Initiator
  const handleNodeMouseDown = (nodeId: string, e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const node = workflow.nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const mouseX = (e.clientX - rect.left - pan.x) / zoom;
    const mouseY = (e.clientY - rect.top - pan.y) / zoom;

    setDraggingNodeId(nodeId);
    setDragOffset({
      x: mouseX - node.position.x,
      y: mouseY - node.position.y
    });
    setSelectedNodeId(nodeId);
  };

  // Start Connection
  const handleStartConnect = (nodeId: string, portId: string, e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = (e.clientX - rect.left - pan.x) / zoom;
    const mouseY = (e.clientY - rect.top - pan.y) / zoom;

    setConnectingState({
      sourceNodeId: nodeId,
      sourcePortId: portId,
      currentMousePos: { x: mouseX, y: mouseY }
    });
  };

  // End Connection on Target Port
  const handleEndConnect = (targetNodeId: string, targetPortId: string) => {
    if (!connectingState) return;
    if (connectingState.sourceNodeId === targetNodeId) return;

    const exists = workflow.edges.some(
      (e) =>
        e.sourceNodeId === connectingState.sourceNodeId &&
        e.targetNodeId === targetNodeId
    );

    if (!exists) {
      const newEdge: FlowEdge = {
        id: `e_${Date.now()}`,
        sourceNodeId: connectingState.sourceNodeId,
        sourcePortId: connectingState.sourcePortId,
        targetNodeId: targetNodeId,
        targetPortId: targetPortId,
        animated: true
      };

      const updated = {
        ...workflow,
        edges: [...workflow.edges, newEdge]
      };
      setWorkflow(updated);
      recordHistoryState(updated);
    }

    setConnectingState(null);
  };

  // Add Node from Sidebar
  const handleAddNode = (type: string) => {
    const definition = FLOW_NODE_DEFINITIONS[type];
    if (!definition) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    const centerX = rect ? (rect.width / 2 - pan.x) / zoom - 120 : 200;
    const centerY = rect ? (rect.height / 2 - pan.y) / zoom - 40 : 200;

    const newNode: FlowNode = {
      id: `node_${Date.now()}`,
      type,
      category: definition.category,
      title: definition.title,
      position: {
        x: Math.round(centerX + (Math.random() - 0.5) * 40),
        y: Math.round(centerY + (Math.random() - 0.5) * 40)
      },
      config: { ...definition.defaultConfig },
      status: 'idle'
    };

    const updated = {
      ...workflow,
      nodes: [...workflow.nodes, newNode]
    };
    setWorkflow(updated);
    recordHistoryState(updated);
    setSelectedNodeId(newNode.id);
  };

  // Delete Node
  const handleDeleteNode = (nodeId: string) => {
    const updated = {
      ...workflow,
      nodes: workflow.nodes.filter((n) => n.id !== nodeId),
      edges: workflow.edges.filter(
        (e) => e.sourceNodeId !== nodeId && e.targetNodeId !== nodeId
      )
    };
    setWorkflow(updated);
    recordHistoryState(updated);

    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
    }
  };

  // Duplicate Node
  const handleDuplicateNode = (nodeId: string) => {
    const original = workflow.nodes.find((n) => n.id === nodeId);
    if (!original) return;

    const duplicate: FlowNode = {
      ...original,
      id: `node_${Date.now()}`,
      title: `${original.title} (Copy)`,
      position: {
        x: original.position.x + 30,
        y: original.position.y + 30
      }
    };

    const updated = {
      ...workflow,
      nodes: [...workflow.nodes, duplicate]
    };
    setWorkflow(updated);
    recordHistoryState(updated);
    setSelectedNodeId(duplicate.id);
  };

  // Delete Edge
  const handleDeleteEdge = (edgeId: string) => {
    const updated = {
      ...workflow,
      edges: workflow.edges.filter((e) => e.id !== edgeId)
    };
    setWorkflow(updated);
    recordHistoryState(updated);
  };

  // Update Config from Right Panel
  const handleUpdateNodeConfig = (
    nodeId: string,
    config: Record<string, any>,
    title?: string
  ) => {
    const updated = {
      ...workflow,
      nodes: workflow.nodes.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              config,
              title: title !== undefined ? title : n.title
            }
          : n
      )
    };
    setWorkflow(updated);
  };

  // Auto Arrange Nodes
  const handleAutoArrange = () => {
    const spacingX = 320;
    const spacingY = 130;

    const arrangedNodes = workflow.nodes.map((node, index) => ({
      ...node,
      position: {
        x: 80 + (index % 4) * spacingX,
        y: 120 + Math.floor(index / 4) * spacingY
      }
    }));

    const updated = {
      ...workflow,
      nodes: arrangedNodes
    };
    setWorkflow(updated);
    recordHistoryState(updated);
  };

  // Fit to screen
  const handleFitToScreen = () => {
    setZoom(0.85);
    setPan({ x: 40, y: 20 });
  };

  const handleSave = () => {
    saveWorkflow(workflow);
  };

  const handlePublish = () => {
    publishWorkflowVersion(workflow.id, 'Published immutable release');
  };

  const selectedNode = workflow.nodes.find((n) => n.id === selectedNodeId) || null;

  return (
    <div className="fixed inset-0 pt-[60px] bg-slate-100 dark:bg-[#08080f] overflow-hidden select-none">
      {/* Top Bar */}
      <BuilderTopBar
        workflow={workflow}
        onUpdateWorkflowName={(name) => setWorkflow((prev) => ({ ...prev, name }))}
        onUpdateCategory={(category) => setWorkflow((prev) => ({ ...prev, category: category as WorkflowCategory }))}
        onToggleStatus={() =>
          setWorkflow((prev) => ({
            ...prev,
            status: prev.status === 'active' ? 'paused' : 'active'
          }))
        }
        onSave={handleSave}
        onPublishVersion={handlePublish}
        onTest={() => setIsTestModalOpen(true)}
        zoom={zoom}
        onZoomIn={() => setZoom((prev) => Math.min(prev + 0.15, 2.0))}
        onZoomOut={() => setZoom((prev) => Math.max(prev - 0.15, 0.4))}
        onResetZoom={() => {
          setZoom(1);
          setPan({ x: 0, y: 0 });
        }}
        onAutoArrange={handleAutoArrange}
        onFitToScreen={handleFitToScreen}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        isMinimapOpen={isMinimapOpen}
        onToggleMinimap={() => setIsMinimapOpen(!isMinimapOpen)}
      />

      {/* Node Library Left Sidebar */}
      <NodeLibrarySidebar
        isOpen={isLibraryOpen}
        onToggle={() => setIsLibraryOpen(!isLibraryOpen)}
        onAddNode={handleAddNode}
      />

      {/* Main Canvas Viewport */}
      <div
        ref={canvasRef}
        onMouseDown={handleMouseDownOnCanvas}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="canvas-background w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(160, 160, 180, 0.15) 1px, transparent 1px)`,
          backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`
        }}
      >
        {/* Transformable Canvas Plane */}
        <div
          className="absolute inset-0 origin-top-left pointer-events-none"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
          }}
        >
          {/* SVG Connection Layer */}
          <svg className="absolute inset-0 w-[5000px] h-[5000px] pointer-events-auto overflow-visible">
            {workflow.edges.map((edge) => (
              <FlowEdgeRenderer
                key={edge.id}
                edge={edge}
                nodes={workflow.nodes}
                selected={selectedEdgeId === edge.id}
                onDelete={handleDeleteEdge}
              />
            ))}

            {/* Connecting Wire Preview */}
            {connectingState && (
              <path
                d={`M ${
                  (workflow.nodes.find((n) => n.id === connectingState.sourceNodeId)?.position.x || 0) + 240
                } ${
                  (workflow.nodes.find((n) => n.id === connectingState.sourceNodeId)?.position.y || 0) + 42.5
                } C ${
                  (workflow.nodes.find((n) => n.id === connectingState.sourceNodeId)?.position.x || 0) + 320
                } ${
                  (workflow.nodes.find((n) => n.id === connectingState.sourceNodeId)?.position.y || 0) + 42.5
                }, ${connectingState.currentMousePos.x - 80} ${connectingState.currentMousePos.y}, ${
                  connectingState.currentMousePos.x
                } ${connectingState.currentMousePos.y}`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth={2.5}
                strokeDasharray="6,4"
              />
            )}
          </svg>

          {/* HTML Nodes Layer */}
          <div className="absolute inset-0 pointer-events-auto">
            {workflow.nodes.map((node) => (
              <div
                key={node.id}
                onMouseDown={(e) => handleNodeMouseDown(node.id, e)}
                style={{
                  transform: `translate(${node.position.x}px, ${node.position.y}px)`
                }}
                className="absolute"
              >
                <FlowNodeCard
                  node={node}
                  isSelected={selectedNodeId === node.id}
                  onSelect={(id) => {
                    setSelectedNodeId(id);
                    setSelectedEdgeId(null);
                  }}
                  onDelete={handleDeleteNode}
                  onDuplicate={handleDuplicateNode}
                  onStartConnect={handleStartConnect}
                  onEndConnect={handleEndConnect}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Canvas Minimap */}
      {isMinimapOpen && (
        <CanvasMinimap
          nodes={workflow.nodes}
          pan={pan}
          zoom={zoom}
          onPanChange={(newPan) => setPan(newPan)}
        />
      )}

      {/* Node Config Right Sidebar */}
      {selectedNode && (
        <NodeConfigPanel
          node={selectedNode}
          onClose={() => setSelectedNodeId(null)}
          onUpdateConfig={handleUpdateNodeConfig}
        />
      )}

      {/* Test Execution Simulator Modal */}
      {isTestModalOpen && (
        <WorkflowTestModal
          workflow={workflow}
          onClose={() => setIsTestModalOpen(false)}
        />
      )}
    </div>
  );
};
