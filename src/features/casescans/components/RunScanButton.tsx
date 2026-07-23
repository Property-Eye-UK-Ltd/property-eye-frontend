import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, TickCircle } from "iconsax-react";
import { Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { VerificationSummary } from "@/types/casescans.types";

type ScanState = "idle" | "running" | "success" | "error";

interface RunScanButtonProps {
  selectedMatchIds: Set<string>;
  onScanStart: () => void;
  onScanComplete: (summary: VerificationSummary) => void;
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
      const { verifyMatches } = await import("../api/scanService");
      const result = await verifyMatches(Array.from(selectedMatchIds));

      setScanState("success");
      onScanComplete(result);

      toast({
        title: "Scan Complete",
        description: `Verified ${result.total_verified} matches. ${result.confirmed_fraud_count} confirmed fraud, ${result.not_fraud_count} ruled out, ${result.error_count} errors.`,
      });

      setTimeout(() => setScanState("idle"), 3000);
    } catch (error) {
      setScanState("error");
      const errorMessage =
        error instanceof Error ? error.message : "Verification failed";
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
