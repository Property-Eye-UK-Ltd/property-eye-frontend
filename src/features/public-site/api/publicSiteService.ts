import apiClient from "@/lib/apiClient"

export interface ContactRequest {
    name: string
    email: string
    subject: string
    message: string
}

export interface PublicMessageResponse {
    message: string
}

export const submitContact = async (payload: ContactRequest): Promise<PublicMessageResponse> => {
    const { data } = await apiClient.post<PublicMessageResponse>("/public/contact", payload);
    return data;
};
