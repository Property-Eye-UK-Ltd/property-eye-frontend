import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchNormal, Filter, ArrowDown2 } from "iconsax-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AgenciesTablePanel } from "@/features/agencies/components/AgenciesTablePanel"
import { useAdminAgenciesSummary, useAdminAgenciesList } from "@/features/agencies/api/useAgencies"
import { exportToCSV, exportToPDF } from "@/lib/exportUtils"

const periods = ["All Time", "This Month", "Last Week"]

const panelBtnClass =
    "h-8 shrink-0 rounded-full border-border px-3 text-xs lg:h-9 lg:px-4 lg:text-sm"

const PAGE_SIZE = 10

const Agencies = () => {
    const navigate = useNavigate()
    const [selectedPeriod, setSelectedPeriod] = useState(periods[0])
    const [searchQuery, setSearchQuery] = useState("")
    const [page, setPage] = useState(1)
    const [isExportOpen, setIsExportOpen] = useState(false)

    const { data: summary } = useAdminAgenciesSummary()
    const { data: agenciesList } = useAdminAgenciesList({
        page,
        page_size: PAGE_SIZE,
        search: searchQuery || undefined,
    })

    const metrics = [
        {
            title: "Total Agencies",
            value: String(summary?.total_agencies ?? "—"),
            period: selectedPeriod,
            change: "",
            topBarClass: "bg-red-500",
        },
        {
            title: "Total Agency Users",
            value: String(summary?.total_agency_users ?? "—"),
            period: selectedPeriod,
            change: "",
            topBarClass: "bg-orange-500",
        },
        {
            title: "Total Open Cases",
            value: String(summary?.total_open_cases ?? "—"),
            period: "Non-closed cases",
            change: "",
            topBarClass: "bg-purple-500",
        },
    ]

    const handleExport = (format: "pdf" | "csv") => {
        const list = agenciesList?.agencies || [];
        if (list.length === 0) return;

        const dataToExport = list.map((agency: any) => ({
            agencyName: agency.name || "—",
            plan: agency.plan_name || "—",
            users: agency.users ?? 0,
            integration: agency.integration_type || "—",
            fraudDetected: agency.fraud_detected ?? 0
        }));

        if (format === "csv") {
            exportToCSV(dataToExport, "agencies_report.csv");
        } else {
            exportToPDF(dataToExport, "Agencies Performance Report");
        }
    }

    const handleViewAgency = (agencyId: string) => {
        navigate(`/admin/agencies/${agencyId}`)
    }

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader
                title="Agencies"
            />

            <DashboardPageContent className="space-y-3 lg:space-y-4">
                <MetricCards metrics={metrics} columns={3} />

                <DashboardPanel
                    title="Agencies List"
                    description="View and manage all agencies within Property Eye system"
                    noPadding
                    hasBorder
                    actions={
                        <div className="flex flex-nowrap items-center gap-1.5 lg:gap-2">
                            <div className="relative min-w-[9rem] flex-1 sm:min-w-0 sm:flex-none sm:w-44 lg:w-56">
                                <SearchNormal
                                    size={16}
                                    variant="TwoTone"
                                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground lg:left-3"
                                />
                                <Input
                                    type="search"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        setPage(1)
                                    }}
                                    className="h-8 rounded-full border-border bg-background pl-8 text-xs focus-visible:ring-0 focus-visible:ring-offset-0 lg:h-9 lg:pl-10 lg:text-sm"
                                />
                            </div>

                            <Button variant="outline" className={panelBtnClass}>
                                <Filter size={16} variant="Outline" className="mr-1 lg:mr-2" />
                                Filter
                            </Button>

                            <DropdownMenu onOpenChange={setIsExportOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className={panelBtnClass}>
                                        Export
                                        <ArrowDown2
                                            size={16}
                                            variant="Outline"
                                            className={`ml-1 transition-transform duration-200 lg:ml-2 ${isExportOpen ? "rotate-180" : ""}`}
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuItem
                                        onClick={() => handleExport("pdf")}
                                        className="cursor-pointer"
                                    >
                                        Export as PDF
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleExport("csv")}
                                        className="cursor-pointer"
                                    >
                                        Export as CSV
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    }
                >
                    <AgenciesTablePanel
                        data={agenciesList?.agencies ?? []}
                        total={agenciesList?.total ?? 0}
                        page={page}
                        pageSize={PAGE_SIZE}
                        onPageChange={setPage}
                        onViewAgency={handleViewAgency}
                    />
                </DashboardPanel>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default Agencies
