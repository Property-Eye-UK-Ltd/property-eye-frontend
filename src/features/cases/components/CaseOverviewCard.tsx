import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CaseRecord } from "./CaseListPanel"

export interface ExtendedCaseData extends CaseRecord {
  recoveryMode?: string
  status?: string
  commissionAtRisk?: string
  evidenceStatus?: string
}

interface CaseOverviewCardProps {
  caseData: ExtendedCaseData
  severityStyles: Record<CaseRecord["severity"], string>
  fraudTypeStyles: Record<CaseRecord["fraudType"], string>
}

export const CaseOverviewCard = ({
  caseData,
  severityStyles,
  fraudTypeStyles,
}: CaseOverviewCardProps) => {
  return (
    <div className="rounded-2xl bg-white border border-border p-6">
      <h3 className="text-lg font-normal text-foreground mb-4">Case Overview</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Case ID</p>
          <p className="text-sm text-primary">{caseData.caseId}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Property Address</p>
          <p className="text-sm text-primary">{caseData.propertyAddress}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Fraud Type</p>
          <Badge className={cn("rounded-full px-3 py-1 text-xs font-normal", fraudTypeStyles[caseData.fraudType])}>
            {caseData.fraudType}
          </Badge>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Score</p>
          <p className="text-sm text-primary">{caseData.score}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Severity</p>
          <Badge className={cn("rounded-full px-3 py-1 text-xs font-normal", severityStyles[caseData.severity])}>
            {caseData.severity}
          </Badge>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Recovery Mode</p>
          <p className="text-sm text-primary">{caseData.recoveryMode || "N/A"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Detection Date</p>
          <p className="text-sm text-primary">{caseData.dateDetected}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Status</p>
          <p className="text-sm text-primary">{caseData.status || "N/A"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Commission at Risk</p>
          <p className="text-sm text-primary">{caseData.commissionAtRisk || "N/A"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Evidence Status</p>
          <Badge className="rounded-full px-3 py-1 text-xs font-normal bg-green-50 text-green-600 border border-green-100">
            {caseData.evidenceStatus || "N/A"}
          </Badge>
        </div>
      </div>
    </div>
  )
}

