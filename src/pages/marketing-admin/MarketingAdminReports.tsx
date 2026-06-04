import { useState } from "react"
import { toast } from "sonner"
import { DocumentText, ExportSquare } from "iconsax-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Button } from "@/components/ui/button"
import { MarketingAuditLogPanel } from "@/features/marketing-admin/reports/components/MarketingAuditLogPanel"
import { marketingAuditLog } from "@/data/marketing-data"

const tabs = [
    { label: "Reports", value: "reports" },
    { label: "Audit Log", value: "audit", count: marketingAuditLog.length },
]

const exportReports = [
    { title: "Marketer Performance", description: "Agencies referred, fraud value, and commission earned per marketer." },
    { title: "Commission Liability", description: "Full breakdown of earned, approved, and outstanding commission." },
    { title: "Attribution Summary", description: "All locked attributions, pending claims, and conflicts." },
    { title: "Payout Register", description: "Payment history across all marketers for finance reconciliation." },
]

const MarketingAdminReports = () => {
    const [activeTab, setActiveTab] = useState("reports")

    return (
        <DashboardLayout variant="marketing-admin">
            <DynamicPageHeader title="Reports" />

            <DashboardPageContent className="space-y-3 lg:space-y-4">
                <CaseTypeTabs tabs={tabs} selected={activeTab} onSelect={setActiveTab} />

                {activeTab === "reports" && (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
                        {exportReports.map((report) => (
                            <DashboardPanel
                                key={report.title}
                                title={report.title}
                                description={report.description}
                                icon={<DocumentText size={18} variant="Bulk" className="text-muted-foreground" />}
                                hasBorder
                                compactContent
                                actions={
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toast.success(`Exporting ${report.title}…`)}
                                        className="h-8 rounded-full border-border px-3 text-xs lg:h-9 lg:text-sm"
                                    >
                                        <ExportSquare size={16} variant="Outline" className="mr-1.5" />
                                        Export CSV
                                    </Button>
                                }
                            >
                                <></>
                            </DashboardPanel>
                        ))}
                    </div>
                )}

                {activeTab === "audit" && <MarketingAuditLogPanel data={marketingAuditLog} />}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingAdminReports
