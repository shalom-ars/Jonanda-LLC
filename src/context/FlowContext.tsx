import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Workflow,
  WorkflowExecution,
  ExecutionStep,
  WorkflowStatus
} from '../types/flow';
import { SEED_WORKFLOW_TEMPLATES } from '../data/flowTemplatesData';

interface FlowContextType {
  workflows: Workflow[];
  executions: WorkflowExecution[];
  getWorkflowById: (id: string) => Workflow | undefined;
  saveWorkflow: (workflow: Workflow) => void;
  deleteWorkflow: (id: string) => void;
  duplicateWorkflow: (id: string) => Workflow;
  toggleWorkflowStatus: (id: string) => void;
  createFromTemplate: (templateId: string) => Workflow | null;
  runWorkflowExecution: (workflowId: string, testPayload?: Record<string, any>, isTest?: boolean) => Promise<WorkflowExecution>;
  getExecutionsForWorkflow: (workflowId: string) => WorkflowExecution[];
  clearExecutionLogs: () => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_WORKFLOWS = 'jonanda_flow_workflows';
const LOCAL_STORAGE_KEY_EXECUTIONS = 'jonanda_flow_executions';

export const FlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workflows, setWorkflows] = useState<Workflow[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_WORKFLOWS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading workflows from storage', e);
    }
    return SEED_WORKFLOW_TEMPLATES;
  });

  const [executions, setExecutions] = useState<WorkflowExecution[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_EXECUTIONS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading executions from storage', e);
    }
    // Seed initial executions log
    return [
      {
        id: 'exec_991823',
        workflowId: 'template_partner_onboarding',
        workflowName: 'Institutional Partner Onboarding',
        triggerType: 'trigger_partner_applied',
        status: 'completed',
        startedAt: '2026-08-31T14:20:10Z',
        completedAt: '2026-08-31T14:20:12Z',
        durationMs: 240,
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
            startedAt: '2026-08-31T14:20:10.100Z',
            completedAt: '2026-08-31T14:20:10.150Z',
            durationMs: 50,
            outputData: { verified: true }
          },
          {
            nodeId: 'node_2',
            nodeTitle: 'Notify Executive Team',
            nodeType: 'action_internal_alert',
            status: 'completed',
            startedAt: '2026-08-31T14:20:10.150Z',
            completedAt: '2026-08-31T14:20:10.220Z',
            durationMs: 70
          },
          {
            nodeId: 'node_3',
            nodeTitle: 'Review Status Approved?',
            nodeType: 'logic_if_else',
            status: 'completed',
            startedAt: '2026-08-31T14:20:10.220Z',
            completedAt: '2026-08-31T14:20:10.240Z',
            durationMs: 20,
            outputData: { branch: 'true' }
          },
          {
            nodeId: 'node_4',
            nodeTitle: 'Send Partner Welcome',
            nodeType: 'action_send_email',
            status: 'completed',
            startedAt: '2026-08-31T14:20:10.240Z',
            completedAt: '2026-08-31T14:20:10.320Z',
            durationMs: 80,
            outputData: { messageId: 'jnda_msg_489218', delivery: 'queued' }
          }
        ]
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_WORKFLOWS, JSON.stringify(workflows));
    } catch (e) {
      console.error('Error saving workflows to storage', e);
    }
  }, [workflows]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_EXECUTIONS, JSON.stringify(executions));
    } catch (e) {
      console.error('Error saving executions to storage', e);
    }
  }, [executions]);

  const getWorkflowById = (id: string): Workflow | undefined => {
    return workflows.find((w) => w.id === id);
  };

  const saveWorkflow = (updated: Workflow) => {
    setWorkflows((prev) => {
      const index = prev.findIndex((w) => w.id === updated.id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = {
          ...updated,
          updatedAt: new Date().toISOString().split('T')[0],
          version: (prev[index].version || 1) + 1
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
  };

  const deleteWorkflow = (id: string) => {
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
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
    return copy;
  };

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const nextStatus: WorkflowStatus = w.status === 'active' ? 'paused' : 'active';
          return { ...w, status: nextStatus, updatedAt: new Date().toISOString().split('T')[0] };
        }
        return w;
      })
    );
  };

  const createFromTemplate = (templateId: string): Workflow | null => {
    const template = SEED_WORKFLOW_TEMPLATES.find((t) => t.id === templateId) || workflows.find((t) => t.id === templateId);
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
    return newWorkflow;
  };

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

    // Simulate step-by-step deterministic node execution graph
    for (let i = 0; i < workflow.nodes.length; i++) {
      const node = workflow.nodes[i];
      const stepStart = new Date();

      // Small async delay to simulate execution feel
      await new Promise((resolve) => setTimeout(resolve, 80));

      const isNodeFailed = node.type === 'action_http_webhook' && node.config?.url?.includes('fail');

      executionSteps.push({
        nodeId: node.id,
        nodeTitle: node.title,
        nodeType: node.type,
        status: isNodeFailed ? 'failed' : 'completed',
        startedAt: stepStart.toISOString(),
        completedAt: new Date().toISOString(),
        durationMs: 80,
        inputData: testPayload,
        outputData: isNodeFailed ? undefined : { processed: true, timestamp: new Date().toISOString() },
        error: isNodeFailed ? 'Destination endpoint returned 502 Bad Gateway' : undefined
      });

      if (isNodeFailed) break;
    }

    const hasFailure = executionSteps.some((s) => s.status === 'failed');
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();

    const newExec: WorkflowExecution = {
      id: execId,
      workflowId: workflow.id,
      workflowName: workflow.name,
      triggerType: workflow.nodes[0]?.type || 'trigger_manual',
      status: hasFailure ? 'failed' : 'completed',
      startedAt: startTime.toISOString(),
      completedAt: endTime.toISOString(),
      durationMs,
      steps: executionSteps,
      initialPayload: testPayload,
      isTest,
      error: hasFailure ? 'One or more execution steps encountered an error' : undefined
    };

    setExecutions((prev) => [newExec, ...prev]);

    // Update workflow stats
    setWorkflows((prev) =>
      prev.map((w) => {
        if (w.id === workflowId) {
          const newCount = (w.executionCount || 0) + 1;
          return {
            ...w,
            executionCount: newCount,
            updatedAt: new Date().toISOString().split('T')[0]
          };
        }
        return w;
      })
    );

    return newExec;
  };

  const getExecutionsForWorkflow = (workflowId: string) => {
    return executions.filter((e) => e.workflowId === workflowId);
  };

  const clearExecutionLogs = () => {
    setExecutions([]);
  };

  return (
    <FlowContext.Provider
      value={{
        workflows,
        executions,
        getWorkflowById,
        saveWorkflow,
        deleteWorkflow,
        duplicateWorkflow,
        toggleWorkflowStatus,
        createFromTemplate,
        runWorkflowExecution,
        getExecutionsForWorkflow,
        clearExecutionLogs
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
