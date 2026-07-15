import apiClient from "@/lib/apiClient";
import type {
    SettingsNotificationsResponse,
    SettingsNotificationsUpdateRequest,
    SettingsIntegrationResponse,
    GenericActionResponse,
    IntegrationType,
} from "@/types/settings.types";

export const getNotificationSettings = async (): Promise<SettingsNotificationsResponse> => {
    const { data } = await apiClient.get<SettingsNotificationsResponse>("/dashboard/settings/notifications");
    return data;
};

export const updateNotificationSettings = async (
    payload: SettingsNotificationsUpdateRequest
): Promise<SettingsNotificationsResponse> => {
    const { data } = await apiClient.patch<SettingsNotificationsResponse>(
        "/dashboard/settings/notifications",
        payload
    );
    return data;
};

export const getIntegrationSettings = async (): Promise<SettingsIntegrationResponse> => {
    const { data } = await apiClient.get<SettingsIntegrationResponse>("/dashboard/settings/integration");
    return data;
};

export const connectIntegration = async (
    integrationType: IntegrationType
): Promise<GenericActionResponse> => {
    const { data } = await apiClient.post<GenericActionResponse>(
        "/dashboard/settings/integration/connect",
        undefined,
        { params: { integration_type: integrationType } }
    );
    return data;
};

export const disconnectIntegration = async (): Promise<GenericActionResponse> => {
    const { data } = await apiClient.delete<GenericActionResponse>("/dashboard/settings/integration/disconnect");
    return data;
};
