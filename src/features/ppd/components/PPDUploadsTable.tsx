import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TickCircle, CloseCircle, Refresh, Trash } from "iconsax-react";
import { Loader2 } from "lucide-react";
import type { PPDUploadJob } from "@/types/ppd.types";

interface PPDUploadsTableProps {
  jobs: PPDUploadJob[];
  loading: boolean;
  onReupload: (job: PPDUploadJob) => void;
  onDelete: (job: PPDUploadJob) => void;
}

const statusBadgeVariant: Record<
  PPDUploadJob["status"],
  "default" | "secondary" | "destructive"
> = {
  completed: "default",
  processing: "secondary",
  uploaded: "secondary",
  failed: "destructive",
};

const PPDUploadsTable = ({
  jobs,
  loading,
  onReupload,
  onDelete,
}: PPDUploadsTableProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={24} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        No uploads found. Upload a CSV file to get started.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date Uploaded</TableHead>
          <TableHead>Filename</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Records Processed</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.upload_id}>
            <TableCell className="text-muted-foreground">
              {new Date(job.uploaded_at).toLocaleDateString()}{" "}
              <span className="text-xs text-muted-foreground/70">
                {new Date(job.uploaded_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span className="font-medium break-all">{job.filename}</span>
                <span
                  title={
                    job.source_file_exists
                      ? "CSV present on disk"
                      : "CSV missing from filesystem"
                  }
                >
                  {job.source_file_exists ? (
                    <TickCircle size={16} variant="Bold" className="text-emerald-600" />
                  ) : (
                    <CloseCircle size={16} variant="Bold" className="text-destructive" />
                  )}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {job.parquet_file_exists ? "Parquet available" : "Parquet missing"}
              </div>
            </TableCell>
            <TableCell className="font-medium">{job.year}</TableCell>
            <TableCell>
              <Badge variant={statusBadgeVariant[job.status]} className="capitalize">
                {job.status}
              </Badge>
              {job.error_message && (
                <div
                  className="text-xs text-destructive mt-1 max-w-xs truncate"
                  title={job.error_message}
                >
                  {job.error_message}
                </div>
              )}
            </TableCell>
            <TableCell className="text-right font-mono">
              {job.records_processed?.toLocaleString() ?? "-"}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end items-center gap-1">
                {!job.source_file_exists && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReupload(job)}
                    className="h-8 text-xs"
                  >
                    <Refresh size={14} variant="Linear" className="mr-1" />
                    Reupload
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(job)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  title="Delete record"
                >
                  <Trash size={16} variant="Linear" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PPDUploadsTable;
