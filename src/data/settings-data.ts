export interface ProfileSettings {
    companyLogo: string
    agencyName: string
    email: string
    phoneNumber: string
    address: string
}

export interface NotificationSettings {
    emailNotifications: boolean
    pushNotifications: boolean
    smsNotifications: boolean
    weeklyReports: boolean
}

export interface IntegrationSettings {
    crmIntegration: string
    apiKey: string
    webhookUrl: string
}

export interface SecuritySettings {
    currentPassword: string
    newPassword: string
    confirmPassword: string
    twoFactorAuth: boolean
}

export interface DataRetentionSettings {
    retentionPeriod: number
    autoDelete: boolean
    backupFrequency: string
}

// Mock data - in real app, this would come from API
export const mockProfileSettings: ProfileSettings = {
    companyLogo: "/placeholder-logo.png",
    agencyName: "Marcus Dan",
    email: "marcusdannn@gmail.com",
    phoneNumber: "+44 207132 4567",
    address: "49 Featherstone Street, LONDON, EC1Y 8SY",
}

export const mockNotificationSettings: NotificationSettings = {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
}

export const mockIntegrationSettings: IntegrationSettings = {
    crmIntegration: "Salesforce",
    apiKey: "sk_live_xxxxxxxxxxxx",
    webhookUrl: "https://api.example.com/webhook",
}

export const mockSecuritySettings: SecuritySettings = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: true,
}

export const mockDataRetentionSettings: DataRetentionSettings = {
    retentionPeriod: 365,
    autoDelete: false,
    backupFrequency: "daily",
}
