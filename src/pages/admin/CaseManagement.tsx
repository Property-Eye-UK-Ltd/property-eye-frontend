import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchNormal, ArrowDown2 } from "iconsax-react"
import { AdminCasesTable } from "@/features/admincases/components/AdminCasesTable"
import {
    AdminCaseStatus,
    CaseDetermination,
    mockAgencyCases,
} from "@/data/agencyCasesData"
import { agenciesData } from "@/data/agenciesData"

const panelBtnClass =
    "h-8 shrink-0 rounded-full border-border px-3 text-xs lg:h-9 lg:px-4 lg:text-sm"

const AdminCaseManagement = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedAgency, setSelectedAgency] = useState<string>("all")
    const [selectedStatus, setSelectedStatus] = useState<string>("all")
    const [selectedSeverity, setSelectedSeverity] = useState<string>("all")
    const [selectedDetermination, setSelectedDetermination] = useState<string>("all")
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")

    const statusOptions: AdminCaseStatus[] = [
        "Open",
        "Under Legal Review",
        "Flagged",
        "Pending Approval",
        "Closed",
    ]
    const severityOptions = ["Critical", "High", "Medium", "Low"] as const
    const determinationOptions: CaseDetermination[] = [
        "Fraudulent (Confirmed)",
        "Not Fraudulent (Cleared)",
    ]

    const parseLooseDate = (value: string) => {
        const t = Date.parse(value)
        return Number.isNaN(t) ? null : t
    }

    const filteredCases = mockAgencyCases.filter((c) => {
        const q = searchQuery.toLowerCase()
        const matchesSearch =
            !q ||
            c.caseId.toLowerCase().includes(q) ||
            c.propertyAddress.toLowerCase().includes(q) ||
            c.buyerName.toLowerCase().includes(q) ||
            (c.agencyName ?? "").toLowerCase().includes(q)
        const matchesAgency = selectedAgency === "all" || c.agencyName === selectedAgency
        const matchesStatus = selectedStatus === "all" || c.adminStatus === selectedStatus
        const matchesSeverity = selectedSeverity === "all" || c.severity === selectedSeverity
        const matchesDetermination =
            selectedDetermination === "all" || c.determination === selectedDetermination

        const saleTs = parseLooseDate(c.saleDate)
        const fromTs = dateFrom ? Date.parse(dateFrom) : null
        const toTs = dateTo ? Date.parse(dateTo) : null
        const matchesDate =
            (!fromTs || (saleTs !== null && saleTs >= fromTs)) &&
            (!toTs || (saleTs !== null && saleTs <= toTs))

        return (
            matchesSearch &&
            matchesAgency &&
            matchesStatus &&
            matchesSeverity &&
            matchesDetermination &&
            matchesDate
        )
    })

    const uniqueAgencies = Array.from(
        new Set([
            ...agenciesData.map((a) => a.name),
            ...mockAgencyCases.map((c) => c.agencyName).filter(Boolean) as string[],
        ])
    )

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader title="Case Management" />

            <DashboardPageContent>
                <DashboardPanel
                    title="Case List"
                    description="Monitor property-related fraud cases on Property Eye System"
                    noPadding
                    hasBorder
                    actions={
                        <div className="flex w-full flex-col gap-2">
                            {/* Row 1 — Search */}
                            <div className="relative w-full">
                                <SearchNormal
                                    size={16}
                                    variant="Outline"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                    placeholder="Search by case ID, agency, address or buyer…"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-9 w-full rounded-full border-border bg-background pl-9 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>

                            {/* Row 2 — Filters + date range + export */}
                            <div className="flex flex-wrap items-center gap-1.5">
                                {/* Case filters */}
                                <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                                    <SelectTrigger className="h-8 w-fit min-w-[120px] shrink-0 rounded-full border-border bg-background px-3 text-xs focus:ring-0 focus:ring-offset-0 lg:h-9 lg:text-sm">
                                        <SelectValue placeholder="Agency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Agencies</SelectItem>
                                        {uniqueAgencies.map((agencyName) => (
                                            <SelectItem key={agencyName} value={agencyName}>
                                                {agencyName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                    <SelectTrigger className="h-8 w-fit min-w-[120px] shrink-0 rounded-full border-border bg-background px-3 text-xs focus:ring-0 focus:ring-offset-0 lg:h-9 lg:text-sm">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        {statusOptions.map((status) => (
                                            <SelectItem key={status} value={status}>{status}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                                    <SelectTrigger className="h-8 w-fit min-w-[120px] shrink-0 rounded-full border-border bg-background px-3 text-xs focus:ring-0 focus:ring-offset-0 lg:h-9 lg:text-sm">
                                        <SelectValue placeholder="Severity" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Severities</SelectItem>
                                        {severityOptions.map((s) => (
                                            <SelectItem key={s} value={s}>{s}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedDetermination} onValueChange={setSelectedDetermination}>
                                    <SelectTrigger className="h-8 w-fit min-w-[140px] shrink-0 rounded-full border-border bg-background px-3 text-xs focus:ring-0 focus:ring-offset-0 lg:h-9 lg:text-sm">
                                        <SelectValue placeholder="Determination" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Determinations</SelectItem>
                                        {determinationOptions.map((d) => (
                                            <SelectItem key={d} value={d}>{d}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Date range */}
                                <div className="flex items-center gap-1 rounded-full border border-border bg-background px-3 h-8 lg:h-9">
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">Sale date</span>
                                    <Input
                                        type="date"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                        className="h-auto w-[7.5rem] border-0 bg-transparent p-0 text-xs focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-sm"
                                        title="Sale date from"
                                    />
                                    <span className="text-xs text-muted-foreground">–</span>
                                    <Input
                                        type="date"
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                        className="h-auto w-[7.5rem] border-0 bg-transparent p-0 text-xs focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-sm"
                                        title="Sale date to"
                                    />
                                </div>

                                {/* Export */}
                                <div className="ml-auto">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className={panelBtnClass}>
                                                Export
                                                <ArrowDown2 size={16} variant="Outline" className="ml-1 lg:ml-2" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuItem className="cursor-pointer">Export as CSV</DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">Export as PDF</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <AdminCasesTable data={filteredCases} />
                </DashboardPanel>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default AdminCaseManagement
