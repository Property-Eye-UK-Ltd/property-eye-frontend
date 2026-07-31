import { useState } from "react"
import {
  Circle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  CircleSlash,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface ScanIndicatorProps {
  /**
   * Verification status from FraudMatch
   */
  verification_status: "suspicious" | "confirmed_fraud" | "not_fraud" | "error" | null
  /**
   * Optional: scan session date for tooltip
   */
  scan_date?: string | null
  /**
   * Optional: name of admin who ran the scan
   */
  scanned_by?: string | null
  /**
   * Callback when indicator is clicked
   */
  onClick?: () => void
  /**
   * Optional: case ID for accessibility
   */
  caseId?: string
}

export const ScanIndicator = ({
  verification_status,
  scan_date,
  scanned_by,
  onClick,
  caseId,
}: ScanIndicatorProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // Determine icon, color, and label based on status
  const getIconConfig = () => {
    // If there is no scan date, the check has not been processed/run yet
    if (!scan_date) {
      return {
        Icon: CircleSlash,
        colorClass: "text-gray-400",
        bgClass: "hover:bg-gray-50",
        label: "Not Scanned",
      }
    }

    switch (verification_status) {
      case "confirmed_fraud":
        return {
          Icon: CheckCircle2,
          colorClass: "text-green-600",
          bgClass: "hover:bg-green-50",
          label: "Confirmed Fraud",
        }
      case "not_fraud":
        return {
          Icon: XCircle,
          colorClass: "text-green-600",
          bgClass: "hover:bg-green-50",
          label: "Ruled Out",
        }
      case "error":
        return {
          Icon: AlertCircle,
          colorClass: "text-orange-600",
          bgClass: "hover:bg-orange-50",
          label: "Verification Error",
        }
      case "suspicious":
        return {
          Icon: Circle,
          colorClass: "text-gray-400",
          bgClass: "hover:bg-gray-50",
          label: "Awaiting Verification",
        }
      case null:
      default:
        return {
          Icon: CircleSlash,
          colorClass: "text-gray-400",
          bgClass: "hover:bg-gray-50",
          label: "Not Scanned",
        }
    }
  }

  const { Icon, colorClass, bgClass, label } = getIconConfig()

  const tooltipText = scan_date
    ? `Scanned on ${new Date(scan_date).toLocaleDateString()} ${new Date(scan_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}${scanned_by ? ` by ${scanned_by}` : ""}`
    : label

  const handleClick = () => {
    setIsOpen(false)
    onClick?.()
  }

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <button
            onClick={handleClick}
            className={cn(
              "inline-flex items-center justify-center rounded-full p-1 transition-colors",
              bgClass
            )}
            aria-label={`Scan status: ${label}${caseId ? ` for case ${caseId}` : ""}`}
            title={tooltipText}
          >
            <Icon className={cn("h-5 w-5", colorClass)} />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" align="center" className="text-xs">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
