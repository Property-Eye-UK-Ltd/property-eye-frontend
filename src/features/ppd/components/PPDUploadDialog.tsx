import { useCallback, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CloudChange, DocumentText, CloseCircle } from "iconsax-react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PPDUploadJob } from "@/types/ppd.types";

type DialogMode = "upload" | "reupload";

interface PPDUploadDialogProps {
  open: boolean;
  mode: DialogMode;
  activeJob: PPDUploadJob | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (year: number, file: File) => void;
}

const PPDUploadDialog = ({
  open,
  mode,
  activeJob,
  isSubmitting,
  onClose,
  onSubmit,
}: PPDUploadDialogProps) => {
  const [year, setYear] = useState(activeJob?.year ?? new Date().getFullYear());
  const [file, setFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetAndClose = () => {
    setFile(null);
    setIsDragActive(false);
    onClose();
  };

  const handleFileSelected = (selected: File | null) => {
    if (selected && !selected.name.toLowerCase().endsWith(".csv")) {
      return;
    }
    setFile(selected);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    handleFileSelected(e.dataTransfer.files?.[0] ?? null);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    onSubmit(mode === "reupload" ? activeJob!.year : year, file);
  };

  const title = mode === "reupload" ? "Restore Official Record" : "Upload Official Records";
  const actionLabel = mode === "reupload" ? "Restore Data" : "Upload Data";
  const pendingLabel = mode === "reupload" ? "Restoring..." : "Uploading...";

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) resetAndClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Manage Price Paid Data (PPD) uploads used for fraud detection.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="ppd-year">Year</Label>
            <Input
              id="ppd-year"
              type="number"
              min={1995}
              max={2030}
              value={mode === "reupload" ? activeJob?.year : year}
              onChange={(e) => setYear(Number(e.target.value))}
              disabled={mode === "reupload"}
            />
            <p className="text-xs text-muted-foreground">
              {mode === "reupload"
                ? `Restoring the existing record for ${activeJob?.year}.`
                : "Specify the year this data belongs to."}
            </p>
          </div>

          {mode === "reupload" && activeJob && (
            <div className="rounded-lg border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              Restoring <span className="font-medium text-foreground">{activeJob.filename}</span>{" "}
              from the existing record path.
            </div>
          )}

          {!file ? (
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragActive(true);
              }}
              onDragLeave={() => setIsDragActive(false)}
              onDrop={handleDrop}
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
                isDragActive ? "border-primary bg-primary/5" : "border-input hover:border-primary/60 hover:bg-muted/40"
              )}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => handleFileSelected(e.target.files?.[0] ?? null)}
              />
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <CloudChange size={22} variant="Linear" />
              </div>
              <h3 className="font-semibold mb-1">Click to upload or drag and drop</h3>
              <p className="text-muted-foreground text-sm">CSV files only</p>
            </div>
          ) : (
            <div className="bg-muted/40 rounded-xl border p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-lg flex items-center justify-center">
                  <DocumentText size={18} variant="Linear" />
                </div>
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <CloseCircle size={18} variant="Linear" />
              </button>
            </div>
          )}

          <Button type="submit" disabled={!file || isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                {pendingLabel}
              </>
            ) : (
              actionLabel
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PPDUploadDialog;
