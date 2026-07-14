export interface PaymentHistory {
    id: string
    invoiceNumber: string
    paymentType: "Starter" | "Enterprise"
    billingDate: string
    amount: string
    status: "Successful" | "Failed"
}

export const paymentHistory: PaymentHistory[] = [
    {
        id: "1",
        invoiceNumber: "#INV-2025-1103-001",
        paymentType: "Enterprise",
        billingDate: "3 November, 2025",
        amount: "£900.00",
        status: "Successful",
    },
    {
        id: "2",
        invoiceNumber: "#INV-2025-1021-002",
        paymentType: "Starter",
        billingDate: "21 October, 2025",
        amount: "£299.00",
        status: "Failed",
    },
    {
        id: "3",
        invoiceNumber: "#INV-2025-1021-003",
        paymentType: "Enterprise",
        billingDate: "21 October, 2025",
        amount: "£900.00",
        status: "Successful",
    },
    {
        id: "4",
        invoiceNumber: "#INV-2025-0930-004",
        paymentType: "Starter",
        billingDate: "30 September, 2025",
        amount: "£299.00",
        status: "Successful",
    },
    {
        id: "5",
        invoiceNumber: "#INV-2025-0924-005",
        paymentType: "Enterprise",
        billingDate: "24 September, 2025",
        amount: "£900.00",
        status: "Failed",
    },
    {
        id: "6",
        invoiceNumber: "#INV-2025-0924-006",
        paymentType: "Starter",
        billingDate: "24 September, 2025",
        amount: "£299.00",
        status: "Successful",
    },
    {
        id: "7",
        invoiceNumber: "#INV-2025-0815-007",
        paymentType: "Enterprise",
        billingDate: "15 August, 2025",
        amount: "£900.00",
        status: "Successful",
    },
]

export interface CurrentPlan {
    name: "Starter" | "Enterprise"
    price: number
    billingCycle: "Monthly" | "Yearly"
    nextBillingDate: string
    maxUsers: number
}

export const currentPlan: CurrentPlan = {
    name: "Enterprise",
    price: 900,
    billingCycle: "Monthly",
    nextBillingDate: "Nov 29, 2025",
    maxUsers: 10,
}

export const COMMISSION_STANDING_DISCLOSURE =
    "Property Eye retains 50% of any commission recovered on your behalf."
