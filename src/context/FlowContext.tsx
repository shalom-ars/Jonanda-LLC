import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Workflow,
  WorkflowExecution,
  ExecutionStep,
  WorkflowStatus,
  WorkflowVersion,
  Credential,
  IntegrationApp,
  AuditLogEntry,
  UsageQuota
} from '../types/flow';
import { SEED_WORKFLOW_TEMPLATES } from '../data/flowTemplatesData';
import { SEED_INTEGRATIONS } from '../data/flowIntegrationsData';

interface FlowContextType {
  workflows: Workflow[];
  executions: WorkflowExecution[];
  credentials: Credential[];
  integrations: IntegrationApp[];
  auditLogs: AuditLogEntry[];
  usageQuota: UsageQuota;
  getWorkflowById: (id: string) => Workflow | undefined;
  saveWorkflow: (workflow: Workflow) => void;
  publishWorkflowVersion: (id: string, changeSummary?: string) => void;
  deleteWorkflow: (id: string) => void;
  duplicateWorkflow: (id: string) => Workflow;
  toggleWorkflowStatus: (id: string) => void;
  createFromTemplate: (templateId: string) => Workflow | null;
  runWorkflowExecution: (
    workflowId: string,
    testPayload?: Record<string, any>,
    isTest?: boolean
  ) => Promise<WorkflowExecution>;
  getExecutionsForWorkflow: (workflowId: string) => WorkflowExecution[];
  clearExecutionLogs: () => void;
  addCredential: (cred: Omit<Credential, 'id' | 'createdAt' | 'updatedAt' | 'maskedValue' | 'isValid'>) => Credential;
  revokeCredential: (id: string) => void;
  deleteCredential: (id: string) => void;
  testCredential: (id: string) => Promise<boolean>;
  toggleIntegrationConnect: (id: string) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

const SEED_CREDENTIALS: Credential[] = [
  {
    id: 'cred_jnda_mail',
    name: 'JONANDA MAIL Production SMTP',
    type: 'smtp',
    provider: 'JONANDA MAIL Infrastructure',
    createdAt: '2026-08-15',
    updatedAt: '2026-08-30',
    lastUsedAt: '2026-08-31 16:30',
    maskedValue: 'smtp://jonanda-sys:••••••••@mail.jonanda.com:587',
    data: {
      host: 'mail.jonanda.com',
      port: 587,
      username: 'contact@jonanda.com'
    },
    isValid: true
  },
  {
    id: 'cred_security',
    name: 'Security Vulnerability Scanner Key',
    type: 'api_key',
    provider: 'Threat Intelligence Engine',
    createdAt: '2026-08-20',
    updatedAt: '2026-08-20',
    lastUsedAt: '2026-08-31 14:15',
    maskedValue: 'sec_••••••••••••••••••••••••3a9b',
    data: {
      headerName: 'X-Security-Key'
    },
    isValid: true
  },
  {
    id: 'cred_gemini_ai',
    name: 'Google Gemini Pro Key',
    type: 'api_key',
    provider: 'Google AI Studio',
    createdAt: '2026-08-25',
    updatedAt: '2026-08-25',
    maskedValue: 'AIzaSy••••••••••••••••••••••••88k',
    data: {},
    isValid: true
  }
];

const SEED_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'audit_1',
    timestamp: '2026-08-31 16:45:22',
    userId: 'usr_owner_01',
    userName: 'Security Administrator',
    action: 'workflow_published',
    targetResource: 'Institutional Partner Onboarding (v2.0)',
    details: 'Validated DKIM signature check and activated error fallback routing.'
  },
  {
    id: 'audit_2',
    timestamp: '2026-08-31 15:10:04',
    userId: 'usr_owner_01',
    userName: 'Security Administrator',
    action: 'credential_created',
    targetResource: 'JONANDA MAIL Production SMTP',
    details: 'Cryptographically registered outbound mail worker relay.'
  }
];

export const FlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workflows, setWorkflows] = useState<Workflow[]>(() => {
    try {
      const saved = localStorage.getItem('jonanda_flow_workflows');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return SEED_WORKFLOW_TEMPLATES;
  });

  const [executions, setExecutions] = useState<WorkflowExecution[]>(() => {
    try {
      const saved = localStorage.getItem('jonanda_flow_executions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'exec_881920',
        workflowId: 'template_partner_onboarding',
        workflowName: 'Institutional Partner Onboarding',
        workflowVersion: 1,
        triggerType: 'trigger_partner_applied',
        status: 'completed',
        startedAt: '2026-08-31T15:20:00Z',
        completedAt: '2026-08-31T15:20:01Z',
        durationMs: 320,
        initialPayload: {
          company: 'Nexus Cyber Systems',
          contactName: 'Sarah Jenkins',
          email: 'partnerships@nexuscyber.io',
          track: 'Infrastructure & Cloud Security'
        },
        steps: [
          {
            nodeId: 'node_1',
            nodeTitle: 'New Partner Application',
            nodeType: 'trigger_partner_applied',
            status: 'completed',
            startedAt: '2026-08-31T15:20:00.100Z',
            completedAt: '2026-08-31T15:20:00.150Z',
            durationMs: 50,
            outputData: { verified: true }
          },
          {
            nodeId: 'node_2',
            nodeTitle: 'Notify Executive Team',
            nodeType: 'action_internal_alert',
            status: 'completed',
            startedAt: '2026-08-31T15:20:00.150Z',
            completedAt: '2026-08-31T15:20:00.220Z',
            durationMs: 70
          },
          {
            nodeId: 'node_3',
            nodeTitle: 'Review Status Approved?',
            nodeType: 'logic_if_else',
            status: 'completed',
            startedAt: '2026-08-31T15:20:00.220Z',
            completedAt: '2026-08-31T15:20:00.240Z',
            durationMs: 20,
            outputData: { branch: 'true' }
          },
          {
            nodeId: 'node_4',
            nodeTitle: 'Send Partner Welcome',
            nodeType: 'action_send_email',
            status: 'completed',
            startedAt: '2026-08-31T15:20:00.240Z',
            completedAt: '2026-08-31T15:20:00.320Z',
            durationMs: 80,
            outputData: { messageId: 'jnda_msg_489218', delivery: 'queued' }
          }
        ]
      }
    ];
  });

  const [credentials, setCredentials] = useState<Credential[]>(() => {
    try {
      const saved = localStorage.getItem('jonanda_flow_credentials');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return SEED_CREDENTIALS;
  });

  const [integrations, setIntegrations] = useState<IntegrationApp[]>(() => {
    try {
      const saved = localStorage.getItem('jonanda_flow_integrations');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return SEED_INTEGRATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(SEED_AUDIT_LOGS);

  const [usageQuota] = useState<UsageQuota>({
    tier: 'JONANDA ONE',
    workflowsUsed: workflows.length,
    workflowsMax: 50,
    executionsThisMonth: 1840,
    executionsMonthlyMax: 10000,
    emailsAutomatedThisMonth: 820,
    emailsMonthlyMax: 5000,
    apiRequestsThisMonth: 3420,
    apiRequestsMonthlyMax: 25000,
    teamSeatsUsed: 3,
    teamSeatsMax: 10
  });

  useEffect(() => {
    localStorage.setItem('jonanda_flow_workflows', JSON.stringify(workflows));
  }, [workflows]);

  useEffect(() => {
    localStorage.setItem('jonanda_flow_executions', JSON.stringify(executions));
  }, [executions]);

  useEffect(() => {
    localStorage.setItem('jonanda_flow_credentials', JSON.stringify(credentials));
  }, [credentials]);

  useEffect(() => {
    localStorage.setItem('jonanda_flow_integrations', JSON.stringify(integrations));
  }, [integrations]);

  const logAudit = (action: AuditLogEntry['action'], targetResource: string, details: string) => {
    const entry: AuditLogEntry = {
      id: `audit_${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      userId: 'usr_admin',
      userName: 'Administrator',
      action,
      targetResource,
      details
    };
    setAuditLogs((prev) => [entry, ...prev.slice(0, 49)]);
  };

  const getWorkflowById = (id: string): Workflow | undefined => {
    return workflows.find((w) => w.id === id);
  };

  const saveWorkflow = (updated: Workflow) => {
    setWorkflows((prev) => {
      const idx = prev.findIndex((w) => w.id === updated.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = {
          ...updated,
          updatedAt: new Date().toISOString().split('T')[0]
        };
        return next;
      }
      return [
        {
          ...updated,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          version: 1
        },
        ...prev
      ];
    });
    logAudit('workflow_updated', updated.name, `Saved changes to workflow version ${updated.version || 1}.0`);
  };

  const publishWorkflowVersion = (id: string, changeSummary?: string) => {
    setWorkflows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const newVerNum = (w.version || 1) + 1;
          const versionSnapshot: WorkflowVersion = {
            versionNumber: w.version || 1,
            publishedAt: new Date().toISOString(),
            author: 'Corporate Administrator',
            changeSummary: changeSummary || 'Published standard release update',
            nodesSnapshot: [...w.nodes],
            edgesSnapshot: [...w.edges]
          };

          return {
            ...w,
            version: newVerNum,
            publishedAt: new Date().toISOString().split('T')[0],
            status: 'active',
            versions: [versionSnapshot, ...(w.versions || [])]
          };
        }
        return w;
      })
    );
    const targetWf = workflows.find((w) => w.id === id);
    if (targetWf) {
      logAudit('workflow_published', targetWf.name, `Published version ${(targetWf.version || 1) + 1}.0`);
    }
  };

  const deleteWorkflow = (id: string) => {
    const target = workflows.find((w) => w.id === id);
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
    if (target) {
      logAudit('workflow_deleted', target.name, 'Deleted workflow pipeline');
    }
  };

  const duplicateWorkflow = (id: string): Workflow => {
    const original = workflows.find((w) => w.id === id);
    if (!original) throw new Error('Workflow not found');

    const copy: Workflow = {
      ...original,
      id: `wf_${Date.now()}`,
      name: `${original.name} (Copy)`,
      status: 'draft',
      isTemplate: false,
      version: 1,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      executionCount: 0,
      successRate: 100
    };

    setWorkflows((prev) => [copy, ...prev]);
    logAudit('workflow_created', copy.name, `Cloned from ${original.name}`);
    return copy;
  };

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const nextStatus: WorkflowStatus = w.status === 'active' ? 'paused' : 'active';
          logAudit(
            nextStatus === 'active' ? 'workflow_activated' : 'workflow_paused',
            w.name,
            `Toggled state to ${nextStatus}`
          );
          return { ...w, status: nextStatus, updatedAt: new Date().toISOString().split('T')[0] };
        }
        return w;
      })
    );
  };

  const createFromTemplate = (templateId: string): Workflow | null => {
    const template =
      SEED_WORKFLOW_TEMPLATES.find((t) => t.id === templateId) ||
      workflows.find((t) => t.id === templateId);
    if (!template) return null;

    const newWorkflow: Workflow = {
      ...template,
      id: `wf_${Date.now()}`,
      name: `${template.name}`,
      description: template.description,
      status: 'draft',
      isTemplate: false,
      version: 1,
      executionCount: 0,
      successRate: 100,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setWorkflows((prev) => [newWorkflow, ...prev]);
    logAudit('workflow_created', newWorkflow.name, `Created from blueprint template: ${template.name}`);
    return newWorkflow;
  };

  // Safe SSRF Guard check
  const isUrlAllowed = (urlString: string): boolean => {
    try {
      const url = new URL(urlString);
      const host = url.hostname.toLowerCase();
      // Block private IP ranges and internal cloud metadata
      if (
        host === 'localhost' ||
        host === '127.0.0.1' ||
        host.startsWith('10.') ||
        host.startsWith('192.168.') ||
        host.startsWith('172.16.') ||
        host === '169.254.169.254'
      ) {
        return false;
      }
      return url.protocol === 'https:' || url.protocol === 'http:';
    } catch {
      return false;
    }
  };

  // Dynamic Variable Interpolator
  const interpolateTokens = (text: string, context: Record<string, any>): string => {
    return text.replace(/\{\{([^{}]+)\}\}/g, (_, key) => {
      const trimmed = key.trim();
      if (trimmed in context) return String(context[trimmed]);
      const parts = trimmed.split('.');
      let val: any = context;
      for (const part of parts) {
        if (val && typeof val === 'object' && part in val) {
          val = val[part];
        } else {
          return `{{${trimmed}}}`;
        }
      }
      return val !== undefined ? String(val) : `{{${trimmed}}}`;
    });
  };

  // Realistic Graph-Based Workflow Execution Engine
  const runWorkflowExecution = async (
    workflowId: string,
    testPayload: Record<string, any> = {},
    isTest: boolean = false
  ): Promise<WorkflowExecution> => {
    const workflow = getWorkflowById(workflowId);
    if (!workflow) throw new Error('Workflow not found');

    const execId = `exec_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const startTime = new Date();
    const executionSteps: ExecutionStep[] = [];
    const executionContext: Record<string, any> = {
      ...testPayload,
      now: new Date().toISOString(),
      'execution.id': execId
    };

    // Find root nodes (nodes with no incoming edges or category === 'trigger')
    const incomingEdgeTargetIds = new Set(workflow.edges.map((e) => e.targetNodeId));
    let currentNodes = workflow.nodes.filter(
      (n) => n.category === 'trigger' || !incomingEdgeTargetIds.has(n.id)
    );

    if (currentNodes.length === 0 && workflow.nodes.length > 0) {
      currentNodes = [workflow.nodes[0]];
    }

    const visitedNodes = new Set<string>();

    while (currentNodes.length > 0) {
      const nextLevelNodes: typeof workflow.nodes = [];

      for (const node of currentNodes) {
        if (visitedNodes.has(node.id)) continue;
        visitedNodes.add(node.id);

        const stepStart = new Date();
        await new Promise((resolve) => setTimeout(resolve, 90));

        let hasError = false;
        let errorMsg: string | undefined = undefined;
        let outputData: Record<string, any> = {};

        // 1. SSRF check for HTTP nodes
        if (node.type === 'action_http_request' && node.config?.url) {
          if (!isUrlAllowed(node.config.url)) {
            hasError = true;
            errorMsg = 'Security Error: SSRF protection blocked access to private/internal network host.';
          } else {
            outputData = {
              status: 200,
              body: { message: 'HTTP request successfully processed in sandbox.' }
            };
            executionContext['http_response.status'] = 200;
            executionContext['http_response.body'] = JSON.stringify(outputData.body);
          }
        }

        // 2. Email actions token resolution
        else if (node.type === 'action_send_email' || node.type.includes('email')) {
          const resolvedSubject = interpolateTokens(node.config?.subject || 'Workflow Notification', executionContext);
          const resolvedTo = interpolateTokens(node.config?.to || testPayload.email || 'partner@enterprise.com', executionContext);
          outputData = {
            messageId: `msg_${Date.now()}`,
            to: resolvedTo,
            subject: resolvedSubject,
            dkimVerified: true,
            status: 'queued'
          };
          executionContext['mail.status'] = 'delivered';
          executionContext['mail.messageId'] = outputData.messageId;
        }

        // 3. Logic IF/ELSE evaluation
        else if (node.type === 'logic_if_else') {
          const field = node.config?.field || 'status';
          const operator = node.config?.operator || 'equals';
          const targetVal = node.config?.value || 'approved';
          const currentVal = executionContext[field] || testPayload[field] || 'approved';

          let conditionMet = false;
          if (operator === 'equals') conditionMet = String(currentVal) === String(targetVal);
          else if (operator === 'not_equals') conditionMet = String(currentVal) !== String(targetVal);
          else if (operator === 'contains') conditionMet = String(currentVal).includes(String(targetVal));
          else if (operator === 'greater_than') conditionMet = Number(currentVal) > Number(targetVal);
          else if (operator === 'less_than') conditionMet = Number(currentVal) < Number(targetVal);
          else if (operator === 'exists') conditionMet = currentVal !== undefined && currentVal !== null && currentVal !== '';
          else conditionMet = true;

          outputData = { branchEvaluated: conditionMet ? 'true' : 'false', field, currentVal, conditionMet };
        }

        // 4. AI Generator Simulation
        else if (node.type.startsWith('ai_')) {
          const prompt = interpolateTokens(node.config?.prompt || 'Summarize context', executionContext);
          outputData = {
            task: node.config?.task || 'Generate',
            prompt,
            result: `AI generated response: Validated suitability for ${executionContext.companyName || 'Institutional Partner'}.`
          };
          const outVar = node.config?.outputVar || 'ai_generated_text';
          executionContext[outVar] = outputData.result;
        }

        // Standard nodes
        else {
          outputData = { processed: true, timestamp: new Date().toISOString() };
        }

        executionSteps.push({
          nodeId: node.id,
          nodeTitle: node.title,
          nodeType: node.type,
          status: hasError ? 'failed' : 'completed',
          startedAt: stepStart.toISOString(),
          completedAt: new Date().toISOString(),
          durationMs: 90,
          inputData: executionContext,
          outputData: hasError ? undefined : outputData,
          error: errorMsg,
          httpStatus: hasError ? 403 : 200
        });

        if (hasError) break;

        // Traverse downstream edges
        const outgoingEdges = workflow.edges.filter((e) => e.sourceNodeId === node.id);

        if (node.type === 'logic_if_else') {
          const branchTargetPort = outputData.branchEvaluated === 'true' ? 'true' : 'false';
          const matchingEdges = outgoingEdges.filter(
            (e) => e.sourcePortId === branchTargetPort || e.sourcePortId === `out_${branchTargetPort}`
          );
          for (const edge of matchingEdges.length > 0 ? matchingEdges : outgoingEdges) {
            const nextNode = workflow.nodes.find((n) => n.id === edge.targetNodeId);
            if (nextNode && !visitedNodes.has(nextNode.id)) {
              nextLevelNodes.push(nextNode);
            }
          }
        } else {
          for (const edge of outgoingEdges) {
            const nextNode = workflow.nodes.find((n) => n.id === edge.targetNodeId);
            if (nextNode && !visitedNodes.has(nextNode.id)) {
              nextLevelNodes.push(nextNode);
            }
          }
        }
      }

      currentNodes = nextLevelNodes;
      if (executionSteps.some((s) => s.status === 'failed')) break;
    }

    const hasFailure = executionSteps.some((s) => s.status === 'failed');
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();

    const newExec: WorkflowExecution = {
      id: execId,
      workflowId: workflow.id,
      workflowName: workflow.name,
      workflowVersion: workflow.version || 1,
      triggerType: workflow.nodes[0]?.type || 'trigger_manual',
      status: hasFailure ? 'failed' : 'completed',
      startedAt: startTime.toISOString(),
      completedAt: endTime.toISOString(),
      durationMs,
      steps: executionSteps,
      initialPayload: testPayload,
      isTest,
      error: hasFailure ? 'Workflow execution halted due to step failure' : undefined
    };

    setExecutions((prev) => [newExec, ...prev]);

    setWorkflows((prev) =>
      prev.map((w) => {
        if (w.id === workflowId) {
          return {
            ...w,
            executionCount: (w.executionCount || 0) + 1,
            updatedAt: new Date().toISOString().split('T')[0]
          };
        }
        return w;
      })
    );

    logAudit(
      hasFailure ? 'execution_failed' : 'execution_triggered',
      workflow.name,
      `Executed ${isTest ? 'Sandbox Test' : 'Pipeline Execution'} (${durationMs}ms)`
    );

    return newExec;
  };

  const getExecutionsForWorkflow = (workflowId: string) => {
    return executions.filter((e) => e.workflowId === workflowId);
  };

  const clearExecutionLogs = () => {
    setExecutions([]);
  };

  const addCredential = (
    credData: Omit<Credential, 'id' | 'createdAt' | 'updatedAt' | 'maskedValue' | 'isValid'>
  ): Credential => {
    const newCred: Credential = {
      ...credData,
      id: `cred_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      maskedValue: `${credData.type.toUpperCase()}-••••••••••••${Math.floor(Math.random() * 9000 + 1000)}`,
      isValid: true
    };

    setCredentials((prev) => [newCred, ...prev]);
    logAudit('credential_created', newCred.name, `Registered new ${newCred.type} credential for ${newCred.provider}`);
    return newCred;
  };

  const revokeCredential = (id: string) => {
    setCredentials((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isValid: false, updatedAt: new Date().toISOString().split('T')[0] } : c))
    );
    const target = credentials.find((c) => c.id === id);
    if (target) {
      logAudit('credential_revoked', target.name, 'Revoked authorization token');
    }
  };

  const deleteCredential = (id: string) => {
    setCredentials((prev) => prev.filter((c) => c.id !== id));
  };

  const testCredential = async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return credentials.some((c) => c.id === id && c.isValid);
  };

  const toggleIntegrationConnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isConnected: !item.isConnected } : item
      )
    );
  };

  return (
    <FlowContext.Provider
      value={{
        workflows,
        executions,
        credentials,
        integrations,
        auditLogs,
        usageQuota,
        getWorkflowById,
        saveWorkflow,
        publishWorkflowVersion,
        deleteWorkflow,
        duplicateWorkflow,
        toggleWorkflowStatus,
        createFromTemplate,
        runWorkflowExecution,
        getExecutionsForWorkflow,
        clearExecutionLogs,
        addCredential,
        revokeCredential,
        deleteCredential,
        testCredential,
        toggleIntegrationConnect
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
};
