export type NodeCategory =
  | 'trigger'
  | 'action'
  | 'logic'
  | 'data'
  | 'ai'
  | 'database'
  | 'integration'
  | 'code';

export type WorkflowStatus = 'active' | 'draft' | 'paused' | 'archived';

export type WorkflowCategory =
  | 'partner'
  | 'influencer'
  | 'brand'
  | 'customer'
  | 'ecosystem'
  | 'api'
  | 'ai'
  | 'data'
  | 'custom';

export type ExecutionState =
  | 'queued'
  | 'running'
  | 'waiting'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface NodePort {
  id: string;
  label: string;
  type: 'input' | 'output';
  dataType?: 'any' | 'string' | 'object' | 'array' | 'boolean' | 'number';
}

export interface FlowNodeDefinition {
  type: string;
  category: NodeCategory;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  color?: string;
  inputs: NodePort[];
  outputs: NodePort[];
  defaultConfig: Record<string, any>;
  credentialsRequired?: string[];
  docsUrl?: string;
}

export interface FlowNode {
  id: string;
  type: string;
  category: NodeCategory;
  title: string;
  position: { x: number; y: number };
  config: Record<string, any>;
  credentialId?: string;
  status?: 'idle' | 'running' | 'success' | 'error' | 'waiting';
  lastError?: string;
  notes?: string;
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

export interface WorkflowVersion {
  versionNumber: number;
  publishedAt: string;
  author: string;
  changeSummary?: string;
  nodesSnapshot: FlowNode[];
  edgesSnapshot: FlowEdge[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: WorkflowCategory;
  status: WorkflowStatus;
  version: number;
  isTemplate?: boolean;
  author?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  executionCount?: number;
  successRate?: number;
  webhookEndpoint?: string;
  webhookSecret?: string;
  variables: Record<string, string>;
  nodes: FlowNode[];
  edges: FlowEdge[];
  versions?: WorkflowVersion[];
  settings?: {
    timezone?: string;
    maxRetries?: number;
    retryDelayMs?: number;
    errorHandling?: 'stop' | 'continue' | 'route_error_branch';
    timeoutSeconds?: number;
    concurrencyLimit?: number;
  };
}

export interface ExecutionStep {
  nodeId: string;
  nodeTitle: string;
  nodeType: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'waiting';
  startedAt: string;
  completedAt?: string;
  durationMs: number;
  inputData?: Record<string, any>;
  outputData?: Record<string, any>;
  error?: string;
  retryCount?: number;
  httpStatus?: number;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowName: string;
  workflowVersion?: number;
  triggerType: string;
  status: ExecutionState;
  startedAt: string;
  completedAt?: string;
  durationMs: number;
  steps: ExecutionStep[];
  initialPayload?: Record<string, any>;
  finalResult?: Record<string, any>;
  error?: string;
  isTest?: boolean;
  executedBy?: string;
}

export type CredentialType =
  | 'api_key'
  | 'oauth2'
  | 'bearer_token'
  | 'basic_auth'
  | 'smtp'
  | 'database'
  | 'webhook_secret';

export interface Credential {
  id: string;
  name: string;
  type: CredentialType;
  provider: string;
  createdAt: string;
  updatedAt: string;
  lastUsedAt?: string;
  maskedValue: string; // e.g. "sk-••••••••••••39a1" (secrets never stored raw on client)
  data: {
    apiKey?: string;
    bearerToken?: string;
    username?: string;
    password?: string;
    host?: string;
    port?: number;
    databaseName?: string;
    clientId?: string;
    oauthScopes?: string[];
    headerName?: string;
  };
  isValid: boolean;
}

export interface IntegrationApp {
  id: string;
  name: string;
  category: 'ai' | 'database' | 'communication' | 'ecosystem' | 'dev' | 'crm';
  description: string;
  iconName: string;
  authType: CredentialType;
  isConnected: boolean;
  credentialId?: string;
  docsUrl?: string;
  featured?: boolean;
  capabilities: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action:
    | 'workflow_created'
    | 'workflow_updated'
    | 'workflow_published'
    | 'workflow_activated'
    | 'workflow_paused'
    | 'workflow_deleted'
    | 'credential_created'
    | 'credential_revoked'
    | 'execution_triggered'
    | 'execution_failed';
  targetResource: string;
  details: string;
  ipAddress?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Automation Manager' | 'Developer' | 'Viewer';
  status: 'active' | 'invited';
  joinedAt: string;
}

export interface UsageQuota {
  tier: 'Free' | 'JONANDA ONE' | 'Premium' | 'Enterprise';
  workflowsUsed: number;
  workflowsMax: number;
  executionsThisMonth: number;
  executionsMonthlyMax: number;
  emailsAutomatedThisMonth: number;
  emailsMonthlyMax: number;
  apiRequestsThisMonth: number;
  apiRequestsMonthlyMax: number;
  teamSeatsUsed: number;
  teamSeatsMax: number;
}

// Partner & Influencer Data Interfaces
export interface PartnerApplication {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  website?: string;
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
  platform: 'YouTube' | 'TikTok' | 'Instagram' | 'X (Twitter)' | 'LinkedIn';
  followersCount: string;
  niche: string;
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
  status: 'draft' | 'active' | 'completed';
  invitedCount: number;
  acceptedCount: number;
  submissionsCount: number;
  deadline: string;
  brief: string;
}
