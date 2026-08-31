export type NodeCategory = 'trigger' | 'action' | 'logic' | 'data';

export interface NodePort {
  id: string;
  label: string;
  type: 'input' | 'output';
  dataType?: 'any' | 'boolean' | 'string' | 'object';
}

export interface FlowNodeDefinition {
  type: string;
  category: NodeCategory;
  title: string;
  subtitle: string;
  iconName: string;
  color: string; // Tailwind color class / hex identifier
  description: string;
  defaultConfig: Record<string, any>;
  inputs: NodePort[];
  outputs: NodePort[];
}

export interface FlowNode {
  id: string;
  type: string;
  category: NodeCategory;
  title: string;
  position: { x: number; y: number };
  config: Record<string, any>;
  status?: 'idle' | 'running' | 'success' | 'failed' | 'waiting';
}

export interface FlowEdge {
  id: string;
  sourceNodeId: string;
  sourcePortId: string;
  targetNodeId: string;
  targetPortId: string;
  label?: string;
  animated?: boolean;
}

export type WorkflowStatus = 'active' | 'draft' | 'paused';

export type WorkflowCategory = 
  | 'partner' 
  | 'influencer' 
  | 'brand' 
  | 'customer' 
  | 'ecosystem' 
  | 'custom';

export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: WorkflowCategory;
  status: WorkflowStatus;
  version: number;
  nodes: FlowNode[];
  edges: FlowEdge[];
  variables: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  executionCount: number;
  successRate: number;
  isTemplate?: boolean;
  author?: string;
}

export interface ExecutionStep {
  nodeId: string;
  nodeTitle: string;
  nodeType: string;
  status: 'completed' | 'failed' | 'skipped' | 'running';
  startedAt: string;
  completedAt?: string;
  durationMs?: number;
  inputData?: any;
  outputData?: any;
  error?: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowName: string;
  triggerType: string;
  status: 'completed' | 'failed' | 'running' | 'waiting';
  startedAt: string;
  completedAt?: string;
  durationMs: number;
  steps: ExecutionStep[];
  initialPayload: Record<string, any>;
  error?: string;
  isTest?: boolean;
  triggeredBy?: string;
}

export interface PartnerApplication {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  website: string;
  track: string;
  tier: 'Standard' | 'Strategic' | 'Enterprise';
  status: 'pending' | 'approved' | 'rejected' | 'active';
  appliedAt: string;
  notes?: string;
}

export interface InfluencerApplication {
  id: string;
  creatorName: string;
  handle: string;
  platform: 'YouTube' | 'X (Twitter)' | 'LinkedIn' | 'Instagram' | 'TikTok';
  followersCount: string;
  niche: 'Web3 & Crypto' | 'AI & Tech' | 'Software Dev' | 'Enterprise Tech';
  email: string;
  status: 'pending' | 'approved' | 'rejected' | 'active';
  appliedAt: string;
  rating?: number;
}

export interface BrandCampaign {
  id: string;
  title: string;
  brandName: string;
  budget: string;
  status: 'draft' | 'active' | 'in_review' | 'completed';
  invitedCount: number;
  acceptedCount: number;
  submissionsCount: number;
  deadline: string;
  brief: string;
}
