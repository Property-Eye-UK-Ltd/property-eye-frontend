import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { RegisterExtractData } from "@/types/scan-session.types"
import type { FraudMatch } from "@/types/casescans.types"

interface RegisterInformationPanelProps {
  /**
   * Register extract data (null if not scanned yet)
   */
  registerExtract?: RegisterExtractData | null
  /**
   * Fraud match data for context (optional if using basic verification info)
   */
  fraudMatch?: FraudMatch
  /**
   * Verification status from case data
   */
  verificationStatus?: "confirmed_fraud" | "not_fraud" | "error" | null
  /**
   * When register was fetched
   */
  registerExtractFetchedAt?: string | null
  /**
   * Title number from case
   */
  titleNumber?: string | null
  /**
   * Property address
   */
  propertyAddress?: string
  /**
   * Case ID for reference
   */
  caseId?: string
}

const fieldLabel = "mb-0.5 text-xs text-muted-foreground"
const fieldValue = "text-xs text-primary sm:text-sm"

export const RegisterInformationPanel = ({
  registerExtract,
  fraudMatch,
  verificationStatus,
  registerExtractFetchedAt,
  titleNumber,
  propertyAddress,
  caseId,
}: RegisterInformationPanelProps) => {
  const navigate = useNavigate()
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["proprietors"]))

  const toggleSection = (section: string) => {
    const newOpen = new Set(openSections)
    if (newOpen.has(section)) {
      newOpen.delete(section)
    } else {
      newOpen.add(section)
    }
    setOpenSections(newOpen)
  }

  // Use verification status from props if registerExtract not available
  const isScanned = registerExtract || registerExtractFetchedAt

  // Determine quick reference flags
  const getQuickFlags = () => {
    if (!registerExtract) return []

    const flags: Array<{
      type: "error" | "warning" | "success"
      label: string
      message: string
    }> = []

    // Check for proprietor mismatch
    const hasMismatch = registerExtract.proprietors.some((p) => p.is_mismatch_flag)
    if (hasMismatch) {
      flags.push({
        type: "error",
        label: "Mismatch Alert",
        message: "Owner name differs from agency seller name",
      })
    }

    // Check for charges and restrictions
    const hasChargesOrRestrictions =
      registerExtract.charges.length > 0 || registerExtract.restrictions.length > 0
    if (hasChargesOrRestrictions) {
      flags.push({
        type: "warning",
        label: "Legal Considerations",
        message: `${registerExtract.charges.length} charge(s) and ${registerExtract.restrictions.length} restriction(s) found`,
      })
    }

    // If no issues
    if (flags.length === 0) {
      flags.push({
        type: "success",
        label: "Clear Status",
        message: "No charges or restrictions found",
      })
    }

    return flags
  }

  const quickFlags = getQuickFlags()

  // Not scanned state
  if (!isScanned) {
    return (
      <div className="rounded-2xl border border-border bg-white p-3 shadow-sm sm:p-4 lg:p-6">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground sm:text-sm font-medium">
              Register Information
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4 border border-blue-100">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">Not Yet Scanned</p>
              <p className="mt-1 text-xs text-blue-800">
                This case has not been scanned against the Land Registry. Legal practitioners need
                to review proprietor information and charges to confirm fraud status.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin/case-scans")}
              className="text-xs"
            >
              Request Scan
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/case-scans")}
              className="text-xs"
            >
              View in Case Scans
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Scanned state - show full register data
  return (
    <div className="rounded-2xl border border-border bg-white p-3 shadow-sm sm:p-4 lg:p-6">
      <div className="space-y-6">
        {/* Header with scan info */}
        <div>
          <p className="text-xs text-muted-foreground sm:text-sm font-medium">
            Register Information
          </p>
          {registerExtractFetchedAt && (
            <p className="mt-1 text-xs text-muted-foreground">
              Last Scanned:{" "}
              <span className="text-primary font-medium">
                {new Date(registerExtractFetchedAt).toLocaleDateString("en-GB")}
              </span>
            </p>
          )}
          {verificationStatus && (
            <p className="mt-1 text-xs text-muted-foreground">
              Status:{" "}
              <span className={cn(
                "font-medium",
                verificationStatus === "confirmed_fraud" ? "text-red-600" :
                verificationStatus === "not_fraud" ? "text-green-600" :
                "text-orange-600"
              )}>
                {verificationStatus === "confirmed_fraud" ? "Confirmed Fraud" :
                 verificationStatus === "not_fraud" ? "Ruled Out" :
                 "Error"}
              </span>
            </p>
          )}
        </div>

        {/* Property Details */}
        <div className="border-t border-border pt-4 sm:pt-6">
          <p className={cn(fieldLabel, "mb-3 sm:mb-4 font-medium text-primary")}>
            PROPERTY DETAILS
          </p>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
            <div>
              <p className={fieldLabel}>Address</p>
              <p className={fieldValue}>{propertyAddress || registerExtract?.property_address}</p>
            </div>
            <div>
              <p className={fieldLabel}>Title Number</p>
              <p className={fieldValue}>{titleNumber || registerExtract?.title_number}</p>
            </div>
            {registerExtract?.tenure && (
              <div>
                <p className={fieldLabel}>Tenure</p>
                <p className={fieldValue}>{registerExtract.tenure}</p>
              </div>
            )}
          </div>
        </div>

        {/* Registered Proprietors */}
        {registerExtract && (
        <Collapsible
          open={openSections.has("proprietors")}
          onOpenChange={() => toggleSection("proprietors")}
          className="border-t border-border"
        >
          <CollapsibleTrigger className="pt-4 sm:pt-6 w-full">
            <div className="flex items-center gap-2">
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform text-muted-foreground",
                  openSections.has("proprietors") ? "rotate-0" : "-rotate-90"
                )}
              />
              <p className="text-xs font-medium text-primary sm:text-sm">
                REGISTERED PROPRIETORS ({registerExtract?.proprietors.length || 0})
              </p>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3">
                      Name
                    </TableHead>
                    <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3">
                      Type
                    </TableHead>
                    <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3">
                      Address
                    </TableHead>
                    <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3">
                      Mismatch
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registerExtract.proprietors.map((prop, idx) => (
                    <TableRow key={idx} className="border-b border-border">
                      <TableCell className="px-2 py-2 text-xs text-primary lg:px-4 lg:py-3">
                        {prop.name}
                      </TableCell>
                      <TableCell className="px-2 py-2 text-xs text-muted-foreground lg:px-4 lg:py-3">
                        {prop.type}
                      </TableCell>
                      <TableCell className="px-2 py-2 text-xs text-muted-foreground lg:px-4 lg:py-3">
                        {prop.address}
                      </TableCell>
                      <TableCell className="px-2 py-2 text-xs lg:px-4 lg:py-3">
                        {prop.is_mismatch_flag ? (
                          <Badge className="rounded-full bg-red-50 text-red-600 border border-red-100 text-xs font-medium px-2 py-0.5">
                            Yes
                          </Badge>
                        ) : (
                          <Badge className="rounded-full bg-green-50 text-green-600 border border-green-100 text-xs font-medium px-2 py-0.5">
                            No
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CollapsibleContent>
        </Collapsible>
        )}

        {/* Charges */}
        {registerExtract && (
        <Collapsible
          open={openSections.has("charges")}
          onOpenChange={() => toggleSection("charges")}
          className="border-t border-border"
        >
          <CollapsibleTrigger className="pt-4 sm:pt-6 w-full">
            <div className="flex items-center gap-2">
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform text-muted-foreground",
                  openSections.has("charges") ? "rotate-0" : "-rotate-90"
                )}
              />
              <p className="text-xs font-medium text-primary sm:text-sm">
                CHARGES - MORTGAGES & SECURED DEBTS ({registerExtract.charges.length})
              </p>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            {registerExtract.charges.length === 0 ? (
              <p className="text-xs text-muted-foreground">None found on this property</p>
            ) : (
              <ul className="space-y-2">
                {registerExtract.charges.map((charge, idx) => (
                  <li key={idx} className="text-xs text-primary">
                    <span className="font-medium">Entry #{charge.entry_number}:</span>{" "}
                    {charge.description}
                    {charge.date && (
                      <span className="text-muted-foreground">
                        {" "}
                        ({new Date(charge.date).toLocaleDateString("en-GB")})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </CollapsibleContent>
        </Collapsible>
        )}

        {/* Restrictions */}
        {registerExtract && (
        <Collapsible
          open={openSections.has("restrictions")}
          onOpenChange={() => toggleSection("restrictions")}
          className="border-t border-border"
        >
          <CollapsibleTrigger className="pt-4 sm:pt-6 w-full">
            <div className="flex items-center gap-2">
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform text-muted-foreground",
                  openSections.has("restrictions") ? "rotate-0" : "-rotate-90"
                )}
              />
              <p className="text-xs font-medium text-primary sm:text-sm">
                RESTRICTIONS ({registerExtract.restrictions.length})
              </p>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            {registerExtract.restrictions.length === 0 ? (
              <p className="text-xs text-muted-foreground">None found on this property</p>
            ) : (
              <ul className="space-y-2">
                {registerExtract.restrictions.map((restriction, idx) => (
                  <li key={idx} className="text-xs text-primary">
                    <span className="font-medium">Entry #{restriction.entry_number}:</span>{" "}
                    {restriction.description}
                    {restriction.date && (
                      <span className="text-muted-foreground">
                        {" "}
                        ({new Date(restriction.date).toLocaleDateString("en-GB")})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </CollapsibleContent>
        </Collapsible>
        )}

        {/* Leases */}
        {registerExtract && (
        <Collapsible
          open={openSections.has("leases")}
          onOpenChange={() => toggleSection("leases")}
          className="border-t border-border"
        >
          <CollapsibleTrigger className="pt-4 sm:pt-6 w-full">
            <div className="flex items-center gap-2">
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform text-muted-foreground",
                  openSections.has("leases") ? "rotate-0" : "-rotate-90"
                )}
              />
              <p className="text-xs font-medium text-primary sm:text-sm">
                LEASES ({registerExtract.leases.length})
              </p>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            {registerExtract.leases.length === 0 ? (
              <p className="text-xs text-muted-foreground">None found on this property</p>
            ) : (
              <ul className="space-y-2">
                {registerExtract.leases.map((lease, idx) => (
                  <li key={idx} className="text-xs text-primary">
                    <span className="font-medium">Entry #{lease.entry_number}:</span>{" "}
                    {lease.description}
                    {lease.commencement_date && (
                      <span className="text-muted-foreground">
                        {" "}
                        (from {new Date(lease.commencement_date).toLocaleDateString("en-GB")})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </CollapsibleContent>
        </Collapsible>
        )}

        {/* Notices */}
        {registerExtract && (
        <Collapsible
          open={openSections.has("notices")}
          onOpenChange={() => toggleSection("notices")}
          className="border-t border-border"
        >
          <CollapsibleTrigger className="pt-4 sm:pt-6 w-full">
            <div className="flex items-center gap-2">
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform text-muted-foreground",
                  openSections.has("notices") ? "rotate-0" : "-rotate-90"
                )}
              />
              <p className="text-xs font-medium text-primary sm:text-sm">
                NOTICES ({registerExtract.notices.length})
              </p>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            {registerExtract.notices.length === 0 ? (
              <p className="text-xs text-muted-foreground">None found on this property</p>
            ) : (
              <ul className="space-y-2">
                {registerExtract.notices.map((notice, idx) => (
                  <li key={idx} className="text-xs text-primary">
                    <span className="font-medium">Entry #{notice.entry_number}:</span>{" "}
                    {notice.description}
                    {notice.date && (
                      <span className="text-muted-foreground">
                        {" "}
                        ({new Date(notice.date).toLocaleDateString("en-GB")})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </CollapsibleContent>
        </Collapsible>
        )}

        {/* Quick Reference Flags */}
        {registerExtract && (
        <div className="border-t border-border pt-4 sm:pt-6">
          <p className={cn(fieldLabel, "mb-3 sm:mb-4 font-medium text-primary")}>
            QUICK REFERENCE FLAGS
          </p>
          <div className="space-y-2">
            {quickFlags.map((flag, idx) => {
              const bgColorMap = {
                error: "bg-red-50 border-red-100",
                warning: "bg-amber-50 border-amber-100",
                success: "bg-green-50 border-green-100",
              }
              const textColorMap = {
                error: "text-red-600",
                warning: "text-amber-600",
                success: "text-green-600",
              }
              return (
                <div
                  key={idx}
                  className={cn(
                    "flex items-start gap-2 rounded-lg p-3 border",
                    bgColorMap[flag.type]
                  )}
                >
                  <div className={cn("font-medium text-xs sm:text-sm", textColorMap[flag.type])}>
                    {flag.label}
                  </div>
                  <p className={cn("text-xs", textColorMap[flag.type])}>{flag.message}</p>
                </div>
              )
            })}
          </div>
        </div>
        )}

        {/* Action Buttons */}
        {registerExtract && (
        <div className="border-t border-border pt-4 sm:pt-6 flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" size="sm" className="text-xs" disabled>
            View Official Copy PDF
          </Button>
          <Button variant="outline" size="sm" className="text-xs" disabled>
            Rescan
          </Button>
          <Button variant="outline" size="sm" className="text-xs" disabled>
            Export
          </Button>
        </div>
        )}
      </div>
    </div>
  )
}
