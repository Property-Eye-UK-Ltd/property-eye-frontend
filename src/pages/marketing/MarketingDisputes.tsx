import { useState } from "react"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { DisputesTable } from "@/features/marketing/disputes/components/DisputesTable"
import {
    RaiseDisputeModal,
    RaiseDisputeFormValues,
} from "@/features/marketing/disputes/components/RaiseDisputeModal"
import { marketerDisputes, marketerDisputeMetrics, MarketerDispute } from "@/data/marketing-data"

const formatToday = () =>
    new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

const MarketingDisputes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [disputes, setDisputes] = useState<MarketerDispute[]>(marketerDisputes)

    const handleSubmit = (values: RaiseDisputeFormValues) => {
        setIsSubmitting(true)

        const newDispute: MarketerDispute = {
            id: `dsp-${Date.now()}`,
            reference: `#DSP-${Math.floor(1000 + Math.random() * 9000)}`,
            type: values.type,
            linkedRecord: values.linkedRecord,
            description: values.description,
            status: "Open",
            dateRaised: formatToday(),
        }

        setDisputes((prev) => [newDispute, ...prev])
        setIsSubmitting(false)
        setIsModalOpen(false)
        toast.success("Dispute raised — an admin will review it shortly")
    }

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader
                title="Disputes"
                actions={[{ label: "Raise Dispute", onClick: () => setIsModalOpen(true) }]}
            />

            <DashboardPageContent>
                <MetricCards metrics={marketerDisputeMetrics} columns={3} />

                <DisputesTable data={disputes} />
            </DashboardPageContent>

            <RaiseDisputeModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </DashboardLayout>
    )
}

export default MarketingDisputes
