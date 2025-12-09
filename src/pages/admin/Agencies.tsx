import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
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
import { agenciesMetricsData, agenciesData } from "@/data/agenciesData"
import { AgenciesTablePanel } from "@/features/agencies/components/AgenciesTablePanel"

const periods = ["All Time", "This Month", "Last Week"]

const Agencies = () => {
    const navigate = useNavigate()
    const [selectedPeriod, setSelectedPeriod] = useState(periods[0])
    const [searchQuery, setSearchQuery] = useState("")
    const [isExportOpen, setIsExportOpen] = useState(false)

    const handleExport = (format: "pdf" | "csv") => {
        console.log(`Exporting as ${format}`)
    }

    const handleViewAgency = (agencyId: string) => {
        navigate(`/admin/agencies/${agencyId}`)
    }

    const filteredData = agenciesData.filter((agency) =>
        agency.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader
                title="Agencies"
                actions={<PeriodTabs periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
            />

            <div className="mx-auto w-full max-w-7xl space-y-4 px-6 py-6">
                {/* Metric Cards */}
                <MetricCards metrics={agenciesMetricsData[selectedPeriod]} />

                {/* Agencies List Panel */}
                <DashboardPanel
                    title="Agencies List"
                    description="View and manage all agencies within Property Eye system"
                    noPadding
                    hasBorder
                    actions={
                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <div className="relative w-64">
                                <SearchNormal
                                    size={20}
                                    variant="TwoTone"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                    type="search"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-background border-border rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>

                            <Button
                                variant="outline"
                                className="rounded-full border-border text-foreground hover:bg-muted h-10 px-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                            >
                                <Filter size={18} variant="Outline" className="mr-2" />
                                Filter
                            </Button>

                            <DropdownMenu onOpenChange={setIsExportOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="rounded-full border-border text-foreground hover:bg-muted h-10 px-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    >
                                        Export
                                        <ArrowDown2
                                            size={18}
                                            variant="Outline"
                                            className={`ml-2 transition-transform duration-200 ${isExportOpen ? "rotate-180" : ""}`}
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuItem onClick={() => handleExport("pdf")} className="cursor-pointer">
                                        Export as PDF
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleExport("csv")} className="cursor-pointer">
                                        Export as CSV
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="rounded-full border-border text-foreground hover:bg-muted h-10 px-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    >
                                        Action
                                        <ArrowDown2 size={18} variant="Outline" className="ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem className="cursor-pointer">Force Data Pull</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Reactivate Account</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer text-destructive">Suspend Account</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    }
                >
                    <AgenciesTablePanel data={filteredData} onViewAgency={handleViewAgency} />
                </DashboardPanel>
            </div>
        </DashboardLayout>
    )
}

export default Agencies
