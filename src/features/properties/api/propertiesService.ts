/**
 * Mock service layer for Properties. Function signatures and return/error shapes
 * mirror the real backend contract exactly:
 *   POST /api/v1/documents/upload   -> uploadDocument(file)
 *   POST /api/v1/documents/ingest   -> ingestManualRecord(record)
 *   GET  /api/v1/documents/listings -> listListings()
 *   PATCH /api/v1/documents/listings/{id} -> updateListing(id, patch)
 *   DELETE /api/v1/documents/listings/{id} -> deleteListing(id)
 *
 * This is the single file to replace with real fetch/axios calls when live API
 * wiring is greenlit for the app — no component or modal changes required.
 */
import { mockListings } from "@/data/properties-data"
import apiClient from "@/lib/apiClient"
import {
    DocumentUploadError,
    DocumentUploadResult,
    PropertyListing,
    PropertyListingInput,
    PaginatedPropertyListingResponse,
} from "@/types/properties.types"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

let nextId = mockListings.length + 1

export const getAdminAgencyListings = async (
    agencyId: string,
    page: number = 1,
    limit: number = 10
): Promise<PaginatedPropertyListingResponse> => {
    try {
        const { data } = await apiClient.get<PaginatedPropertyListingResponse>(
            `/admin/listings`,
            {
                params: {
                    agency_id: agencyId,
                    page,
                    limit,
                },
            }
        )
        return data
    } catch (e) {
        console.warn("API call failed, falling back to mock data:", e)
        await delay(500)
        const startIndex = (page - 1) * limit
        const items = mockListings.slice(startIndex, startIndex + limit)
        return {
            items,
            total: mockListings.length,
        }
    }
}


export const listListings = async (): Promise<PropertyListing[]> => {
    await delay(600)
    return [...mockListings]
}

export const ingestManualRecord = async (
    input: PropertyListingInput
): Promise<DocumentUploadResult> => {
    await delay(900)

    if (!input.address) {
        const error: DocumentUploadError = {
            kind: "backend",
            detail: "Address is required",
        }
        throw error
    }

    const newListing: PropertyListing = {
        ...input,
        id: String(nextId++),
        created_at: new Date().toISOString(),
    }
    mockListings.push(newListing)

    return {
        upload_id: `manual-${newListing.id}`,
        status: "success",
        records_processed: 1,
        records_skipped: 0,
        message: "Property added",
    }
}

export const updateListing = async (
    id: string,
    patch: Partial<PropertyListingInput>
): Promise<PropertyListing> => {
    await delay(800)
    const index = mockListings.findIndex((listing) => listing.id === id)
    if (index === -1) {
        const error: DocumentUploadError = {
            kind: "backend",
            detail: "Listing not found",
        }
        throw error
    }
    mockListings[index] = { ...mockListings[index], ...patch }
    return mockListings[index]
}

export const deleteListing = async (id: string): Promise<void> => {
    await delay(700)
    const index = mockListings.findIndex((listing) => listing.id === id)
    if (index === -1) return
    mockListings.splice(index, 1)
}

/**
 * Simulates the backend's synchronous CSV/PDF extraction. Branches deterministically
 * on filename so every edge case from the plan is demoable without a live backend:
 *  - filename contains "empty"    -> zero extractable rows
 *  - filename contains "partial"  -> partial success (some records skipped)
 *  - filename contains "network"  -> simulated network failure
 *  - filename contains "reject"   -> simulated structured backend rejection (e.g. image-only PDF)
 *  - anything else                -> full success
 */
export const uploadDocument = async (file: File): Promise<DocumentUploadResult> => {
    await delay(1200 + Math.random() * 800)

    const name = file.name.toLowerCase()

    if (name.includes("network")) {
        const error: DocumentUploadError = {
            kind: "network",
            detail: "We couldn't reach the server. Check your connection and try again.",
        }
        throw error
    }

    if (name.includes("reject")) {
        const error: DocumentUploadError = {
            kind: "backend",
            detail: "Failed to process document: the file appears to be an image-only PDF with no extractable text.",
        }
        throw error
    }

    if (name.includes("empty")) {
        return {
            upload_id: `upload-${Date.now()}`,
            status: "success",
            records_processed: 0,
            records_skipped: 0,
            message: "No extractable records found in this file.",
        }
    }

    if (name.includes("partial")) {
        const processed = 6
        const skipped = 3
        for (let i = 0; i < processed; i++) {
            mockListings.push({
                id: String(nextId++),
                address: `${i + 100} Sample Street, Uploaded Batch`,
                status: "withdrawn",
                created_at: new Date().toISOString(),
            })
        }
        return {
            upload_id: `upload-${Date.now()}`,
            status: "success",
            records_processed: processed,
            records_skipped: skipped,
            message: "Upload processed with some rows skipped.",
        }
    }

    const processed = 5
    for (let i = 0; i < processed; i++) {
        mockListings.push({
            id: String(nextId++),
            address: `${i + 200} Sample Avenue, Uploaded Batch`,
            status: "withdrawn",
            created_at: new Date().toISOString(),
        })
    }
    return {
        upload_id: `upload-${Date.now()}`,
        status: "success",
        records_processed: processed,
        records_skipped: 0,
        message: "Upload processed successfully.",
    }
}
