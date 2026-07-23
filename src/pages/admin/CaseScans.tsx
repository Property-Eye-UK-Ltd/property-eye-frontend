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
import { SearchNormal, CloseCircle } from "iconsax-react";
import CaseScansTable from "@/features/casescans/components/CaseScansTable";
import RunScanButton from "@/features/casescans/components/RunScanButton";
import type {
  FraudMatch,
  PaginatedFraudMatchResponse,
  VerificationSummary,
} from "@/types/casescans.types";
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

  const handleScanComplete = (summary: VerificationSummary) => {
    setVerificationResult(summary);
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

      {/* Filter Panel */}
      <DashboardPanel className="mb-6">
        <div className="space-y-4">
          {/* Row 1: Search + Quick Filters */}
          <div className="flex gap-3 flex-wrap items-center">
            <div className="relative flex-1 min-w-[200px]">
              <SearchNormal
                size={18}
                variant="Linear"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <Input
                placeholder="Search address, vendor, client name..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setPage(1);
                }}
                className="pl-10 h-8 text-xs"
              />
            </div>

            <Select value={selectedAgency} onValueChange={(val) => {
              setSelectedAgency(val);
              setPage(1);
            }}>
              <SelectTrigger className="h-8 w-fit min-w-[120px] shrink-0 rounded-full border-border bg-background px-3 text-xs lg:h-9 lg:px-4 lg:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agencies</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRiskLevel} onValueChange={(val) => {
              setSelectedRiskLevel(val);
              setPage(1);
            }}>
              <SelectTrigger className="h-8 w-fit min-w-[120px] shrink-0 rounded-full border-border bg-background px-3 text-xs lg:h-9 lg:px-4 lg:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Row 2: Date Range */}
          <div className="flex gap-3 flex-wrap items-center">
            <div className="flex items-center gap-2 min-w-fit">
              <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                Detected:
              </label>
              <input
                type="date"
                value={detectedDateFrom}
                onChange={(e) => {
                  setDetectedDateFrom(e.target.value);
                  setPage(1);
                }}
                className="h-8 px-3 text-xs rounded-full border border-border bg-background"
              />
              <span className="text-xs text-muted-foreground">–</span>
              <input
                type="date"
                value={detectedDateTo}
                onChange={(e) => {
                  setDetectedDateTo(e.target.value);
                  setPage(1);
                }}
                className="h-8 px-3 text-xs rounded-full border border-border bg-background"
              />
            </div>
          </div>

          {/* Row 3: Actions */}
          <div className="flex gap-3 items-center justify-between">
            <div className="flex gap-2">
              {(searchInput ||
                selectedAgency !== "all" ||
                selectedRiskLevel !== "all" ||
                detectedDateFrom ||
                detectedDateTo) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="h-8 text-xs"
                >
                  <CloseCircle size={14} variant="Linear" className="mr-1" />
                  Clear Filters
                </Button>
              )}

              <div className="text-xs text-muted-foreground py-2 px-3 bg-slate-50/50 rounded-full">
                {selectedMatchIds.size > 0
                  ? `${selectedMatchIds.size} selected of ${totalMatches}`
                  : `${totalMatches} suspicious matches awaiting verification`}
              </div>
            </div>

            <RunScanButton
              selectedMatchIds={selectedMatchIds}
              onScanStart={handleScanStart}
              onScanComplete={handleScanComplete}
              onScanError={handleScanError}
            />
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
                  {verificationResult.total_verified}
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
