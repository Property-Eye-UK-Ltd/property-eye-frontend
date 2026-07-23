import apiClient from "@/lib/apiClient";
import type { PPDUploadJob, PPDUploadResponse } from "@/types/ppd.types";

export const listPPDUploads = async (): Promise<PPDUploadJob[]> => {
  const { data } = await apiClient.get<PPDUploadJob[]>("/ppd/uploads");
  return data;
};

export const uploadPPDCsv = async (
  year: number,
  file: File
): Promise<PPDUploadResponse> => {
  const formData = new FormData();
  formData.append("year", year.toString());
  formData.append("file", file);

  const { data } = await apiClient.post<PPDUploadResponse>(
    "/ppd/upload",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
};

export const reuploadPPDCsv = async (
  uploadId: string,
  file: File
): Promise<PPDUploadJob> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<PPDUploadJob>(
    `/ppd/upload/${uploadId}/reupload`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
};

export const deletePPDUpload = async (uploadId: string): Promise<void> => {
  await apiClient.delete(`/ppd/upload/${uploadId}`);
};
