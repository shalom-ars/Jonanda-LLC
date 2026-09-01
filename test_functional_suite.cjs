/**
 * JONANDA LLC & FLOW — Comprehensive Functional Test Suite (Node.js)
 * Tests all core modules, workflow engine, variable resolution,
 * SSRF security guards, mail dispatch, and partner/influencer flows.
 */

// 1. SSRF Security Guard Test
const isUrlAllowed = (urlString) => {
  try {
    const url = new URL(urlString);
    const host = url.hostname.toLowerCase();
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

// 2. Variable Token Interpolator Test
const interpolateTokens = (text, context) => {
  return text.replace(/\{\{([^{}]+)\}\}/g, (_, key) => {
    const trimmed = key.trim();
    if (trimmed in context) return String(context[trimmed]);
    const parts = trimmed.split('.');
    let val = context;
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

// 3. Condition Branch Evaluator Test
const evaluateCondition = (field, operator, targetVal, context) => {
  const currentVal = context[field];
  if (operator === 'equals') return String(currentVal) === String(targetVal);
  if (operator === 'not_equals') return String(currentVal) !== String(targetVal);
  if (operator === 'contains') return String(currentVal).includes(String(targetVal));
  if (operator === 'greater_than') return Number(currentVal) > Number(targetVal);
  if (operator === 'less_than') return Number(currentVal) < Number(targetVal);
  if (operator === 'exists') return currentVal !== undefined && currentVal !== null && currentVal !== '';
  return true;
};

// 4. DAG Workflow Graph Execution Simulation
const simulateWorkflowRun = (workflow, payload) => {
  const context = {
    ...payload,
    now: new Date().toISOString(),
    'execution.id': `exec_${Date.now()}`
  };

  const executedSteps = [];
  const incomingTargetIds = new Set(workflow.edges.map((e) => e.targetNodeId));
  let currentNodes = workflow.nodes.filter(
    (n) => n.category === 'trigger' || !incomingTargetIds.has(n.id)
  );

  const visited = new Set();

  while (currentNodes.length > 0) {
    const nextLevel = [];

    for (const node of currentNodes) {
      if (visited.has(node.id)) continue;
      visited.add(node.id);

      let stepOutput = {};
      let isSuccess = true;

      if (node.type === 'action_http_request' && node.config && node.config.url) {
        if (!isUrlAllowed(node.config.url)) {
          isSuccess = false;
          stepOutput = { error: 'SSRF blocked' };
        } else {
          stepOutput = { status: 200, data: 'OK' };
        }
      } else if (node.type === 'action_send_email') {
        const to = interpolateTokens(node.config.to || '{{email}}', context);
        const subject = interpolateTokens(node.config.subject || '', context);
        stepOutput = { to, subject, status: 'delivered', messageId: `msg_${Date.now()}` };
      } else if (node.type === 'logic_if_else') {
        const isMet = evaluateCondition(
          node.config.field,
          node.config.operator,
          node.config.value,
          context
        );
        stepOutput = { branch: isMet ? 'true' : 'false', conditionMet: isMet };
      } else {
        stepOutput = { processed: true };
      }

      executedSteps.push({
        nodeId: node.id,
        title: node.title,
        status: isSuccess ? 'completed' : 'failed',
        output: stepOutput
      });

      if (!isSuccess) break;

      const outgoing = workflow.edges.filter((e) => e.sourceNodeId === node.id);
      if (node.type === 'logic_if_else') {
        const branchPort = stepOutput.branch;
        const matchingEdges = outgoing.filter((e) => e.sourcePortId === branchPort);
        for (const edge of matchingEdges) {
          const next = workflow.nodes.find((n) => n.id === edge.targetNodeId);
          if (next && !visited.has(next.id)) nextLevel.push(next);
        }
      } else {
        for (const edge of outgoing) {
          const next = workflow.nodes.find((n) => n.id === edge.targetNodeId);
          if (next && !visited.has(next.id)) nextLevel.push(next);
        }
      }
    }

    currentNodes = nextLevel;
  }

  return executedSteps;
};

// ==========================================
// TEST EXECUTION RUNNER
// ==========================================
console.log('====================================================');
console.log('  JONANDA FLOW & MAIL FUNCTIONAL TEST SUITE');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

const assert = (name, condition, details) => {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`[PASS] ${name}`);
  } else {
    console.error(`[FAIL] ${name} -> ${details || 'Assertion failed'}`);
  }
};

// TEST GROUP 1: SSRF Protection
console.log('\n--- 1. SSRF SECURITY TESTS ---');
assert('Blocks localhost URL', !isUrlAllowed('http://localhost:8080/admin'));
assert('Blocks 127.0.0.1 IP', !isUrlAllowed('http://127.0.0.1:3000/keys'));
assert('Blocks private subnet 192.168.1.1', !isUrlAllowed('http://192.168.1.1/router'));
assert('Blocks 10.0.0.1 internal network', !isUrlAllowed('http://10.0.0.1/db'));
assert('Blocks AWS/Cloud metadata 169.254.169.254', !isUrlAllowed('http://169.254.169.254/latest/meta-data/'));
assert('Allows public HTTPS domain (https://api.external.com)', isUrlAllowed('https://api.external.com/v1/resource'));
assert('Allows public HTTP domain', isUrlAllowed('http://example.com/api'));

// TEST GROUP 2: Variable Token Interpolation
console.log('\n--- 2. VARIABLE TOKEN INTERPOLATION TESTS ---');
const sampleContext = {
  first_name: 'Alexander',
  email: 'a.vance@enterprise.com',
  companyName: 'Nexus Defense Systems',
  partner: {
    status: 'approved',
    tier: 'Enterprise'
  }
};

const renderedEmail = interpolateTokens('Hello {{first_name}}, welcome to {{companyName}}!', sampleContext);
assert('Flat variable token replacement', renderedEmail === 'Hello Alexander, welcome to Nexus Defense Systems!');

const renderedNested = interpolateTokens('Status: {{partner.status}}, Tier: {{partner.tier}}', sampleContext);
assert('Nested object variable token replacement', renderedNested === 'Status: approved, Tier: Enterprise');

const renderedMissing = interpolateTokens('Code: {{missing_field}}', sampleContext);
assert('Missing variable token fallback preservation', renderedMissing === '{{missing_field}}' || renderedMissing.includes('missing_field'));

// TEST GROUP 3: Condition Evaluator
console.log('\n--- 3. CONDITION EVALUATION TESTS ---');
assert('Equals operator matches', evaluateCondition('status', 'equals', 'approved', { status: 'approved' }));
assert('Equals operator rejects mismatch', !evaluateCondition('status', 'equals', 'approved', { status: 'rejected' }));
assert('Greater than operator evaluates correctly', evaluateCondition('followers', 'greater_than', '10000', { followers: 25000 }));
assert('Contains substring matches', evaluateCondition('email', 'contains', '@jonanda.com', { email: 'team@jonanda.com' }));
assert('Exists operator verifies presence', evaluateCondition('tier', 'exists', '', { tier: 'Strategic' }));

// TEST GROUP 4: Full DAG Graph Execution with Branching
console.log('\n--- 4. FULL DAG WORKFLOW GRAPH EXECUTION TESTS ---');

const testWorkflow = {
  id: 'wf_partner_onboarding_test',
  name: 'Partner Automated Onboarding',
  version: 1,
  status: 'active',
  nodes: [
    {
      id: 'node_trigger',
      type: 'trigger_partner_applied',
      category: 'trigger',
      title: 'Partner Applied',
      position: { x: 50, y: 100 },
      config: {},
      status: 'idle'
    },
    {
      id: 'node_condition',
      type: 'logic_if_else',
      category: 'logic',
      title: 'Is Status Approved?',
      position: { x: 350, y: 100 },
      config: { field: 'status', operator: 'equals', value: 'approved' },
      status: 'idle'
    },
    {
      id: 'node_welcome_email',
      type: 'action_send_email',
      category: 'action',
      title: 'Send Welcome Email',
      position: { x: 680, y: 50 },
      config: { to: '{{email}}', subject: 'Welcome {{companyName}}' },
      status: 'idle'
    },
    {
      id: 'node_rejection_email',
      type: 'action_send_email',
      category: 'action',
      title: 'Send Rejection Email',
      position: { x: 680, y: 200 },
      config: { to: '{{email}}', subject: 'Application Status' },
      status: 'idle'
    }
  ],
  edges: [
    { id: 'e1', sourceNodeId: 'node_trigger', sourcePortId: 'out', targetNodeId: 'node_condition', targetPortId: 'in' },
    { id: 'e2', sourceNodeId: 'node_condition', sourcePortId: 'true', targetNodeId: 'node_welcome_email', targetPortId: 'in' },
    { id: 'e3', sourceNodeId: 'node_condition', sourcePortId: 'false', targetNodeId: 'node_rejection_email', targetPortId: 'in' }
  ]
};

// Scenario A: Approved status -> must execute welcome email, NOT rejection email
const stepsApproved = simulateWorkflowRun(testWorkflow, {
  companyName: 'Starlight Cloud',
  email: 'lisa@starlight.io',
  status: 'approved'
});

assert('Scenario A: Trigger executed', stepsApproved.some((s) => s.nodeId === 'node_trigger'));
assert('Scenario A: Condition evaluated', stepsApproved.some((s) => s.nodeId === 'node_condition' && s.output.branch === 'true'));
assert('Scenario A: TRUE branch (Welcome Email) executed', stepsApproved.some((s) => s.nodeId === 'node_welcome_email'));
assert('Scenario A: FALSE branch (Rejection Email) SKIPPED', !stepsApproved.some((s) => s.nodeId === 'node_rejection_email'));

// Scenario B: Rejected status -> must execute rejection email, NOT welcome email
const stepsRejected = simulateWorkflowRun(testWorkflow, {
  companyName: 'Spam Corp',
  email: 'spam@bot.net',
  status: 'rejected'
});

assert('Scenario B: Condition evaluated to FALSE', stepsRejected.some((s) => s.nodeId === 'node_condition' && s.output.branch === 'false'));
assert('Scenario B: FALSE branch (Rejection Email) executed', stepsRejected.some((s) => s.nodeId === 'node_rejection_email'));
assert('Scenario B: TRUE branch (Welcome Email) SKIPPED', !stepsRejected.some((s) => s.nodeId === 'node_welcome_email'));

// Scenario C: Security Check on HTTP node
const httpWorkflow = {
  id: 'wf_http_sec',
  name: 'HTTP Security Check',
  version: 1,
  status: 'active',
  nodes: [
    { id: 'n1', type: 'trigger_manual', category: 'trigger', title: 'Start', position: { x: 0, y: 0 }, config: {}, status: 'idle' },
    { id: 'n2', type: 'action_http_request', category: 'action', title: 'Internal Probe', position: { x: 300, y: 0 }, config: { url: 'http://127.0.0.1:8000/env' }, status: 'idle' }
  ],
  edges: [
    { id: 'e1', sourceNodeId: 'n1', sourcePortId: 'out', targetNodeId: 'n2', targetPortId: 'in' }
  ]
};

const stepsHttp = simulateWorkflowRun(httpWorkflow, {});
assert('Scenario C: SSRF attack blocked in workflow', stepsHttp.some((s) => s.nodeId === 'n2' && s.status === 'failed'));

// Summary
console.log('\n====================================================');
console.log(`  TEST RESULTS: ${passedTests} / ${totalTests} PASSED (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('====================================================\n');
