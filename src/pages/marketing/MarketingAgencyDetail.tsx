import { ReactNode } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
    marketerAgencies,
    marketerAgencyStatusStyles,
    attributionMethodStyles,
    marketerFraudCases,
    marketerFraudStatusStyles,
    commissionEligibilityStyles,
    commissionLines,
    commissionLineStatusStyles,
} from "@/data/marketing-data"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3"
const td = "px-2 py-2 text-xs whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm lg:whitespace-normal"
const badge = "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs"

const TablePanel = ({
    title,
    minWidth = "min-w-[520px]",
    children,
}: {
    title: string
    minWidth?: string
    children: ReactNode
}) => (
    <div className="space-y-3 rounded-2xl border border-border bg-white p-3 shadow-sm sm:p-4 lg:space-y-4 lg:p-6">
        <p className="text-xs text-muted-foreground sm:text-sm">{title}</p>
        <div className="overflow-x-auto rounded-xl border border-border">
            <Table className={cn("text-sm", minWidth)}>{children}</Table>
        </div>
    </div>
)

const OverviewRow = ({ label, children }: { label: string; children: ReactNode }) => (
    <div>
        <p className="mb-1 text-xs text-muted-foreground">{label}</p>
        {children}
    </div>
)

const MarketingAgencyDetail = () => {
    const { agencyId } = useParams<{ agencyId: string }>()
    const navigate = useNavigate()
    const agency = marketerAgencies.find((a) => a.id === agencyId)

    if (!agency) {
        return (
            <DashboardLayout variant="marketer">
                <DynamicPageHeader
                    title="Agency Detail"
                    breadcrumbs={[{ label: "My Agencies", href: "/marketing/agencies" }, { label: "Not found" }]}
                />
                <DashboardPageContent>
                    <p className="text-sm text-muted-foreground">This agency could not be found.</p>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    const relatedFraud = marketerFraudCases.filter((c) => c.agency === agency.name)
    const relatedCommissions = commissionLines.filter((l) => l.agency === agency.name)

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader
                title={agency.name}
                breadcrumbs={[{ label: "My Agencies", href: "/marketing/agencies" }, { label: agency.name }]}
            />

            <DashboardPageContent>
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4">
                    {/* Left column — related activity tables */}
                    <div className="space-y-3 lg:col-span-2 lg:space-y-4">
                        <TablePanel title="Fraud Cases">
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className={th}>Case Ref</TableHead>
                                    <TableHead className={th}>Fraud Value</TableHead>
                                    <TableHead className={th}>Status</TableHead>
                                    <TableHead className={th}>Commission</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {relatedFraud.map((c) => (
                                    <TableRow key={c.id} className="border-t border-border/70">
                                        <TableCell className={cn(td, "font-medium text-foreground")}>{c.caseRef}</TableCell>
                                        <TableCell className={td}>{c.fraudValue}</TableCell>
                                        <TableCell className={td}>
                                            <span className={cn(badge, marketerFraudStatusStyles[c.status])}>
                                                {c.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className={td}>
                                            <span className={cn(badge, commissionEligibilityStyles[c.commissionStatus])}>
                                                {c.commissionStatus}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {relatedFraud.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                            No fraud cases for this agency yet.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </TablePanel>

                        <TablePanel title="Commission Breakdown" minWidth="min-w-[480px]">
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className={th}>Fraud Case</TableHead>
                                    <TableHead className={th}>Rate</TableHead>
                                    <TableHead className={th}>Amount</TableHead>
                                    <TableHead className={th}>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {relatedCommissions.map((line) => (
                                    <TableRow
                                        key={line.id}
                                        onClick={() => navigate(`/marketing/commissions/${line.id}`)}
                                        className="cursor-pointer border-t border-border/70 transition-colors hover:bg-muted/40"
                                    >
                                        <TableCell className={cn(td, "font-medium text-foreground")}>{line.fraudCase}</TableCell>
                                        <TableCell className={td}>{line.commissionPct}</TableCell>
                                        <TableCell className={td}>{line.amount}</TableCell>
                                        <TableCell className={td}>
                                            <span className={cn(badge, commissionLineStatusStyles[line.status])}>
                                                {line.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {relatedCommissions.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                            No commission lines for this agency yet.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </TablePanel>
                    </div>

                    {/* Right column — agency overview (sticky) */}
                    <div className="lg:col-span-1 lg:sticky lg:top-28 lg:self-start">
                        <div className="rounded-2xl border border-border bg-white p-3 shadow-sm sm:p-4 lg:p-6">
                            <p className="mb-3 text-xs text-muted-foreground sm:mb-4">Agency Overview</p>
                            <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                <OverviewRow label="Status">
                                    <span className={cn(badge, marketerAgencyStatusStyles[agency.status])}>
                                        {agency.status}
                                    </span>
                                </OverviewRow>
                                <OverviewRow label="Date Added">
                                    <p className="text-sm text-primary">{agency.dateAdded}</p>
                                </OverviewRow>
                                <OverviewRow label="Attribution Method">
                                    <span className={cn(badge, attributionMethodStyles[agency.attributionMethod])}>
                                        {agency.attributionMethod}
                                    </span>
                                </OverviewRow>
                                <OverviewRow label="Total Fraud Value">
                                    <p className="text-sm text-primary">{agency.totalFraudValue}</p>
                                </OverviewRow>
                                <OverviewRow label="Commission Earned">
                                    <p className="text-sm text-primary">{agency.totalCommission}</p>
                                </OverviewRow>
                                <OverviewRow label="Attribution">
                                    <p className="text-sm text-primary">
                                        {agency.attributed ? "Locked to you" : "Pending — claim submitted"}
                                    </p>
                                </OverviewRow>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingAgencyDetail
