// Mirrors backend/src/schemas/dashboard.py settings response/request shapes
// (routes: GET/PATCH /dashboard/settings/notifications, GET /dashboard/settings/integration,
// POST /dashboard/settings/integration/connect, DELETE /dashboard/settings/integration/disconnect)
// and backend/src/schemas/agency_onboarding.py AgencyProfileUpdateRequest.

export interface SettingsNotificationsResponse {
    email_enabled: boolean;
    sms_enabled: boolean;
    push_enabled: boolean;
}

export interface SettingsNotificationsUpdateRequest {
    email_enabled?: boolean;
    sms_enabled?: boolean;
    push_enabled?: boolean;
}

export interface SettingsIntegrationResponse {
    integration_type: string | null;
    connection_status: string | null;
    last_sync_at: string | null;
    sync_error_message: string | null;
}

export interface GenericActionResponse {
    status: string;
    message: string;
}

// backend/src/schemas/enums.py IntegrationTypeEnum
export type IntegrationType = "crm" | "property" | "accounting";

export interface AgencyProfileUpdateRequest {
    first_name?: string;
    last_name?: string;
    gender?: string;
    address?: string;
    profile_image_url?: string;
    agency_name?: string;
    agency_address?: string;
    agency_logo_url?: string;
}
