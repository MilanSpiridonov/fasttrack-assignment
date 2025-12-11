import express, { Request, Response } from 'express';
import cors from 'cors';
import { overviewData, strategyInsights, executionInsights } from './data.js';
import type { InsightDetail, InsightsResponse, SectionOverview } from './types.js';

const app = express();
const PORT = 4000;

function mapSectionToSectionData(section: SectionOverview) {
  return {
    id: section.sectionId,
    sectionTitle: section.sectionTitle,
    description: section.description ?? 'No description provided.',
    insights: section.insights.map((insight) => ({
      id: insight.id,
      title: insight.title,
      description: insight.description ?? insight.title,
    })),
    mainScore: section.mainScore,
    status: section.status,
    benchmarkScore: section.benchmarkScore,
    comparison: {
      label: section.comparison.label,
      delta: section.comparison.value,
      unit: section.comparison.unit,
      isPositive: section.comparison.value >= 0,
    },
    trend: section.trend ?? [],
    stats: section.stats,
  };
}

function mapInsightDetailToInsightData(insight: InsightDetail, sectionTitle: string) {
  const gapColor = insight.meta.gap >= 0 ? 'text-emerald-600' : 'text-red-600';

  return {
    id: insight.id,
    sectionId: insight.sectionId,
    sectionTitle,
    title: insight.headline,
    description: insight.summary,
    details: insight.summary,
    // expose raw visual elements so the frontend can render charts from the blocks/main visual
    blocks: insight.blocks,
    mainVisual: insight.mainVisual,
    meta: insight.meta,
    metrics: [
      { label: 'Section Score', value: `${insight.meta.sectionScore}%`, icon: 'chart' },
      { label: 'Benchmark', value: `${insight.meta.benchmarkScore}%`, icon: 'chart' },
      { label: 'Gap vs Benchmark', value: `${insight.meta.gap} pts`, icon: 'trend', color: gapColor },
    ],
    recommendations: [
      {
        id: 1,
        text: 'Run a focused workshop with accountable owners to close the top gaps this quarter.',
      },
      {
        id: 2,
        text: 'Set a 30-day experiment with clear milestones to validate the fastest improvement lever.',
      },
    ],
  };
}

// Enable CORS for http://localhost:3000
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());

// GET /overview - Returns the full OverviewResponse object
app.get('/api/v1/overview', (_req: Request, res: Response) => {
  res.status(200).json(overviewData);
});

// GET /overview/:sectionId - Returns a specific section from OverviewResponse
app.get('/api/v1/overview/:sectionId', (req: Request, res: Response) => {
  const { sectionId } = req.params;
  const section = overviewData.sections.find((s) => s.sectionId === sectionId);

  if (!section) {
    res.status(400).json({ error: 'Section not found' });
    return;
  }

  res.status(200).json(mapSectionToSectionData(section));
});

// GET /insights - Returns insights for a given sectionId
app.get('/api/v1/insights', (req: Request, res: Response) => {
  const sectionId = (req.query.sectionId as string) || 'strategy-in-action';

  let response: InsightsResponse | null = null;

  if (sectionId === 'strategy-in-action') {
    response = strategyInsights;
  } else if (sectionId === 'execution-habits') {
    response = executionInsights;
  }

  if (!response) {
    // Default to strategy-in-action for unknown section IDs
    response = strategyInsights;
  }

  res.status(200).json(response);
});

// GET /sections/:sectionId/insights - Returns all insights for a section
app.get('/api/v1/sections/:sectionId/insights', (req: Request, res: Response) => {
  const { sectionId } = req.params;

  const source = sectionId === 'strategy-in-action'
    ? strategyInsights
    : sectionId === 'execution-habits'
      ? executionInsights
      : null;

  if (!source) {
    res.status(404).json({ error: 'Section not found' });
    return;
  }

  const sectionTitle =
    overviewData.sections.find((s) => s.sectionId === sectionId)?.sectionTitle || sectionId;

  const payload = source.insights.map((insight) => mapInsightDetailToInsightData(insight, sectionTitle));

  res.status(200).json(payload);
});

// GET /sections/:sectionId/insights/:insightId - Returns a single insight for a section
app.get('/api/v1/sections/:sectionId/insights/:insightId', (req: Request, res: Response) => {
  const { sectionId, insightId } = req.params;

  const source = sectionId === 'strategy-in-action'
    ? strategyInsights
    : sectionId === 'execution-habits'
      ? executionInsights
      : null;

  if (!source) {
    res.status(404).json({ error: 'Section not found' });
    return;
  }

  const insight = source.insights.find((i) => i.id === insightId);
  if (!insight) {
    res.status(404).json({ error: 'Insight not found' });
    return;
  }

  const sectionTitle =
    overviewData.sections.find((s) => s.sectionId === sectionId)?.sectionTitle || sectionId;

  // Map backend insight shape to the frontend InsightData contract
  res.status(200).json(mapInsightDetailToInsightData(insight, sectionTitle));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
