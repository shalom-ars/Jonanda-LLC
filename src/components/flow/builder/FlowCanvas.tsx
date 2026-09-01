import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  MapPin,
  Send,
  Hourglass,
  GitBranch,
  Globe,
  Sparkles,
  X
} from 'lucide-react';

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
  const [pan, setPan] = useState({ x: 100, y: 80 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isMinimapOpen, setIsMinimapOpen] = useState(true);

  // Sidebar & Modal States
  const [isLibraryOpen, setIsLibraryOpen] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  // Edge Quick Insert State
  const [quickInsertEdgeId, setQuickInsertEdgeId] = useState<string | null>(null);
  const [quickInsertPosition, setQuickInsertPosition] = useState<{ x: number; y: number } | null>(null);

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
  const recordHistoryState = useCallback((nextWf: Workflow) => {
    setHistory((prev) => {
      const truncated = prev.slice(0, historyIndex + 1);
      return [...truncated, nextWf].slice(-25); // Cap to 25 steps
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 24));
  }, [historyIndex]);

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

  // High-Precision Smooth Wheel Zoom & Pan Engine (Anchored around cursor)
  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = canvasEl.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (e.ctrlKey || e.metaKey) {
        // Pinch zoom (trackpad) or Ctrl + Wheel
        const zoomDelta = -e.deltaY * 0.008;
        setZoom((prevZoom) => {
          const nextZoom = Math.min(Math.max(prevZoom + zoomDelta, 0.25), 2.5);
          const scaleChange = nextZoom / prevZoom;
          setPan((prevPan) => ({
            x: mouseX - (mouseX - prevPan.x) * scaleChange,
            y: mouseY - (mouseY - prevPan.y) * scaleChange
          }));
          return nextZoom;
        });
      } else {
        // Smooth direct wheel pan
        if (Math.abs(e.deltaX) > 0 || Math.abs(e.deltaY) > 0) {
          if (e.shiftKey) {
            setPan((prev) => ({ ...prev, x: prev.x - e.deltaY }));
          } else {
            setPan((prev) => ({
              x: prev.x - e.deltaX * 1.2,
              y: prev.y - e.deltaY * 1.2
            }));
          }
        }
      }
    };

    canvasEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvasEl.removeEventListener('wheel', handleWheel);
  }, []);

  // Universal Global Pointer & Mouse Listener with Failsafe Release
  useEffect(() => {
    const handleGlobalMove = (e: PointerEvent | MouseEvent) => {
      // Automatic Failsafe: If no mouse/pointer button is pressed, immediately release everything
      if (e.buttons === 0 && (isPanning || draggingNodeId || connectingState)) {
        if (draggingNodeId) {
          recordHistoryState(workflow);
        }
        setIsPanning(false);
        setDraggingNodeId(null);
        setConnectingState(null);
        return;
      }

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

    const handleGlobalRelease = () => {
      if (draggingNodeId) {
        recordHistoryState(workflow);
      }
      setIsPanning(false);
      setDraggingNodeId(null);
      setConnectingState(null);
    };

    // Capture phase listeners ensure release is ALWAYS caught
    window.addEventListener('pointermove', handleGlobalMove, { passive: true });
    window.addEventListener('pointerup', handleGlobalRelease, true);
    window.addEventListener('pointercancel', handleGlobalRelease, true);
    window.addEventListener('mouseup', handleGlobalRelease, true);
    window.addEventListener('blur', handleGlobalRelease);
    document.addEventListener('mouseleave', handleGlobalRelease);

    return () => {
      window.removeEventListener('pointermove', handleGlobalMove);
      window.removeEventListener('pointerup', handleGlobalRelease, true);
      window.removeEventListener('pointercancel', handleGlobalRelease, true);
      window.removeEventListener('mouseup', handleGlobalRelease, true);
      window.removeEventListener('blur', handleGlobalRelease);
      document.removeEventListener('mouseleave', handleGlobalRelease);
    };
  }, [isPanning, draggingNodeId, connectingState, panStart, pan, zoom, dragOffset, workflow, recordHistoryState]);

  // Pan Canvas Initiator
  const handlePointerDownOnCanvas = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('.flow-node-card') ||
      target.closest('.port-handle') ||
      target.closest('button') ||
      target.closest('input') ||
      target.closest('select') ||
      target.closest('.node-library-sidebar') ||
      target.closest('.node-config-panel') ||
      target.closest('.canvas-minimap') ||
      target.closest('.quick-insert-menu')
    ) {
      return;
    }

    setQuickInsertEdgeId(null);
    setIsPanning(true);
    setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  };

  // Node Drag Initiator
  const handleNodePointerDown = (nodeId: string, e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();
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
    setQuickInsertEdgeId(null);
  };

  // Start Connection
  const handleStartConnect = (nodeId: string, portId: string, e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();
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
    if (connectingState.sourceNodeId === targetNodeId) {
      setConnectingState(null);
      return;
    }

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

  // Drag from Node Library Drop Handler
  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('text/plain');
    if (!type) return;

    const definition = FLOW_NODE_DEFINITIONS[type];
    if (!definition) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const dropX = Math.round((e.clientX - rect.left - pan.x) / zoom - 120);
    const dropY = Math.round((e.clientY - rect.top - pan.y) / zoom - 40);

    const newNode: FlowNode = {
      id: `node_${Date.now()}`,
      type,
      category: definition.category,
      title: definition.title,
      position: { x: dropX, y: dropY },
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

  // Add Node from Sidebar Button
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

  // Quick Insert Between Connected Edge
  const handleOpenQuickInsert = (edgeId: string, posX: number, posY: number) => {
    setQuickInsertEdgeId(edgeId);
    setQuickInsertPosition({ x: posX, y: posY });
  };

  const handleQuickInsertNode = (type: string) => {
    if (!quickInsertEdgeId || !quickInsertPosition) return;

    const definition = FLOW_NODE_DEFINITIONS[type];
    if (!definition) return;

    const edge = workflow.edges.find((e) => e.id === quickInsertEdgeId);
    if (!edge) return;

    const newNode: FlowNode = {
      id: `node_${Date.now()}`,
      type,
      category: definition.category,
      title: definition.title,
      position: {
        x: Math.round(quickInsertPosition.x - 120),
        y: Math.round(quickInsertPosition.y - 40)
      },
      config: { ...definition.defaultConfig },
      status: 'idle'
    };

    // Replace single edge with: Source -> NewNode -> Target
    const newEdge1: FlowEdge = {
      id: `e_${Date.now()}_1`,
      sourceNodeId: edge.sourceNodeId,
      sourcePortId: edge.sourcePortId,
      targetNodeId: newNode.id,
      targetPortId: 'in',
      animated: true
    };

    const newEdge2: FlowEdge = {
      id: `e_${Date.now()}_2`,
      sourceNodeId: newNode.id,
      sourcePortId: 'out',
      targetNodeId: edge.targetNodeId,
      targetPortId: edge.targetPortId,
      animated: true
    };

    const updated: Workflow = {
      ...workflow,
      nodes: [...workflow.nodes, newNode],
      edges: [...workflow.edges.filter((e) => e.id !== quickInsertEdgeId), newEdge1, newEdge2]
    };

    setWorkflow(updated);
    recordHistoryState(updated);
    setSelectedNodeId(newNode.id);
    setQuickInsertEdgeId(null);
    setQuickInsertPosition(null);
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
    const spacingY = 140;

    const arrangedNodes = workflow.nodes.map((node, index) => ({
      ...node,
      position: {
        x: 80 + (index % 4) * spacingX,
        y: 100 + Math.floor(index / 4) * spacingY
      }
    }));

    const updated = {
      ...workflow,
      nodes: arrangedNodes
    };
    setWorkflow(updated);
    recordHistoryState(updated);
  };

  // Fit to screen (Centers all nodes cleanly)
  const handleFitToScreen = () => {
    if (workflow.nodes.length === 0) {
      setZoom(1);
      setPan({ x: 100, y: 80 });
      return;
    }

    const minX = Math.min(...workflow.nodes.map((n) => n.position.x));
    const maxX = Math.max(...workflow.nodes.map((n) => n.position.x + 240));
    const minY = Math.min(...workflow.nodes.map((n) => n.position.y));
    const maxY = Math.max(...workflow.nodes.map((n) => n.position.y + 100));

    const contentWidth = maxX - minX + 160;
    const contentHeight = maxY - minY + 160;

    const rect = canvasRef.current?.getBoundingClientRect();
    const viewportWidth = rect ? rect.width - 100 : 1000;
    const viewportHeight = rect ? rect.height - 100 : 700;

    const targetZoom = Math.min(
      Math.max(Math.min(viewportWidth / contentWidth, viewportHeight / contentHeight), 0.4),
      1.1
    );

    setZoom(targetZoom);
    setPan({
      x: rect ? rect.width / 2 - ((minX + maxX) / 2) * targetZoom : 80,
      y: rect ? rect.height / 2 - ((minY + maxY) / 2) * targetZoom : 80
    });
  };

  const handleSave = () => {
    saveWorkflow(workflow);
  };

  const handlePublish = () => {
    publishWorkflowVersion(workflow.id, 'Published immutable release');
  };

  const selectedNode = workflow.nodes.find((n) => n.id === selectedNodeId) || null;

  return (
    <div className="fixed inset-0 pt-[60px] bg-slate-100 dark:bg-[#08080f] overflow-hidden select-none touch-none">
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
        onZoomIn={() => setZoom((prev) => Math.min(prev + 0.15, 2.5))}
        onZoomOut={() => setZoom((prev) => Math.max(prev - 0.15, 0.25))}
        onResetZoom={() => {
          setZoom(1);
          setPan({ x: 100, y: 80 });
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
        onPointerDown={handlePointerDownOnCanvas}
        onDragOver={handleCanvasDragOver}
        onDrop={handleCanvasDrop}
        className={`w-full h-full relative overflow-hidden touch-none ${
          isPanning ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          backgroundImage: `radial-gradient(circle, rgba(160, 160, 180, 0.2) 1.2px, transparent 1.2px)`,
          backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`
        }}
      >
        {/* Transformable Canvas Plane */}
        <div
          className="absolute inset-0 origin-top-left pointer-events-none"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`
          }}
        >
          {/* SVG Connection Layer */}
          <svg className="absolute inset-0 w-[8000px] h-[8000px] pointer-events-none overflow-visible">
            {workflow.edges.map((edge) => (
              <g key={edge.id} className="pointer-events-auto">
                <FlowEdgeRenderer
                  edge={edge}
                  nodes={workflow.nodes}
                  selected={selectedEdgeId === edge.id}
                  onDelete={handleDeleteEdge}
                  onOpenQuickInsert={handleOpenQuickInsert}
                />
              </g>
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
          <div className="absolute inset-0 pointer-events-none">
            {workflow.nodes.map((node) => (
              <div
                key={node.id}
                onPointerDown={(e) => handleNodePointerDown(node.id, e)}
                style={{
                  transform: `translate3d(${node.position.x}px, ${node.position.y}px, 0)`
                }}
                className="absolute pointer-events-auto touch-none"
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

          {/* Quick Insert Node Popover Menu */}
          {quickInsertEdgeId && quickInsertPosition && (
            <div
              style={{
                transform: `translate3d(${quickInsertPosition.x - 110}px, ${quickInsertPosition.y - 120}px, 0)`
              }}
              className="quick-insert-menu absolute pointer-events-auto p-2.5 rounded-2xl bg-white dark:bg-[#12121e] border border-amber-500/40 shadow-2xl space-y-2 z-50 w-56 animate-fadeIn"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 border-b border-gray-200 dark:border-white/10 pb-1">
                <span>INSERT STEP</span>
                <button
                  type="button"
                  onClick={() => setQuickInsertEdgeId(null)}
                  className="p-0.5 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleQuickInsertNode('action_send_email')}
                  className="p-1.5 rounded-lg hover:bg-amber-500/15 text-left font-semibold flex items-center gap-1.5 text-amber-700 dark:text-gold-300"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Mail</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickInsertNode('action_wait_delay')}
                  className="p-1.5 rounded-lg hover:bg-amber-500/15 text-left font-semibold flex items-center gap-1.5 text-blue-600 dark:text-blue-300"
                >
                  <Hourglass className="w-3 h-3" />
                  <span>Wait Delay</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickInsertNode('logic_if_else')}
                  className="p-1.5 rounded-lg hover:bg-amber-500/15 text-left font-semibold flex items-center gap-1.5 text-purple-600 dark:text-purple-300"
                >
                  <GitBranch className="w-3 h-3" />
                  <span>IF / ELSE</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickInsertNode('action_http_request')}
                  className="p-1.5 rounded-lg hover:bg-amber-500/15 text-left font-semibold flex items-center gap-1.5 text-emerald-600 dark:text-emerald-300"
                >
                  <Globe className="w-3 h-3" />
                  <span>HTTP API</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickInsertNode('ai_generate_text')}
                  className="p-1.5 rounded-lg hover:bg-amber-500/15 text-left font-semibold flex items-center gap-1.5 text-pink-600 dark:text-pink-300 col-span-2"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI Personalizer</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Canvas Quick Zoom & Navigation Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/90 dark:bg-[#0c0c14]/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl pointer-events-auto">
        <button
          type="button"
          onClick={() => setZoom((prev) => Math.max(prev - 0.15, 0.25))}
          className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          title="Zoom Out (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => {
            setZoom(1);
            setPan({ x: 100, y: 80 });
          }}
          className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-gold-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          title="Reset Zoom to 100%"
        >
          {Math.round(zoom * 100)}%
        </button>

        <button
          type="button"
          onClick={() => setZoom((prev) => Math.min(prev + 0.15, 2.5))}
          className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          title="Zoom In (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-gray-200 dark:bg-white/10 mx-1" />

        <button
          type="button"
          onClick={handleFitToScreen}
          className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          title="Fit All Nodes in View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleAutoArrange}
          className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          title="Auto Arrange Nodes"
        >
          <Layers className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => setIsMinimapOpen(!isMinimapOpen)}
          className={`p-2 rounded-xl transition-colors ${
            isMinimapOpen
              ? 'bg-amber-500/20 text-amber-700 dark:text-gold-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
          }`}
          title="Toggle Radar Minimap"
        >
          <MapPin className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Canvas Minimap */}
      {isMinimapOpen && (
        <div className="canvas-minimap">
          <CanvasMinimap
            nodes={workflow.nodes}
            pan={pan}
            zoom={zoom}
            onPanChange={(newPan) => setPan(newPan)}
          />
        </div>
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
