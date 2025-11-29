export interface PaymentHistory {
    id: string
    invoiceNumber: string
    paymentType: string
    billingDate: string
    amount: string
    status: "Successful" | "Failed"
}

export const paymentHistory: PaymentHistory[] = [
    {
        id: "1",
        invoiceNumber: "#7392013",
        paymentType: "Enterprise Plan",
        billingDate: "3 November, 2025",
        amount: "£232.00",
        status: "Successful",
    },
    {
        id: "2",
        invoiceNumber: "#7392013",
        paymentType: "Pro Plan",
        billingDate: "21 October, 2025",
        amount: "£232.00",
        status: "Failed",
    },
    {
        id: "3",
        invoiceNumber: "#7392013",
        paymentType: "Property Check",
        billingDate: "21 October, 2025",
        amount: "£232.00",
        status: "Failed",
    },
    {
        id: "4",
        invoiceNumber: "#7392013",
        paymentType: "Pro Plan",
        billingDate: "21 October, 2025",
        amount: "£232.00",
        status: "Successful",
    },
    {
        id: "5",
        invoiceNumber: "#7392013",
        paymentType: "Premium Plan",
        billingDate: "30 September, 2025",
        amount: "£232.00",
        status: "Successful",
    },
    {
        id: "6",
        invoiceNumber: "#7392013",
        paymentType: "Property Check",
        billingDate: "24 September, 2025",
        amount: "£232.00",
        status: "Failed",
    },
    {
        id: "7",
        invoiceNumber: "#7392013",
        paymentType: "Basic Plan",
        billingDate: "24 September, 2025",
        amount: "£232.00",
        status: "Successful",
    },
]

export interface CurrentPlan {
    name: string
    price: number
    billingCycle: "Monthly" | "Yearly"
    nextBillingDate: string
    checksUsed: number
    checksTotal: number
    crmUsersUsed: number
    crmUsersTotal: number
}

export const currentPlan: CurrentPlan = {
    name: "Pro Plan",
    price: 900,
    billingCycle: "Monthly",
    nextBillingDate: "Nov 29, 2025",
    checksUsed: 230,
    checksTotal: 750,
    crmUsersUsed: 3,
    crmUsersTotal: 5,
}
