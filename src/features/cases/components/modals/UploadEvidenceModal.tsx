import { ChangeEvent, DragEvent, FormEvent, useEffect, useState } from "react"
import { CloudPlus, CloseCircle } from "iconsax-react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface UploadEvidenceFormValues {
  evidenceType: string
  description: string
  file: File | null
}

const evidenceTypes = ["Email", "Call Record", "Photo", "Document", "Other"]

interface UploadEvidenceModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: UploadEvidenceFormValues) => Promise<void> | void
  isSubmitting?: boolean
}

const initialFormValues: UploadEvidenceFormValues = {
  evidenceType: "",
  description: "",
  file: null,
}

export const UploadEvidenceModal = ({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
}: UploadEvidenceModalProps) => {
  const [formValues, setFormValues] = useState<UploadEvidenceFormValues>(initialFormValues)
  const [isDragActive, setIsDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      setFormValues(initialFormValues)
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
    }
  }, [open, previewUrl])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const setFileWithPreview = (file: File | null) => {
    setFormValues((prev) => ({ ...prev, file }))
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setFileWithPreview(file)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formValues.evidenceType || !formValues.description || !formValues.file || isSubmitting) {
      return
    }
    onSubmit(formValues)
  }

  const isUploadDisabled =
    !formValues.evidenceType || !formValues.description || !formValues.file || isSubmitting

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragActive(true)
  }

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragActive(false)
  }

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragActive(false)
    const file = event.dataTransfer.files?.[0] ?? null
    if (file) {
      setFileWithPreview(file)
    }
  }

  const handleRemoveFile = () => {
    setFileWithPreview(null)
  }

  const isImagePreview = formValues.file?.type.startsWith("image/") ?? false

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      contentClassName="max-w-3xl rounded-3xl bg-white pb-0 pt-0"
    >
      <form
        onSubmit={handleSubmit}
        className="flex max-h-[85vh] flex-col overflow-hidden rounded-3xl bg-white"
      >
        <div className="bg-white px-4 py-4 text-left shrink-0">
          <h2 className="text-2xl font-semibold text-foreground">Upload Evidence</h2>
          <p className="text-sm text-muted-foreground">
            Enter the details of the user to be added to the team.
          </p>
        </div>

        <div className="bg-muted px-6 py-8 overflow-y-auto scrollbar-super-thin">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Evidence Type</label>
                <Select
                  value={formValues.evidenceType}
                  onValueChange={(value) =>
                    setFormValues((prev) => ({ ...prev, evidenceType: value }))
                  }
                >
                  <SelectTrigger className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm">
                    <SelectValue placeholder="Select an evidence type" />
                  </SelectTrigger>
                  <SelectContent>
                    {evidenceTypes.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Input
                  type="text"
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  placeholder="Buyer intro..."
                  className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Attachment</label>
                {formValues.file ? (
                  <div className="relative flex flex-col items-center rounded-2xl border border-dashed border-border bg-muted px-6 py-8 text-center">
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="absolute right-4 top-4 text-red-500"
                      aria-label="Remove file"
                    >
                      <CloseCircle variant="Bold" size={28} className="text-red-500 bg-white rounded-full" />
                    </button>
                    {isImagePreview && previewUrl ? (
                      <img
                        src={previewUrl}
                        alt={formValues.file.name}
                        className="max-h-64 w-full rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200/80">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                            <CloudPlus variant="Bulk" size={34} className="text-gray-500" />
                          </div>
                        </div>
                      </div>
                    )}
                    <p className="mt-4 text-sm font-medium text-foreground">{formValues.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(formValues.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="evidence-upload-input"
                      className={cn(
                        "flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted px-6 py-10 text-center transition-colors",
                        isDragActive && "border-progress bg-muted/80"
                      )}
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="flex items-center justify-center">
                        <div className="flex p-3 items-center justify-center rounded-full bg-gray-200">
                          <div className="flex p-2  items-center justify-center rounded-full bg-gray-300">
                            <CloudPlus variant="Bulk" size={34} className="text-gray-700" />
                          </div>
                        </div>
                      </div>
                      <p className="mt-6 text-sm text-muted-foreground">
                        <span className="text-progress">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">SVG, PNG, JPG or PDF (max. 5MB)</p>
                    </label>
                    <input
                      id="evidence-upload-input"
                      type="file"
                      accept=".png,.jpg,.jpeg,.svg,.pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white px-8 py-6 shrink-0">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-full bg-muted px-8 py-3 text-sm font-medium text-foreground sm:flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploadDisabled}
              className="w-full rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60 sm:flex-1"
            >
              {isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </form>
    </ModalShell>
  )
}


