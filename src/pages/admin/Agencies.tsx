import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
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

const panelBtnClass =
    "h-8 shrink-0 rounded-full border-border px-3 text-xs lg:h-9 lg:px-4 lg:text-sm"

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
                filters={
                    <PeriodTabs
                        periods={periods}
                        selected={selectedPeriod}
                        onSelect={setSelectedPeriod}
                    />
                }
            />

            <DashboardPageContent className="space-y-3 lg:space-y-4">
                <MetricCards metrics={agenciesMetricsData[selectedPeriod]} columns={3} />

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
                                    onChange={(e) => setSearchQuery(e.target.value)}
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

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className={panelBtnClass}>
                                        Action
                                        <ArrowDown2 size={16} variant="Outline" className="ml-1 lg:ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem className="cursor-pointer">
                                        Force Data Pull
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        Reactivate Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer text-destructive">
                                        Suspend Account
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    }
                >
                    <AgenciesTablePanel data={filteredData} onViewAgency={handleViewAgency} />
                </DashboardPanel>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default Agencies
