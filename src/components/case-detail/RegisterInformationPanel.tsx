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
import { ChevronDown, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import type { RegisterExtractData } from "@/types/scan-session.types"

interface RegisterInformationPanelProps {
  /** Register extract data, if it has been fetched (null/undefined if not scanned yet) */
  registerExtract?: RegisterExtractData | null
  /** True while a fetch/verify request is in flight */
  isVerifying?: boolean
  /** True while the initial register extract query is loading */
  isLoading?: boolean
  /** Triggers a register extract fetch (initial verify or rescan) */
  onVerify?: (forceRefresh?: boolean) => void
  /** Triggers a PDF download of the official copy */
  onDownloadPdf?: () => void
  isDownloadingPdf?: boolean
  /** Property address, used as a fallback before an extract has been fetched */
  propertyAddress?: string
  /** Title number, used as a fallback before an extract has been fetched */
  titleNumber?: string | null
}

const fieldLabel = "mb-0.5 text-xs text-muted-foreground"
const fieldValue = "text-xs text-primary sm:text-sm"

export const RegisterInformationPanel = ({
  registerExtract,
  isVerifying = false,
  isLoading = false,
  onVerify,
  onDownloadPdf,
  isDownloadingPdf = false,
  propertyAddress,
  titleNumber,
}: RegisterInformationPanelProps) => {
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

  const isScanned = registerExtract?.status === "complete"

  const quickFlags = (() => {
    if (!registerExtract) return []

    const flags: Array<{ type: "error" | "warning" | "success"; label: string; message: string }> = []

    const hasMismatch = registerExtract.proprietors.some((p) => p.mismatch)
    if (hasMismatch) {
      flags.push({
        type: "error",
        label: "Mismatch Alert",
        message: "Owner name differs from agency seller name",
      })
    }

    const hasChargesOrRestrictions =
      registerExtract.charges.length > 0 || registerExtract.restrictions.length > 0
    if (hasChargesOrRestrictions) {
      flags.push({
        type: "warning",
        label: "Legal Considerations",
        message: `${registerExtract.charges.length} charge(s) and ${registerExtract.restrictions.length} restriction(s) found`,
      })
    }

    for (const flag of registerExtract.quick_reference_flags) {
      flags.push({ type: "warning", label: "Fraud Indicator", message: flag })
    }

    if (flags.length === 0) {
      flags.push({
        type: "success",
        label: "Clear Status",
        message: "No charges or restrictions found",
      })
    }

    return flags
  })()

  // Not scanned state
  if (!registerExtract) {
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => onVerify?.(false)}
            disabled={isLoading || isVerifying}
            className="text-xs"
          >
            {(isLoading || isVerifying) && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
            Verify with Register
          </Button>
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
          {registerExtract.fetched_at && (
            <p className="mt-1 text-xs text-muted-foreground">
              Last Scanned:{" "}
              <span className="text-primary font-medium">
                {new Date(registerExtract.fetched_at).toLocaleDateString("en-GB")}
              </span>
            </p>
          )}
          {!isScanned && (
            <p className="mt-1 text-xs text-amber-600">
              {registerExtract.status === "pending"
                ? "Register lookup still in progress."
                : registerExtract.error_message || "Register lookup failed."}
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
              <p className={fieldValue}>{registerExtract.property.address || propertyAddress}</p>
            </div>
            <div>
              <p className={fieldLabel}>Title Number</p>
              <p className={fieldValue}>{registerExtract.title_number || titleNumber}</p>
            </div>
            {registerExtract.property.tenure && (
              <div>
                <p className={fieldLabel}>Tenure</p>
                <p className={fieldValue}>{registerExtract.property.tenure}</p>
              </div>
            )}
          </div>
        </div>

        {isScanned && (
          <>
            {/* Registered Proprietors */}
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
                    REGISTERED PROPRIETORS ({registerExtract.proprietors.length})
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
                            {prop.name || "—"}
                          </TableCell>
                          <TableCell className="px-2 py-2 text-xs text-muted-foreground lg:px-4 lg:py-3">
                            {prop.type || "—"}
                          </TableCell>
                          <TableCell className="px-2 py-2 text-xs text-muted-foreground lg:px-4 lg:py-3">
                            {prop.address || "—"}
                          </TableCell>
                          <TableCell className="px-2 py-2 text-xs lg:px-4 lg:py-3">
                            {prop.mismatch ? (
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

            {/* Charges */}
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
                        {charge.entry_text}
                        {charge.registration_date && (
                          <span className="text-muted-foreground">
                            {" "}
                            ({new Date(charge.registration_date).toLocaleDateString("en-GB")})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* Restrictions */}
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
                        {restriction.entry_text}
                        {restriction.registration_date && (
                          <span className="text-muted-foreground">
                            {" "}
                            ({new Date(restriction.registration_date).toLocaleDateString("en-GB")})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* Leases */}
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
                        {lease.entry_text}
                        {lease.registration_date && (
                          <span className="text-muted-foreground">
                            {" "}
                            (from {new Date(lease.registration_date).toLocaleDateString("en-GB")})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* Notices */}
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
                        {notice.entry_text}
                        {notice.registration_date && (
                          <span className="text-muted-foreground">
                            {" "}
                            ({new Date(notice.registration_date).toLocaleDateString("en-GB")})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* Quick Reference Flags */}
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
          </>
        )}

        {/* Action Buttons */}
        <div className="border-t border-border pt-4 sm:pt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={onDownloadPdf}
            disabled={!registerExtract.official_copy_available || isDownloadingPdf}
          >
            {isDownloadingPdf && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
            View Official Copy PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onVerify?.(true)}
            disabled={isVerifying}
          >
            {isVerifying && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
            Rescan
          </Button>
        </div>
      </div>
    </div>
  )
}
