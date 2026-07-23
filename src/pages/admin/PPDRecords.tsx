import { useCallback, useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DocumentUpload } from "iconsax-react";
import { useToast } from "@/hooks/use-toast";
import PPDUploadsTable from "@/features/ppd/components/PPDUploadsTable";
import PPDUploadDialog from "@/features/ppd/components/PPDUploadDialog";
import {
  listPPDUploads,
  uploadPPDCsv,
  reuploadPPDCsv,
  deletePPDUpload,
} from "@/features/ppd/api/ppdService";
import type { PPDUploadJob } from "@/types/ppd.types";

type DialogMode = "upload" | "reupload";

const PPDRecords = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<PPDUploadJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>("upload");
  const [activeJob, setActiveJob] = useState<PPDUploadJob | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PPDUploadJob | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listPPDUploads();
      setJobs(data);
    } catch (error) {
      toast({
        title: "Error loading records",
        description:
          error instanceof Error ? error.message : "Failed to load PPD uploads",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const openUploadDialog = () => {
    setDialogMode("upload");
    setActiveJob(null);
    setIsDialogOpen(true);
  };

  const openReuploadDialog = (job: PPDUploadJob) => {
    setDialogMode("reupload");
    setActiveJob(job);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setActiveJob(null);
  };

  const handleSubmit = async (year: number, file: File) => {
    if (dialogMode === "upload") {
      const existing = jobs.find((job) => job.year === year);
      if (existing) {
        toast({
          title: "Record already exists",
          description: `An official record for the year ${year} already exists. Please delete it first before uploading a new one.`,
          variant: "destructive",
        });
        return;
      }

      setIsSubmitting(true);
      try {
        await uploadPPDCsv(year, file);
        toast({
          title: "Upload started",
          description: "Official Records file uploaded and processing started.",
        });
        closeDialog();
        fetchJobs();
      } catch (error) {
        toast({
          title: "Upload failed",
          description:
            error instanceof Error ? error.message : "Failed to upload file",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (!activeJob) return;

    setIsSubmitting(true);
    try {
      await reuploadPPDCsv(activeJob.upload_id, file);
      toast({
        title: "Restore queued",
        description: "Official record restored and processing restarted.",
      });
      closeDialog();
      fetchJobs();
    } catch (error) {
      toast({
        title: "Restore failed",
        description:
          error instanceof Error ? error.message : "Failed to restore file",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deletePPDUpload(deleteTarget.upload_id);
      toast({
        title: "Record deleted",
        description: "Record deleted successfully.",
      });
      setDeleteTarget(null);
      fetchJobs();
    } catch (error) {
      toast({
        title: "Delete failed",
        description:
          error instanceof Error ? error.message : "Failed to delete record",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DashboardLayout variant="super-admin">
      <DynamicPageHeader
        title="Official Records"
        actions={
          <Button onClick={openUploadDialog} className="rounded-full">
            <DocumentUpload size={16} variant="Linear" className="mr-2" />
            Upload Official Records
          </Button>
        }
      />

      <DashboardPanel>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-semibold text-sm">Upload History</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage Price Paid Data (PPD) uploads for fraud detection.
            </p>
          </div>
          <span className="text-xs text-muted-foreground bg-muted/60 px-3 py-1 rounded-full">
            {jobs.length} Records
          </span>
        </div>

        <PPDUploadsTable
          jobs={jobs}
          loading={loading}
          onReupload={openReuploadDialog}
          onDelete={setDeleteTarget}
        />
      </DashboardPanel>

      <PPDUploadDialog
        open={isDialogOpen}
        mode={dialogMode}
        activeJob={activeJob}
        isSubmitting={isSubmitting}
        onClose={closeDialog}
        onSubmit={handleSubmit}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Official Record?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this record? This will remove the CSV
              file and any processed data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Record
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default PPDRecords;
