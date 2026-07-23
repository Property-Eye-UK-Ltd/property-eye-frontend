import axios from "axios";
import apiClient from "@/lib/apiClient";
import type { PPDUploadJob } from "@/types/ppd.types";

interface PresignResponse {
  upload_id: string;
  upload_url: string;
  key: string;
}

export const listPPDUploads = async (): Promise<PPDUploadJob[]> => {
  const { data } = await apiClient.get<PPDUploadJob[]>("/ppd/uploads");
  return data;
};

const putToPresignedUrl = async (
  uploadUrl: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<void> => {
  await axios.put(uploadUrl, file, {
    headers: { "Content-Type": "text/csv" },
    onUploadProgress: (event) => {
      if (!onProgress || !event.total) return;
      onProgress(Math.round((event.loaded / event.total) * 100));
    },
  });
};

export const uploadPPDCsv = async (
  year: number,
  file: File,
  onProgress?: (percent: number) => void
): Promise<PPDUploadJob> => {
  const { data: presign } = await apiClient.post<PresignResponse>(
    "/ppd/upload/presign",
    { year, filename: file.name }
  );

  await putToPresignedUrl(presign.upload_url, file, onProgress);

  const { data } = await apiClient.post<PPDUploadJob>(
    `/ppd/upload/${presign.upload_id}/complete`
  );
  return data;
};

export const reuploadPPDCsv = async (
  uploadId: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<PPDUploadJob> => {
  const { data: presign } = await apiClient.post<PresignResponse>(
    `/ppd/upload/${uploadId}/reupload/presign`
  );

  await putToPresignedUrl(presign.upload_url, file, onProgress);

  const { data } = await apiClient.post<PPDUploadJob>(
    `/ppd/upload/${uploadId}/complete`
  );
  return data;
};

export const deletePPDUpload = async (uploadId: string): Promise<void> => {
  await apiClient.delete(`/ppd/upload/${uploadId}`);
};
