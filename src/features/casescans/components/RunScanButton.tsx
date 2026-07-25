import { useState } from "react";
import { isAxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Play, TickCircle } from "iconsax-react";
import { Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ScanSession } from "@/types/scan-session.types";

/**
 * POST /admin/scan-sessions sends `detail` as either a plain string or,
 * for the missing-buyer/vendor-name guard, an object with a human-readable
 * `message` (see scan_sessions.py) — pull whichever shape is present so the
 * toast shows the real reason instead of a generic "Request failed" string.
 */
const extractScanErrorMessage = (error: unknown, fallback: string): string => {
  if (!isAxiosError(error)) return fallback;
  const detail = error.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (detail && typeof detail === "object" && typeof detail.message === "string") {
    return detail.message;
  }
  return fallback;
};

type ScanState = "idle" | "running" | "success" | "error";

interface RunScanButtonProps {
  selectedMatchIds: Set<string>;
  onScanStart: () => void;
  onScanComplete: (session: ScanSession) => void;
  onScanError: (error: string) => void;
  isLoading?: boolean;
  compact?: boolean;
}

const RunScanButton = ({
  selectedMatchIds,
  onScanStart,
  onScanComplete,
  onScanError,
  isLoading = false,
  compact = false,
}: RunScanButtonProps) => {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const { toast } = useToast();

  const isDisabled = selectedMatchIds.size === 0 || scanState === "running";

  const handleRunScan = async () => {
    if (selectedMatchIds.size === 0) {
      toast({
        title: "No matches selected",
        description: "Please select at least one fraud match to verify.",
        variant: "destructive",
      });
      return;
    }

    setScanState("running");
    onScanStart();

    try {
      const { createScanSession } = await import("../api/scanSessionService");
      const { data: session } = await createScanSession(Array.from(selectedMatchIds));

      setScanState("success");
      onScanComplete(session);

      toast({
        title: "Scan Complete",
        description: `Scanned ${session.total_count} matches. ${session.confirmed_fraud_count} confirmed fraud, ${session.not_fraud_count} ruled out, ${session.error_count} errors.`,
      });

      setTimeout(() => setScanState("idle"), 3000);
    } catch (error) {
      setScanState("error");
      const errorMessage = extractScanErrorMessage(error, "Verification failed");
      onScanError(errorMessage);

      toast({
        title: "Scan Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleRunScan}
        disabled={isDisabled}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title={
          selectedMatchIds.size === 0
            ? "Select matches to scan"
            : "Run verification scan"
        }
      >
        {scanState === "running" && (
          <Loader2 size={20} variant="Linear" className="animate-spin" />
        )}
        {scanState === "idle" && (
          <Play size={20} variant="Linear" />
        )}
        {scanState === "success" && (
          <TickCircle size={20} variant="Linear" />
        )}
        {scanState === "error" && (
          <AlertCircle size={20} variant="Linear" />
        )}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={handleRunScan}
        disabled={isDisabled || isLoading}
        className="rounded-full px-6 h-9"
      >
        {scanState === "running" && (
          <>
            <Loader2 size={16} variant="Linear" className="animate-spin mr-2" />
            Verifying...
          </>
        )}
        {scanState === "idle" && (
          <>
            <Play size={16} variant="Linear" className="mr-2" />
            Run Scan
          </>
        )}
        {scanState === "success" && (
          <>
            <TickCircle size={16} variant="Linear" className="mr-2" />
            Scan Complete
          </>
        )}
        {scanState === "error" && (
          <>
            <AlertCircle size={16} variant="Linear" className="mr-2" />
            Scan Failed
          </>
        )}
      </Button>

      {scanState === "success" && (
        <span className="text-xs text-muted-foreground">
          Verification complete. Results displayed below.
        </span>
      )}
      {scanState === "error" && (
        <span className="text-xs text-destructive">Check error details above.</span>
      )}
    </div>
  );
};

export default RunScanButton;
