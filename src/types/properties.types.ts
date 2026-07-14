export type PropertyStatus = "withdrawn" | "under_offer" | "sold" | "flagged"

export interface PropertyListing {
    id: string
    address: string
    postcode?: string
    region?: string
    county?: string
    property_number?: string
    title_number?: string
    client_name?: string
    vendor_name?: string
    status: PropertyStatus
    withdrawn_date?: string
    price?: number
    commission?: number
    contract_duration?: string
    created_at: string
}

export type PropertyListingInput = Omit<PropertyListing, "id" | "created_at">

export interface DocumentUploadResult {
    upload_id: string
    status: "success"
    records_processed: number
    records_skipped: number
    message: string
}

export interface DocumentUploadError {
    kind: "network" | "backend"
    detail: string
}
