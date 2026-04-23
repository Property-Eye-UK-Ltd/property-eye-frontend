import { Badge } from "@/components/ui/badge"

export interface ExtendedCaseData {
  caseId: string
  propertyAddress: string
  status?: string
}

interface CaseOverviewCardProps {
  caseData: ExtendedCaseData
}

export const CaseOverviewCard = ({
  caseData,
}: CaseOverviewCardProps) => {
  return (
    <div className="rounded-2xl bg-white border border-border p-6 lg:sticky lg:top-4">
      <p className="text-xs text-muted-foreground mb-4">Case Overview</p>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Case ID</p>
          <p className="text-sm text-primary">#{caseData.caseId.replace("#", "")}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Property Address</p>
          <p className="text-sm text-primary break-words whitespace-normal leading-relaxed">
            {caseData.propertyAddress}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Status</p>
          <div className="h-6">
            {caseData.status === "CHECKED" && (
                <Badge className="rounded-full px-3 py-1 text-xs font-medium bg-green-50 text-green-600 border border-green-100">
                    CHECKED
                </Badge>
            )}
            {caseData.status === "PENDING" && (
                <Badge className="rounded-full px-3 py-1 text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100">
                    PENDING
                </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
