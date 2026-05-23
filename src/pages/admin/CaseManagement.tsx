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
import { mockAgencyCases } from "@/data/agencyCasesData"
import { agenciesData } from "@/data/agenciesData"

const panelBtnClass =
    "h-8 shrink-0 rounded-full border-border px-3 text-xs lg:h-9 lg:px-4 lg:text-sm"

const AdminCaseManagement = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedAgency, setSelectedAgency] = useState<string>("all")

    const filteredCases = mockAgencyCases.filter((c) => {
        const matchesSearch =
            c.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesAgency = selectedAgency === "all" || c.agencyName === selectedAgency
        return matchesSearch && matchesAgency
    })

    const uniqueAgencies = Array.from(new Set(agenciesData.map((a) => a.name)))

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
                        <div className="flex flex-nowrap items-center gap-1.5 lg:gap-2">
                            <div className="relative min-w-[9rem] flex-1 sm:min-w-0 sm:flex-none sm:w-44 lg:w-56">
                                <SearchNormal
                                    size={16}
                                    variant="Outline"
                                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-8 rounded-full border-border bg-background pl-8 text-xs focus-visible:ring-0 focus-visible:ring-offset-0 lg:h-9 lg:pl-10 lg:text-sm"
                                />
                            </div>

                            <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                                <SelectTrigger className="h-8 w-28 shrink-0 rounded-full border-border bg-background px-2 text-xs focus:ring-0 focus:ring-offset-0 lg:h-9 lg:w-40 lg:px-4 lg:text-sm">
                                    <SelectValue placeholder="All Agencies" />
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
                    }
                >
                    <AdminCasesTable data={filteredCases} />
                </DashboardPanel>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default AdminCaseManagement
