/**
 * Real service layer for Properties, calling the agency-facing backend routes:
 *   GET    /dashboard/listings          -> listListings()
 *   GET    /dashboard/listings/{id}     -> getListing(id)
 *   PATCH  /dashboard/listings/{id}     -> updateListing(id, patch)
 *   DELETE /dashboard/listings/{id}     -> deleteListing(id)
 *   POST   /dashboard/listings/manual   -> ingestManualRecord(record)
 *   POST   /dashboard/listings/upload   -> uploadDocument(file)
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

export const listListings = async (): Promise<PropertyListing[]> => {
    const { data } = await apiClient.get<PaginatedPropertyListingResponse>("/dashboard/listings", {
        params: { page: 1, limit: 100 },
    })
    return data.items
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
