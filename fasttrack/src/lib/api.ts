import type {
    InsightData,
    SectionData,
} from "./types"
import type { SectionOverview, SectionOverviewArrayResponse } from "./types/diagnostics"

// Base API URL - configure this for your environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"

// ============================================
// API Client Utilities
// ============================================

async function fetchApi<T>(endpoint: string): Promise<T | null> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            next: { revalidate: 60 }, // Cache for 60 seconds
        })

        if (!response.ok) {
            console.error(`API error: ${response.status} ${response.statusText}`)
            return null
        }

        return response.json()
    } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error)
        return null
    }
}

// ============================================
// Diagnostics API
// ============================================

export async function getSections(): Promise<SectionOverview[]> {
    const data = await fetchApi<SectionOverviewArrayResponse>("/overview")
    if (data?.sections === undefined) {
        return []
    }
    return data.sections;
}

export async function getSectionData(sectionId: string): Promise<SectionData | null> {
    console.log(`${API_BASE_URL}/overview/${sectionId}`)
    return fetchApi<SectionData>(`/overview/${sectionId}`)
}

// ============================================
// Insights API
// ============================================

export async function getInsightData(
    sectionId: string,
    insightId: string
): Promise<InsightData | null> {
    return fetchApi<InsightData>(`/sections/${sectionId}/insights/${insightId}`)
}

export async function getSectionInsights(sectionId: string): Promise<InsightData[]> {
    const data = await fetchApi<InsightData[]>(`/sections/${sectionId}/insights`)
    return data ?? []
}
