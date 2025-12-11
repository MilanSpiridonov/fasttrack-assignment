import type {
  OverviewResponse,
  InsightsResponse,
} from './types.js';

export const overviewData: OverviewResponse = {
  sections: [
    {
      sectionId: 'strategy-in-action',
      sectionTitle: 'Strategy in Action',
      description: 'How well the strategy is understood, aligned, and role-modeled across the org.',
      mainScore: 63,
      status: 'Average',
      comparison: {
        label: 'vs. Industry Benchmark',
        value: -8,
        unit: 'percentagePoints',
      },
      benchmarkScore: 63,
      trend: [58, 62, 60, 54, 63],
      stats: {
        lastAnalysis: 'May 2024',
        healthScore: 'B',
        healthScoreColor: 'text-amber-600',
      },
      visual: {
        type: 'segmentedBar',
        min: 0,
        max: 100,
        thresholds: [
          { label: 'Critical', max: 40 },
          { label: 'Average', max: 70 },
          { label: 'Strong', max: 100 },
        ],
      },
      insights: [
        {
          id: 'clarity',
          title: 'Strategic Clarity',
          score: 58,
          status: 'Average',
          description: 'Understanding of strategy across levels and teams.',
        },
        {
          id: 'alignment',
          title: 'Organizational Alignment',
          score: 65,
          status: 'Average',
          description: 'Alignment on goals and cross-team collaboration.',
        },
        {
          id: 'role-modeling',
          title: 'Leadership Role-Modeling',
          score: 72,
          status: 'Strong',
          description: 'Leaders visibly champion and live the strategy.',
        },
      ],
    },
    {
      sectionId: 'execution-habits',
      sectionTitle: 'Execution Habits',
      description: 'The execution muscle: accountability, decision speed, and meeting efficiency.',
      mainScore: 50,
      status: 'Critical',
      comparison: {
        label: 'vs. Industry Benchmark',
        value: -20,
        unit: 'percentagePoints',
      },
      benchmarkScore: 50,
      trend: [50, 48, 42, 45, 50],
      stats: {
        lastAnalysis: 'May 2024',
        healthScore: 'C',
        healthScoreColor: 'text-red-600',
      },
      visual: {
        type: 'gauge',
        min: 0,
        max: 100,
        thresholds: [
          { label: 'Critical', max: 50 },
          { label: 'Average', max: 75 },
          { label: 'Strong', max: 100 },
        ],
      },
      insights: [
        {
          id: 'accountability',
          title: 'Accountability Culture',
          score: 38,
          status: 'Critical',
          description: 'Follow-through and ownership of commitments.',
        },
        {
          id: 'meeting-drag',
          title: 'Meeting Efficiency',
          score: 42,
          status: 'Critical',
          description: 'Time and outcomes from meetings vs focus work.',
        },
        {
          id: 'decision-speed',
          title: 'Decision Speed',
          score: 55,
          status: 'Average',
          description: 'Velocity and clarity of decision-making.',
        },
      ],
    },
  ],
};

export const strategyInsights: InsightsResponse = {
  sectionId: 'strategy-in-action',
  insights: [
    {
      id: 'clarity',
      sectionId: 'strategy-in-action',
      headline: 'Strategic Clarity Needs Improvement',
      summary:
        'Only 58% of employees can articulate the company strategy in their own words. This is below the industry benchmark of 72%.',
      blocks: [
        {
          id: 'clarity-block-1',
          title: 'Communication Gap',
          text: 'Senior leaders communicate strategy quarterly, but middle managers report feeling disconnected from the big picture.',
          miniVisual: {
            type: 'bar',
            series: [
              { label: 'Executives', value: 85 },
              { label: 'Directors', value: 68 },
              { label: 'Managers', value: 52 },
              { label: 'Individual Contributors', value: 41 },
            ],
          },
        },
        {
          id: 'clarity-block-2',
          title: 'Cascade Effectiveness',
          text: 'Strategy cascades lose fidelity as they move through organizational layers.',
          miniVisual: {
            type: 'sparkline',
            points: [85, 72, 58, 45, 41],
            xLabels: ['L1', 'L2', 'L3', 'L4', 'L5'],
          },
        },
      ],
      mainVisual: {
        type: 'bar',
        points: [58, 62, 55, 48, 61],
        xLabels: ['Q1', 'Q2', 'Q3', 'Q4', 'Current'],
      },
      meta: {
        status: 'Average',
        sectionScore: 58,
        benchmarkScore: 72,
        gap: -14,
      },
    },
    {
      id: 'alignment',
      sectionId: 'strategy-in-action',
      headline: 'Organizational Alignment Shows Mixed Results',
      summary:
        'Cross-functional alignment at 65% reflects siloed operations. Teams are aligned within departments but struggle with horizontal collaboration.',
      blocks: [
        {
          id: 'alignment-block-1',
          title: 'Department Silos',
          text: 'Engineering and Product teams show strong internal alignment (82%) but only 48% alignment on shared goals.',
          miniVisual: {
            type: 'bar',
            series: [
              { label: 'Internal', value: 82 },
              { label: 'Cross-team', value: 48 },
            ],
          },
        },
        {
          id: 'alignment-block-2',
          title: 'Goal Overlap',
          text: 'Only 35% of team OKRs have explicit dependencies mapped to other teams.',
          miniVisual: {
            type: 'sparkline',
            points: [28, 32, 35, 33, 35],
            xLabels: ['W1', 'W2', 'W3', 'W4', 'W5'],
          },
        },
      ],
      mainVisual: {
        type: 'sparkline',
        points: [60, 58, 63, 67, 65],
        xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      },
      meta: {
        status: 'Average',
        sectionScore: 65,
        benchmarkScore: 75,
        gap: -10,
      },
    },
    {
      id: 'role-modeling',
      sectionId: 'strategy-in-action',
      headline: 'Leadership Role-Modeling is a Bright Spot',
      summary:
        'At 72%, leadership visibility and role-modeling exceed industry benchmarks. Employees see leaders embodying company values.',
      blocks: [
        {
          id: 'role-modeling-block-1',
          title: 'Visible Leadership',
          text: '78% of employees report seeing senior leaders actively participating in strategic initiatives.',
          miniVisual: {
            type: 'bar',
            series: [
              { label: 'Town Halls', value: 85 },
              { label: 'Team Visits', value: 72 },
              { label: 'Slack Presence', value: 68 },
            ],
          },
        },
        {
          id: 'role-modeling-block-2',
          title: 'Values Alignment',
          text: 'Leaders score highest on "integrity" (88%) and "customer focus" (82%).',
          miniVisual: {
            type: 'bar',
            series: [
              { label: 'Integrity', value: 88 },
              { label: 'Customer Focus', value: 82 },
              { label: 'Innovation', value: 65 },
            ],
          },
        },
      ],
      mainVisual: {
        type: 'bar',
        points: [68, 70, 69, 74, 72],
        xLabels: ['Q1', 'Q2', 'Q3', 'Q4', 'Current'],
      },
      meta: {
        status: 'Strong',
        sectionScore: 72,
        benchmarkScore: 68,
        gap: 4,
      },
    },
  ],
};

export const executionInsights: InsightsResponse = {
  sectionId: 'execution-habits',
  insights: [
    {
      id: 'accountability',
      sectionId: 'execution-habits',
      headline: 'Accountability Culture Requires Urgent Attention',
      summary:
        'At 38%, accountability is critically low. Commitments are frequently missed without consequence, eroding trust across teams.',
      blocks: [
        {
          id: 'accountability-block-1',
          title: 'Commitment Tracking',
          text: 'Only 42% of action items from leadership meetings are completed on time.',
          miniVisual: {
            type: 'bar',
            series: [
              { label: 'On Time', value: 42 },
              { label: 'Late', value: 35 },
              { label: 'Dropped', value: 23 },
            ],
          },
        },
        {
          id: 'accountability-block-2',
          title: 'Follow-through Trend',
          text: 'Follow-through rates have declined 12 points over the past quarter.',
          miniVisual: {
            type: 'sparkline',
            points: [54, 48, 45, 40, 38],
            xLabels: ['W1', 'W2', 'W3', 'W4', 'W5'],
          },
        },
      ],
      mainVisual: {
        type: 'sparkline',
        points: [52, 48, 44, 41, 38],
        xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      },
      meta: {
        status: 'Critical',
        sectionScore: 38,
        benchmarkScore: 65,
        gap: -27,
      },
    },
    {
      id: 'meeting-drag',
      sectionId: 'execution-habits',
      headline: 'Meeting Overhead Slowing Execution',
      summary:
        'Meeting efficiency at 42% indicates excessive time in unproductive meetings. Employees spend an average of 23 hours/week in meetings.',
      blocks: [
        {
          id: 'meeting-drag-block-1',
          title: 'Meeting Load',
          text: 'Senior managers spend 62% of their week in meetings, leaving minimal focus time.',
          miniVisual: {
            type: 'bar',
            series: [
              { label: 'Meetings', value: 62 },
              { label: 'Focus Work', value: 25 },
              { label: 'Admin', value: 13 },
            ],
          },
        },
        {
          id: 'meeting-drag-block-2',
          title: 'Meeting Quality',
          text: 'Only 35% of meetings have clear agendas and outcomes defined.',
          miniVisual: {
            type: 'bar',
            series: [
              { label: 'With Agenda', value: 35 },
              { label: 'With Outcomes', value: 28 },
              { label: 'Neither', value: 45 },
            ],
          },
        },
      ],
      mainVisual: {
        type: 'bar',
        points: [48, 45, 44, 40, 42],
        xLabels: ['Q1', 'Q2', 'Q3', 'Q4', 'Current'],
      },
      meta: {
        status: 'Critical',
        sectionScore: 42,
        benchmarkScore: 60,
        gap: -18,
      },
    },
    {
      id: 'decision-speed',
      sectionId: 'execution-habits',
      headline: 'Decision Speed Shows Room for Improvement',
      summary:
        'Decision-making velocity at 55% is average. Critical decisions take 2.3x longer than industry benchmark due to unclear ownership.',
      blocks: [
        {
          id: 'decision-speed-block-1',
          title: 'Decision Latency',
          text: 'Average time to decision: 14 days for strategic choices vs. benchmark of 6 days.',
          miniVisual: {
            type: 'bar',
            series: [
              { label: 'Your Org', value: 14 },
              { label: 'Benchmark', value: 6 },
            ],
          },
        },
        {
          id: 'decision-speed-block-2',
          title: 'Ownership Clarity',
          text: '48% of employees know who owns key decisions in their area.',
          miniVisual: {
            type: 'sparkline',
            points: [42, 44, 46, 47, 48],
            xLabels: ['W1', 'W2', 'W3', 'W4', 'W5'],
          },
        },
      ],
      mainVisual: {
        type: 'sparkline',
        points: [50, 52, 54, 53, 55],
        xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      },
      meta: {
        status: 'Average',
        sectionScore: 55,
        benchmarkScore: 70,
        gap: -15,
      },
    },
  ],
};
