import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface ExtendedCaseData {
  caseId: string
  propertyAddress: string
  score: number
  severity: "Critical" | "High" | "Medium" | "Low"
  dateDetected: string
  status?: string
}

interface CaseOverviewCardProps {
  caseData: ExtendedCaseData
  severityStyles: Record<string, string>
}

export const CaseOverviewCard = ({
  caseData,
  severityStyles,
}: CaseOverviewCardProps) => {
  return (
    <div className="rounded-2xl bg-white border border-border p-6 lg:sticky lg:top-4">
      <p className="text-xs text-muted-foreground mb-4">Case Overview</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Case ID</p>
          <p className="text-sm text-primary">{caseData.caseId}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Property Address</p>
          <p className="text-sm text-primary break-words whitespace-normal leading-relaxed">
            {caseData.propertyAddress}
          </p>
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
          <p className="text-xs text-muted-foreground mb-1">Detection Date</p>
          <p className="text-sm text-primary">{caseData.dateDetected}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Status</p>
          <div className="h-6">
            {caseData.status === "CHECKED" && (
                <Badge className="rounded-full px-3 py-1 text-xs font-medium bg-green-50 text-green-600 border border-green-100">
                    CHECKED
                </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
