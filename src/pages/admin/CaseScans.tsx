import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  SearchNormal,
  CloseCircle,
  Calendar,
  ExportSquare,
} from "iconsax-react";
import CaseScansTable from "@/features/casescans/components/CaseScansTable";
import ScanResultsTable from "@/features/casescans/components/ScanResultsTable";
import RunScanButton from "@/features/casescans/components/RunScanButton";
import type {
  FraudMatch,
  PaginatedFraudMatchResponse,
  VerificationSummary,
} from "@/types/casescans.types";
import type { ScanSession } from "@/types/scan-session.types";
import { getSuspiciousMatches } from "@/features/casescans/api/scanService";
import { useToast } from "@/hooks/use-toast";

const CaseScans = () => {
  const { toast } = useToast();
  const [matches, setMatches] = useState<FraudMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatchIds, setSelectedMatchIds] = useState<Set<string>>(
    new Set()
  );
  const [verificationResult, setVerificationResult] =
    useState<VerificationSummary | null>(null);
  const [scanSession, setScanSession] = useState<ScanSession | null>(null);

  // Filter state
  const [searchInput, setSearchInput] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("all");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all");
  const [detectedDateFrom, setDetectedDateFrom] = useState("");
  const [detectedDateTo, setDetectedDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [totalMatches, setTotalMatches] = useState(0);

  const itemsPerPage = 10;

  // Fetch matches with filters
  const fetchMatches = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getSuspiciousMatches({
        search: searchInput || undefined,
        agency_id: selectedAgency !== "all" ? selectedAgency : undefined,
        risk_level: selectedRiskLevel !== "all" ? selectedRiskLevel : undefined,
        page,
        limit: itemsPerPage,
      });

      setMatches(response.items);
      setTotalMatches(response.total);
      setSelectedMatchIds(new Set());
      setVerificationResult(null);
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
  }, [
    searchInput,
    selectedAgency,
    selectedRiskLevel,
    page,
    toast,
  ]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const handleClearFilters = () => {
    setSearchInput("");
    setSelectedAgency("all");
    setSelectedRiskLevel("all");
    setDetectedDateFrom("");
    setDetectedDateTo("");
    setPage(1);
  };

  const handleScanComplete = (summary: VerificationSummary | ScanSession) => {
    setVerificationResult(summary as VerificationSummary);
    // Store scan session if available (from new backend)
    if ('results' in summary && Array.isArray(summary.results)) {
      setScanSession(summary as unknown as ScanSession);
    }
    // Refresh matches to show updated statuses
    fetchMatches();
  };

  const handleScanStart = () => {
    setVerificationResult(null);
  };

  const handleScanError = (error: string) => {
    console.error("Scan error:", error);
  };

  const totalPages = Math.ceil(totalMatches / itemsPerPage);

  return (
    <DashboardLayout variant="super-admin">
      <DynamicPageHeader title="Case Scans" />

      {/* Filter Panel - Compact 2-row layout */}
      <DashboardPanel className="mb-6">
        <div className="space-y-3">
          {/* Row 1: Search + Filters */}
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

            <Select value={selectedRiskLevel} onValueChange={(val) => {
              setSelectedRiskLevel(val);
              setPage(1);
            }}>
              <SelectTrigger className="h-8 w-fit min-w-[110px] shrink-0 rounded-full border-border bg-background px-3 text-xs">
                <SelectValue placeholder="Risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="CRITICAL">🔴 Critical</SelectItem>
                <SelectItem value="HIGH">🟠 High</SelectItem>
                <SelectItem value="MEDIUM">🟡 Medium</SelectItem>
                <SelectItem value="LOW">⚫ Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedAgency} onValueChange={(val) => {
              setSelectedAgency(val);
              setPage(1);
            }}>
              <SelectTrigger className="h-8 w-fit min-w-[110px] shrink-0 rounded-full border-border bg-background px-3 text-xs">
                <SelectValue placeholder="Agency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agencies</SelectItem>
              </SelectContent>
            </Select>

            {/* Icon Buttons */}
            {(searchInput ||
              selectedAgency !== "all" ||
              selectedRiskLevel !== "all" ||
              detectedDateFrom ||
              detectedDateTo) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-8 w-8 p-0 shrink-0"
                title="Clear filters"
              >
                <CloseCircle size={16} variant="Linear" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 shrink-0"
              title="Export results"
            >
              <ExportSquare size={16} variant="Linear" />
            </Button>
          </div>

          {/* Row 2: Date Range + Count + Action Button */}
          <div className="flex gap-2 items-center justify-between">
            <div className="flex items-center gap-2 min-w-fit">
              <Calendar size={16} variant="Linear" className="text-muted-foreground" />
              <input
                type="date"
                value={detectedDateFrom}
                onChange={(e) => {
                  setDetectedDateFrom(e.target.value);
                  setPage(1);
                }}
                className="h-8 px-2 text-xs rounded border border-border bg-background"
                title="From date"
              />
              <span className="text-xs text-muted-foreground">–</span>
              <input
                type="date"
                value={detectedDateTo}
                onChange={(e) => {
                  setDetectedDateTo(e.target.value);
                  setPage(1);
                }}
                className="h-8 px-2 text-xs rounded border border-border bg-background"
                title="To date"
              />
            </div>

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
      {verificationResult && (
        <DashboardPanel className="mb-6 bg-blue-50/50 border-blue-100">
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Verification Summary</h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <p className="text-xs text-muted-foreground">Total Verified</p>
                <p className="text-lg font-bold text-blue-600">
                  {verificationResult.total_verified || verificationResult.total_count}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-red-100">
                <p className="text-xs text-muted-foreground">Confirmed Fraud</p>
                <p className="text-lg font-bold text-red-600">
                  {verificationResult.confirmed_fraud_count}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-100">
                <p className="text-xs text-muted-foreground">Ruled Out</p>
                <p className="text-lg font-bold text-green-600">
                  {verificationResult.not_fraud_count}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-amber-100">
                <p className="text-xs text-muted-foreground">Errors</p>
                <p className="text-lg font-bold text-amber-600">
                  {verificationResult.error_count}
                </p>
              </div>
            </div>
          </div>
        </DashboardPanel>
      )}

      {/* Scan Results Table (if new backend returns session with results) */}
      {scanSession && scanSession.results && (
        <DashboardPanel className="mb-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold">Scan Session Results</p>
              <p className="text-xs text-muted-foreground">
                Session ID: {scanSession.id} • Scanned on {new Date(scanSession.started_at).toLocaleDateString()}
              </p>
            </div>
            <ScanResultsTable results={scanSession.results as any} />
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
    </DashboardLayout>
  );
};

export default CaseScans;
