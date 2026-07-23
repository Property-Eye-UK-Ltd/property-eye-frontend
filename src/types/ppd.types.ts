export type PPDUploadStatus = "uploaded" | "processing" | "completed" | "failed";

export interface PPDUploadJob {
  upload_id: string;
  filename: string;
  year: number;
  month: number;
  status: PPDUploadStatus;
  records_processed: number | null;
  error_message: string | null;
  source_file_exists: boolean;
  parquet_file_exists: boolean;
  uploaded_at: string;
  processed_at: string | null;
}

export interface PPDUploadResponse {
  upload_id: string;
  filename: string;
  year: number;
  month: number;
  file_size_mb: number;
  status: string;
  message: string;
  uploaded_at: string;
}
