/**
 * Real service layer for Properties, calling the agency-facing backend routes:
 *   GET    /dashboard/listings          -> listListings()
 *   GET    /dashboard/listings/{id}     -> getListing(id)
 *   PATCH  /dashboard/listings/{id}     -> updateListing(id, patch)
 *   DELETE /dashboard/listings/{id}     -> deleteListing(id)
 *   POST   /dashboard/listings/manual   -> ingestManualRecord(record)
 *   POST   /dashboard/listings/upload   -> uploadDocument(file)
 *
 * Admin-facing equivalents (admin acting on behalf of a specific agency):
 *   GET    /admin/listings                          -> getAdminAgencyListings(agencyId)
 *   POST   /admin/agencies/{agencyId}/listings        -> adminIngestManualRecord(agencyId, record)
 *   POST   /admin/agencies/{agencyId}/listings/upload -> adminUploadDocument(agencyId, file)
 */
import { AxiosError } from "axios"
import apiClient from "@/lib/apiClient"
import {
    DocumentUploadError,
    DocumentUploadResult,
    PropertyListing,
    PropertyListingInput,
    PaginatedPropertyListingResponse,
} from "@/types/properties.types"

const toUploadError = (error: unknown): DocumentUploadError => {
    const axiosError = error as AxiosError<{ detail?: string }>
    if (axiosError.response) {
        return {
            kind: "backend",
            detail: axiosError.response.data?.detail ?? "Failed to process this request.",
        }
    }
    return {
        kind: "network",
        detail: "We couldn't reach the server. Check your connection and try again.",
    }
}

export const getAdminAgencyListings = async (
    agencyId: string,
    page: number = 1,
    limit: number = 10
): Promise<PaginatedPropertyListingResponse> => {
    const { data } = await apiClient.get<PaginatedPropertyListingResponse>(
        `/admin/listings`,
        { params: { agency_id: agencyId, page, limit } }
    )
    return data
}

// Admin creates a listing on behalf of a specific agency (e.g. one that's
// just onboarded and hasn't started uploading yet). Reuses the same
// ingest/dedup/scan-trigger logic as ingestManualRecord below.
export const adminIngestManualRecord = async (
    agencyId: string,
    input: PropertyListingInput
): Promise<DocumentUploadResult> => {
    try {
        const { data } = await apiClient.post<DocumentUploadResult>(
            `/admin/agencies/${agencyId}/listings`,
            { record: input }
        )
        return data
    } catch (error) {
        throw toUploadError(error)
    }
}

export const listListings = async (
    page: number = 1,
    limit: number = 10,
    search?: string
): Promise<PaginatedPropertyListingResponse> => {
    const { data } = await apiClient.get<PaginatedPropertyListingResponse>("/dashboard/listings", {
        params: { page, limit, search: search || undefined },
    })
    return data
}

export const getListing = async (id: string): Promise<PropertyListing> => {
    const { data } = await apiClient.get<PropertyListing>(`/dashboard/listings/${id}`)
    return data
}

export const ingestManualRecord = async (
    input: PropertyListingInput
): Promise<DocumentUploadResult> => {
    try {
        const { data } = await apiClient.post<DocumentUploadResult>("/dashboard/listings/manual", {
            record: input,
        })
        return data
    } catch (error) {
        throw toUploadError(error)
    }
}

export const updateListing = async (
    id: string,
    patch: Partial<PropertyListingInput>
): Promise<PropertyListing> => {
    try {
        const { data } = await apiClient.patch<PropertyListing>(`/dashboard/listings/${id}`, patch)
        return data
    } catch (error) {
        throw toUploadError(error)
    }
}

export const deleteListing = async (id: string): Promise<void> => {
    await apiClient.delete(`/dashboard/listings/${id}`)
}

export const uploadDocument = async (file: File): Promise<DocumentUploadResult> => {
    try {
        const formData = new FormData()
        formData.append("file", file)
        const { data } = await apiClient.post<DocumentUploadResult>("/dashboard/listings/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        return data
    } catch (error) {
        throw toUploadError(error)
    }
}

// Admin bulk-uploads a CSV/PDF of listings on behalf of a specific agency.
// Reuses the same AI-extraction/dedup/scan-trigger logic as uploadDocument above.
export const adminUploadDocument = async (agencyId: string, file: File): Promise<DocumentUploadResult> => {
    try {
        const formData = new FormData()
        formData.append("file", file)
        const { data } = await apiClient.post<DocumentUploadResult>(
            `/admin/agencies/${agencyId}/listings/upload`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        )
        return data
    } catch (error) {
        throw toUploadError(error)
    }
}
