const REDIRECT_INTENT_KEY = "auth_redirect_intent";

export const captureRedirectIntent = (searchParams: URLSearchParams) => {
    const redirect = searchParams.get("redirect");
    if (redirect) {
        sessionStorage.setItem(REDIRECT_INTENT_KEY, redirect);
    }
};

export const consumeRedirectIntent = (): string | null => {
    const value = sessionStorage.getItem(REDIRECT_INTENT_KEY);
    if (value) {
        sessionStorage.removeItem(REDIRECT_INTENT_KEY);
    }
    return value;
};

export const resolveRedirectPath = (intent: string | null, portalContext?: string): string => {
    if (portalContext === "marketer") return "/marketing/dashboard";
    return intent === "billing" ? "/dashboard/billing" : "/dashboard";
};
