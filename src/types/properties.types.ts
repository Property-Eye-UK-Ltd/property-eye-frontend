// Mirrors backend/src/schemas/document_upload.py.
// PropertyListing.status is a free-text DB column, not a backend enum — the
// only value confirmed written by real ingestion code today is "withdrawn".
// Do not assume a fixed set of values; render whatever string comes back.
export type PropertyStatus = string

export interface PropertyListing {
    id: string
    address: string
    postcode?: string | null
    region?: string | null
    county?: string | null
    property_number?: string | null
    title_number?: string | null
    client_name?: string | null
    vendor_name?: string | null
    status?: PropertyStatus | null
    withdrawn_date?: string | null
    // price/commission are free-text on the backend (Optional[str]), not
    // numeric — the extraction/manual-entry pipeline stores them as-typed.
    price?: string | null
    commission?: string | null
    contract_duration?: string | null
    created_at: string
}

export type PropertyListingInput = Omit<PropertyListing, "id" | "created_at">

// Matches backend PropertyListingUpdate — every field optional, partial update.
export type PropertyListingUpdateInput = Partial<Omit<PropertyListing, "id" | "created_at">>

export interface PaginatedPropertyListingResponse {
    items: PropertyListing[]
    total: number
}

// Matches backend DocumentUploadResponse (src/schemas/document_upload.py).
export interface DocumentUploadResult {
    upload_id: string
    status: "success" | "partial_success" | "failed"
    records_processed: number
    records_skipped: number
    message: string
}

export interface DocumentUploadError {
    kind: "network" | "backend"
    detail: string
}
