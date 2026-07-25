import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FraudMatch } from "@/types/casescans.types";

interface CaseScansTableProps {
  matches: FraudMatch[];
  loading?: boolean;
  selectedMatchIds: Set<string>;
  onSelectionChange: (matchIds: Set<string>) => void;
}

const riskLevelStyles: Record<string, string> = {
  CRITICAL: "bg-red-50 text-red-600 border border-red-100",
  HIGH: "bg-orange-50 text-orange-600 border border-orange-100",
  MEDIUM: "bg-yellow-50 text-yellow-600 border border-yellow-100",
  LOW: "bg-gray-50 text-gray-600 border border-gray-100",
};

const verificationStatusStyles: Record<string, string> = {
  suspicious: "bg-blue-50 text-blue-600 border border-blue-100",
  confirmed_fraud: "bg-red-50 text-red-600 border border-red-100",
  not_fraud: "bg-green-50 text-green-600 border border-green-100",
  error: "bg-amber-50 text-amber-600 border border-amber-100",
};

const verificationStatusLabel: Record<string, string> = {
  suspicious: "Awaiting Verification",
  confirmed_fraud: "Confirmed Fraud",
  not_fraud: "Ruled Out",
  error: "Verification Error",
};

const CaseScansTable = ({
  matches,
  loading = false,
  selectedMatchIds,
  onSelectionChange,
}: CaseScansTableProps) => {
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = useState<string | null>("detected_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(new Set(matches.map((m) => m.id)));
    } else {
      onSelectionChange(new Set());
    }
  };

  const handleSelectMatch = (matchId: string, checked: boolean) => {
    const newSelection = new Set(selectedMatchIds);
    if (checked) {
      newSelection.add(matchId);
    } else {
      newSelection.delete(matchId);
    }
    onSelectionChange(newSelection);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const allSelected =
    matches.length > 0 && matches.every((m) => selectedMatchIds.has(m.id));
  const someSelected =
    matches.length > 0 &&
    matches.some((m) => selectedMatchIds.has(m.id)) &&
    !allSelected;

  if (loading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading matches...</p>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="w-full h-48 flex items-center justify-center border border-dashed rounded-lg">
        <p className="text-sm text-muted-foreground">
          No suspicious matches found. All properties have been verified or
          there are no pending fraud detections.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="w-10">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort("property_address")}
                className="flex items-center gap-1 hover:text-foreground"
              >
                Property Address
                <ChevronsUpDown size={14} variant="Linear" />
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort("agency_name")}
                className="flex items-center gap-1 hover:text-foreground"
              >
                Agency
                <ChevronsUpDown size={14} variant="Linear" />
              </button>
            </TableHead>
            <TableHead className="text-right">
              <button
                onClick={() => handleSort("confidence_score")}
                className="flex items-center gap-1 ml-auto hover:text-foreground"
              >
                Confidence
                <ChevronsUpDown size={14} variant="Linear" />
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort("risk_level")}
                className="flex items-center gap-1 hover:text-foreground"
              >
                Risk Level
                <ChevronsUpDown size={14} variant="Linear" />
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort("detected_at")}
                className="flex items-center gap-1 hover:text-foreground"
              >
                Detected
                <ChevronsUpDown size={14} variant="Linear" />
              </button>
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match) => (
            <TableRow
              key={match.id}
              className="hover:bg-slate-50/60 cursor-pointer"
              onClick={() => navigate(`/admin/cases/${encodeURIComponent(match.id)}`)}
            >
              <TableCell
                onClick={(e) => e.stopPropagation()}
                className="w-10"
              >
                <Checkbox
                  checked={selectedMatchIds.has(match.id)}
                  onCheckedChange={(checked) =>
                    handleSelectMatch(match.id, checked as boolean)
                  }
                />
              </TableCell>
              <TableCell className="font-medium max-w-xs truncate">
                {match.property_address}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {match.agency_name}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm font-medium">
                    {match.confidence_score}%
                  </span>
                  <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${match.confidence_score}%`,
                      }}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs",
                    riskLevelStyles[match.risk_level] || riskLevelStyles.LOW
                  )}
                >
                  {match.risk_level}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">
                {formatDate(match.detected_at)}
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs",
                    verificationStatusStyles[match.verification_status] ||
                      verificationStatusStyles.suspicious
                  )}
                >
                  {verificationStatusLabel[match.verification_status] ||
                    "Unknown"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CaseScansTable;
