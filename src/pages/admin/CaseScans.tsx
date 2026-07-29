import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchNormal, Filter, ExportSquare } from "iconsax-react";
import { exportToCSV, exportToPDF } from "@/lib/exportUtils";
import CaseScansTable from "@/features/casescans/components/CaseScansTable";
import { ScanResultsTable } from "@/features/casescans/components/ScanResultsTable";
import RunScanButton from "@/features/casescans/components/RunScanButton";
import { CaseScansFilterModal } from "@/features/casescans/components/CaseScansFilterModal";
import type {
  FraudMatch,
  PaginatedFraudMatchResponse,
} from "@/types/casescans.types";
import type { ScanSession } from "@/types/scan-session.types";
import {
  getSuspiciousMatches,
  getFraudReportAgencies,
  type FraudReportAgencyOption,
} from "@/features/casescans/api/scanService";
import {
  CaseScansFilters,
  emptyCaseScansFilters,
  countActiveFilters,
} from "@/features/casescans/types/caseScansFilters.types";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const CaseScans = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [matches, setMatches] = useState<FraudMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatchIds, setSelectedMatchIds] = useState<Set<string>>(
    new Set()
  );
  const [scanSession, setScanSession] = useState<ScanSession | null>(null);

  // Filter state
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState<CaseScansFilters>(emptyCaseScansFilters);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [agencyOptions, setAgencyOptions] = useState<FraudReportAgencyOption[]>([]);
  const [page, setPage] = useState(1);
  const [totalMatches, setTotalMatches] = useState(0);

  const itemsPerPage = 10;

  useEffect(() => {
    getFraudReportAgencies()
      .then(setAgencyOptions)
      .catch(() => {
        // Non-fatal — the Agency filter section just won't render if this
        // fails; every other filter still works.
      });
  }, []);

  // Fetch matches with filters
  const fetchMatches = useCallback(async () => {
    setLoading(true);
    try {
      const confidenceMin = filters.confidenceMin ? Number(filters.confidenceMin) : undefined;
      const confidenceMax = filters.confidenceMax ? Number(filters.confidenceMax) : undefined;
      const minSubscriptionRevenue = filters.minSubscriptionRevenue
        ? Number(filters.minSubscriptionRevenue)
        : undefined;

      const response = await getSuspiciousMatches({
        search: searchInput || undefined,
        page,
        page_size: itemsPerPage,
        risk_levels: filters.riskLevels.length > 0 ? filters.riskLevels : undefined,
        verification_statuses:
          filters.verificationStatuses.length > 0 ? filters.verificationStatuses : undefined,
        case_statuses: filters.caseStatuses.length > 0 ? filters.caseStatuses : undefined,
        determinations: filters.determinations.length > 0 ? filters.determinations : undefined,
        recovery_outcomes:
          filters.recoveryOutcomes.length > 0 ? filters.recoveryOutcomes : undefined,
        agency_ids: filters.agencyIds.length > 0 ? filters.agencyIds : undefined,
        detected_from: filters.detectedFrom || undefined,
        detected_to: filters.detectedTo || undefined,
        confidence_min: Number.isFinite(confidenceMin) ? confidenceMin : undefined,
        confidence_max: Number.isFinite(confidenceMax) ? confidenceMax : undefined,
        flag_active: filters.flagActiveOnly || undefined,
        min_subscription_revenue: Number.isFinite(minSubscriptionRevenue)
          ? minSubscriptionRevenue
          : undefined,
      });

      setMatches(response.items);
      setTotalMatches(response.total);
      setSelectedMatchIds(new Set());
    } catch (error) {
      toast({
        title: "Error loading matches",
        description:
          error instanceof Error
            ? error.message
            : "Failed to load fraud matches",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [searchInput, filters, page, toast]);

  // Filters/pagination changing means the user is looking at a different
  // set of matches — clear any previous scan results so they don't linger
  // next to an unrelated list. A post-scan refresh (handleScanComplete)
  // does not go through this effect, so results survive that refresh.
  useEffect(() => {
    setScanSession(null);
    fetchMatches();
  }, [fetchMatches]);

  const handleClearFilters = () => {
    setSearchInput("");
    setFilters(emptyCaseScansFilters);
    setPage(1);
  };

  const handleScanComplete = (session: ScanSession) => {
    setScanSession(session);
    // Refresh matches to show updated statuses
    fetchMatches();
  };

  const handleScanStart = () => {
    setScanSession(null);
  };

  const handleScanError = (error: string) => {
    console.error("Scan error:", error);
  };

  const handleExport = (format: "csv" | "pdf") => {
    if (matches.length === 0) return;

    const dataToExport = matches.map((match: any) => ({
      matchId: match.fraud_match_id || "—",
      caseId: match.case_id || "—",
      agency: match.agency_name || "—",
      timingRisk: match.risk_level || "—",
      detectedDate: match.scanned_at ? new Date(match.scanned_at).toLocaleDateString("en-GB") : "—",
      verificationStatus: match.verification_status || "—",
    }));

    if (format === "csv") {
      exportToCSV(dataToExport, "case_scans_report.csv");
    } else {
      exportToPDF(dataToExport, "Case Scans Report");
    }
  };

  const totalPages = Math.ceil(totalMatches / itemsPerPage);

  return (
    <DashboardLayout variant="super-admin">
      <DynamicPageHeader
        title="Case Scans"
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/case-scans/history")}
            className="text-xs"
          >
            View Scan History
          </Button>
        }
      />

      {/* Filter Panel - single search bar + Filter & Export */}
      <DashboardPanel className="mb-6">
        <div className="space-y-3">
          <div className="flex gap-2 items-center flex-wrap">
            <div className="relative flex-1 min-w-[240px]">
              <SearchNormal
                size={16}
                variant="Linear"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <Input
                placeholder="Search address, vendor..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setPage(1);
                }}
                className="pl-10 h-8 text-xs"
              />
            </div>

            {(searchInput || countActiveFilters(filters) > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-8 shrink-0 text-xs"
              >
                Clear filters
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 shrink-0 rounded-full gap-2 text-xs"
                >
                  <Filter size={16} variant="Linear" />
                  Filter &amp; Export
                  {countActiveFilters(filters) > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {countActiveFilters(filters)}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem
                  className="cursor-pointer text-xs"
                  onClick={() => setIsFilterModalOpen(true)}
                >
                  <Filter size={14} variant="Linear" className="mr-2" />
                  Filters
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => handleExport("csv")}>
                  <ExportSquare size={14} variant="Linear" className="mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => handleExport("pdf")}>
                  <ExportSquare size={14} variant="Linear" className="mr-2" />
                  Export as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex gap-2 items-center justify-end">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground px-3 py-1.5 bg-slate-50/50 rounded-full whitespace-nowrap">
                {selectedMatchIds.size > 0
                  ? `${selectedMatchIds.size}/${totalMatches} selected`
                  : `${totalMatches} matches`}
              </span>

              <RunScanButton
                selectedMatchIds={selectedMatchIds}
                onScanStart={handleScanStart}
                onScanComplete={handleScanComplete}
                onScanError={handleScanError}
              />
            </div>
          </div>
        </div>
      </DashboardPanel>

      {/* Results Summary */}
      {scanSession && (
        <DashboardPanel className="mb-6 bg-blue-50/50 border-blue-100">
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Scan Summary</h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <p className="text-xs text-muted-foreground">Total Scanned</p>
                <p className="text-lg font-bold text-blue-600">
                  {scanSession.total_count}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-red-100">
                <p className="text-xs text-muted-foreground">Confirmed Fraud</p>
                <p className="text-lg font-bold text-red-600">
                  {scanSession.confirmed_fraud_count}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-100">
                <p className="text-xs text-muted-foreground">Ruled Out</p>
                <p className="text-lg font-bold text-green-600">
                  {scanSession.not_fraud_count}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-amber-100">
                <p className="text-xs text-muted-foreground">Errors</p>
                <p className="text-lg font-bold text-amber-600">
                  {scanSession.error_count}
                </p>
              </div>
            </div>
          </div>
        </DashboardPanel>
      )}

      {/* Scan Results Table */}
      {scanSession && scanSession.results && (
        <DashboardPanel className="mb-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold">Scan Session Results</p>
              <p className="text-xs text-muted-foreground">
                Session ID: {scanSession.id} • Scanned on {new Date(scanSession.started_at).toLocaleString()}
              </p>
            </div>
            <ScanResultsTable results={scanSession.results} />
          </div>
        </DashboardPanel>
      )}

      {/* Results Table */}
      <DashboardPanel>
        <div className="space-y-4">
          <CaseScansTable
            matches={matches}
            loading={loading}
            selectedMatchIds={selectedMatchIds}
            onSelectionChange={setSelectedMatchIds}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="h-8 text-xs"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="h-8 text-xs"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </DashboardPanel>

      <CaseScansFilterModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApply={(nextFilters) => {
          setFilters(nextFilters);
          setPage(1);
        }}
        agencyOptions={agencyOptions}
      />
    </DashboardLayout>
  );
};

export default CaseScans;
