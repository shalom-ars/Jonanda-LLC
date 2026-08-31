import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SEOHead } from '../../components/common/SEOHead';
import { FlowCanvas } from '../../components/flow/builder/FlowCanvas';
import { useFlow } from '../../context/FlowContext';
import { Workflow } from '../../types/flow';

export const FlowBuilderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getWorkflowById } = useFlow();

  const workflow: Workflow = useMemo(() => {
    if (id) {
      const found = getWorkflowById(id);
      if (found) return found;
    }

    // Default scaffold for a new workflow
    return {
      id: `wf_${Date.now()}`,
      name: 'Untitled Automation Pipeline',
      description: 'Custom visual automation created in JONANDA Flow.',
      category: 'custom',
      status: 'draft',
      version: 1,
      executionCount: 0,
      successRate: 100,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      variables: {},
      nodes: [
        {
          id: 'start_node',
          type: 'trigger_manual',
          category: 'trigger',
          title: 'Manual On-Demand Trigger',
          position: { x: 100, y: 180 },
          config: {},
          status: 'idle'
        },
        {
          id: 'action_email',
          type: 'action_send_email',
          category: 'action',
          title: 'Send JONANDA Mail',
          position: { x: 460, y: 180 },
          config: {
            to: '{{email}}',
            subject: 'Automated Update from JONANDA FLOW',
            bodyText: 'Hello {{first_name}},\n\nThis is an automated workflow execution dispatched by JONANDA Flow.'
          },
          status: 'idle'
        }
      ],
      edges: [
        {
          id: 'edge_start_email',
          sourceNodeId: 'start_node',
          sourcePortId: 'out',
          targetNodeId: 'action_email',
          targetPortId: 'in',
          animated: true
        }
      ]
    };
  }, [id, getWorkflowById]);

  return (
    <>
      <SEOHead
        title={`Flow Builder: ${workflow.name} | JONANDA FLOW`}
        description="Visual drag-and-drop workflow canvas for partners, influencers, campaigns, and email sequences."
      />
      <FlowCanvas initialWorkflow={workflow} />
    </>
  );
};
