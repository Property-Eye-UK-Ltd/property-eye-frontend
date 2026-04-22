import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
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

const AdminCaseManagement = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedAgency, setSelectedAgency] = useState<string>("all")

    const filteredCases = mockAgencyCases.filter(
        (c) => {
            const matchesSearch = c.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 c.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesAgency = selectedAgency === "all" || c.agencyName === selectedAgency
            return matchesSearch && matchesAgency
        }
    )

    // Get unique agency names for the filter
    const uniqueAgencies = Array.from(new Set(agenciesData.map((a) => a.name)))

    return (
        <DashboardLayout variant="super-admin">
            {/* Page Header */}
            <DynamicPageHeader title="Case Management" />

            {/* Page Content */}
            <div className="mx-auto w-full max-w-7xl px-6 py-6">
                <DashboardPanel
                    title="Case List"
                    description="Monitor property-related fraud cases on Property Eye System"
                    noPadding
                    hasBorder
                    actions={
                        <div className="flex items-center gap-3">
                            {/* Search bar on the left */}
                            <div className="relative">
                                <SearchNormal
                                    size={18}
                                    variant="Outline"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                    placeholder="Search Case ID or Address"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-64 rounded-full border-border bg-background pl-10 pr-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>

                            {/* Agency Filter on the right of search bar */}
                            <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                                <SelectTrigger className="w-48 rounded-full border-border bg-background px-4 focus:ring-0 focus:ring-offset-0">
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

                            {/* Export Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="rounded-full border-border text-foreground hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0"
                                    >
                                        Export
                                        <ArrowDown2 size={18} variant="Outline" className="ml-2" />
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
            </div>
        </DashboardLayout>
    )
}

export default AdminCaseManagement
