// WARNING: "billing" removed from agency_owner's allowed tabs while
// subscriptions are disconnected from the critical path — see
// backend/src/api/deps.py has_active_subscription().
export const AGENCY_TAB_ACCESS: Record<string, string[]> = {
    agency_owner: ["overview", "cases", "properties", "team", "settings", "help"],
    agency_staff: ["overview", "cases", "properties", "settings", "help"],
    agency_viewer: ["overview", "cases", "properties", "settings", "help"],
}
