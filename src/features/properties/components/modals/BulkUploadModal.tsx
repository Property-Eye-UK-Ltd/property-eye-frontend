import { ChangeEvent, DragEvent, useEffect, useState } from "react"
import { CloudPlus, CloseCircle, DocumentText, InfoCircle, TickCircle } from "iconsax-react"
import { Loader2 } from "lucide-react"
import { ModalShell } from "@/components/modals/ModalShell"
import { cn } from "@/lib/utils"
import { DocumentUploadError, DocumentUploadResult } from "@/types/properties.types"

type UploadStage = "idle" | "file-selected" | "processing" | "success" | "error"

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024 // 10MB — text-heavy CSV/PDF listings, no backend limit found
const ACCEPTED_EXTENSIONS = [".csv", ".pdf"]

const illustrationColumns = ["Address", "Postcode", "Price", "Status"]
// Deterministic widths (not Math.random()) so the illustration doesn't jitter on re-render.
const illustrationRowWidths = [
    [62, 45, 70, 50],
    [55, 68, 48, 60],
]

interface BulkUploadModalProps {
    open: boolean
    onClose: () => void
    onUpload: (file: File) => Promise<DocumentUploadResult>
    onUploaded: () => void
}

export const BulkUploadModal = ({ open, onClose, onUpload, onUploaded }: BulkUploadModalProps) => {
    const [stage, setStage] = useState<UploadStage>("idle")
    const [file, setFile] = useState<File | null>(null)
    const [isDragActive, setIsDragActive] = useState(false)
    const [inlineError, setInlineError] = useState("")
    const [result, setResult] = useState<DocumentUploadResult | null>(null)
    const [errorInfo, setErrorInfo] = useState<DocumentUploadError | null>(null)

    useEffect(() => {
        if (!open) {
            setStage("idle")
            setFile(null)
            setIsDragActive(false)
            setInlineError("")
            setResult(null)
            setErrorInfo(null)
        }
    }, [open])

    const validateAndSetFile = (candidate: File | null) => {
        if (!candidate) return
        setInlineError("")

        const extension = candidate.name.slice(candidate.name.lastIndexOf(".")).toLowerCase()
        if (!ACCEPTED_EXTENSIONS.includes(extension)) {
            setInlineError("Unsupported file type. Please upload a CSV or PDF file.")
            return
        }
        if (candidate.size === 0) {
            setInlineError("This file is empty. Please choose a file that contains data.")
            return
        }
        if (candidate.size > MAX_UPLOAD_BYTES) {
            setInlineError("This file is too large. Maximum upload size is 10MB.")
            return
        }

        setFile(candidate)
        setStage("file-selected")
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const candidate = event.target.files?.[0] ?? null
        validateAndSetFile(candidate)
        event.target.value = ""
    }

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
        const candidate = event.dataTransfer.files?.[0] ?? null
        validateAndSetFile(candidate)
    }

    const handleRemoveFile = () => {
        setFile(null)
        setInlineError("")
        setStage("idle")
    }

    const runUpload = async () => {
        if (!file) return
        setStage("processing")
        try {
            const uploadResult = await onUpload(file)
            setResult(uploadResult)
            setStage("success")
            onUploaded()
        } catch (error) {
            const typedError = error as DocumentUploadError
            setErrorInfo(
                typedError?.detail
                    ? typedError
                    : { kind: "network", detail: "Something went wrong while uploading. Please try again." }
            )
            setStage("error")
        }
    }

    const handleRetry = () => {
        setErrorInfo(null)
        setStage(file ? "file-selected" : "idle")
    }

    const handleDone = () => {
        onClose()
    }

    const handleTryAnotherFile = () => {
        setFile(null)
        setResult(null)
        setStage("idle")
    }

    return (
        <ModalShell
            open={open}
            onClose={onClose}
            contentClassName="max-w-2xl rounded-2xl bg-white pb-0 pt-0 sm:rounded-3xl"
        >
            <div className="flex max-h-[min(85dvh,100%)] flex-col overflow-hidden rounded-2xl bg-white sm:rounded-3xl">
                {(stage === "idle" || stage === "file-selected") && (
                    <>
                        <div className="shrink-0 bg-white px-4 py-4 pr-12 text-left sm:px-6 sm:py-6 sm:pr-6">
                            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                                Bulk Upload Properties
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Upload a CSV or PDF to extract and add the properties for you.
                            </p>
                        </div>

                        <div className="overflow-y-auto bg-muted px-4 py-4 scrollbar-super-thin sm:px-6 sm:py-8">
                            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                                <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4">
                                    <div className="mb-1.5 grid grid-cols-4 gap-1.5">
                                        {illustrationColumns.map((col) => (
                                            <div
                                                key={col}
                                                className="rounded-md border border-border bg-white px-2 py-1 text-center text-[10px] font-medium text-muted-foreground"
                                            >
                                                {col}
                                            </div>
                                        ))}
                                    </div>
                                    {illustrationRowWidths.map((row, rowIndex) => (
                                        <div key={rowIndex} className="mb-1.5 grid grid-cols-4 gap-1.5 last:mb-0">
                                            {row.map((width, colIndex) => (
                                                <div
                                                    key={colIndex}
                                                    className="h-2 rounded-full bg-gray-200"
                                                    style={{ width: `${width}%` }}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                                    <InfoCircle size={14} variant="Bold" className="mt-0.5 shrink-0" />
                                    <span>
                                        Column order doesn't matter — but every field needs to be somewhere
                                        in your file.
                                    </span>
                                </div>

                                <div className="mt-5">
                                    {file ? (
                                        <div className="relative flex flex-col items-center rounded-2xl border border-dashed border-border bg-muted px-6 py-8 text-center">
                                            <button
                                                type="button"
                                                onClick={handleRemoveFile}
                                                className="absolute right-4 top-4 text-red-500"
                                                aria-label="Remove file"
                                            >
                                                <CloseCircle
                                                    variant="Bold"
                                                    size={28}
                                                    className="rounded-full bg-white text-red-500"
                                                />
                                            </button>
                                            <div className="flex items-center justify-center">
                                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200/80">
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                                        <DocumentText
                                                            variant="Bulk"
                                                            size={34}
                                                            className="text-gray-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="mt-4 text-sm font-medium text-foreground">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <label
                                                htmlFor="properties-upload-input"
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
                                                    <div className="flex items-center justify-center rounded-full bg-gray-200 p-3">
                                                        <div className="flex items-center justify-center rounded-full bg-gray-300 p-2">
                                                            <CloudPlus
                                                                variant="Bulk"
                                                                size={34}
                                                                className="text-gray-700"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mt-6 text-sm text-muted-foreground">
                                                    <span className="text-progress">Click to upload</span> or
                                                    drag and drop
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    CSV or PDF (max. 10MB)
                                                </p>
                                            </label>
                                            <input
                                                id="properties-upload-input"
                                                type="file"
                                                accept=".csv,.pdf"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </>
                                    )}
                                    {inlineError && (
                                        <p className="mt-2 text-xs text-red-600">{inlineError}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="shrink-0 bg-white px-4 py-4 sm:px-8 sm:py-6">
                            <div className="flex flex-row gap-2 sm:gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="min-w-0 flex-1 rounded-full bg-muted px-3 py-2.5 text-xs font-medium text-foreground sm:px-8 sm:py-3 sm:text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={runUpload}
                                    disabled={!file}
                                    className="min-w-0 flex-1 rounded-full bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground disabled:opacity-60 sm:px-8 sm:py-3 sm:text-sm"
                                >
                                    Upload and Process
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {stage === "processing" && (
                    <div className="flex flex-col items-center gap-4 px-6 py-12 text-center sm:gap-6 sm:px-10">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-progress/10">
                            <Loader2 className="h-8 w-8 animate-spin text-progress" />
                        </div>
                        <div>
                            <h2 className="text-xl font-medium text-foreground sm:text-2xl">
                                Analyzing your file...
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Reading {file?.name} and extracting property records. This
                                usually takes a few seconds.
                            </p>
                        </div>
                    </div>
                )}

                {stage === "success" && result && (
                    <div className="flex flex-col items-center gap-4 px-6 py-8 text-center sm:gap-6 sm:px-10 sm:py-12">
                        {result.records_processed === 0 ? (
                            <>
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 sm:h-24 sm:w-24">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 sm:h-20 sm:w-20">
                                        <InfoCircle
                                            size={40}
                                            variant="Bold"
                                            className="text-amber-600 sm:h-[52px] sm:w-[52px]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-medium text-foreground sm:text-2xl">
                                        No Properties Found
                                    </h2>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        No properties could be extracted from this file. Double-check that
                                        all required columns are present.
                                    </p>
                                </div>
                                <div className="flex w-full flex-row gap-2 sm:gap-3">
                                    <button
                                        onClick={handleDone}
                                        className="min-w-0 flex-1 rounded-full bg-muted px-3 py-2.5 text-xs font-medium text-foreground sm:px-8 sm:py-3 sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleTryAnotherFile}
                                        className="min-w-0 flex-1 rounded-full bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground sm:px-8 sm:py-3 sm:text-sm"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    className={cn(
                                        "flex h-20 w-20 animate-in items-center justify-center rounded-full duration-300 zoom-in-95 sm:h-24 sm:w-24",
                                        "bg-success/10"
                                    )}
                                >
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20 sm:h-20 sm:w-20">
                                        <TickCircle
                                            size={40}
                                            variant="Bold"
                                            className="text-success sm:h-[52px] sm:w-[52px]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-medium text-foreground sm:text-2xl">
                                        Upload Complete
                                    </h2>
                                    {result.records_skipped === 0 ? (
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            All {result.records_processed} properties were added successfully.
                                        </p>
                                    ) : (
                                        <p className="mt-2 text-sm text-amber-700">
                                            {result.records_processed} added · {result.records_skipped} skipped
                                            — some rows may be duplicates or missing required fields.
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={handleDone}
                                    className="w-full rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground"
                                >
                                    Done
                                </button>
                            </>
                        )}
                    </div>
                )}

                {stage === "error" && errorInfo && (
                    <div className="flex flex-col items-center gap-4 px-6 py-8 text-center sm:gap-6 sm:px-10 sm:py-12">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-error/10 sm:h-24 sm:w-24">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-error/20 sm:h-20 sm:w-20">
                                <CloseCircle
                                    size={40}
                                    variant="Bold"
                                    className="text-error sm:h-[52px] sm:w-[52px]"
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-medium text-foreground sm:text-2xl">Upload Failed</h2>
                            <p className="mt-2 text-sm text-muted-foreground">{errorInfo.detail}</p>
                        </div>
                        <div className="flex w-full flex-row gap-2 sm:gap-3">
                            <button
                                onClick={onClose}
                                className="min-w-0 flex-1 rounded-full bg-muted px-3 py-2.5 text-xs font-medium text-foreground sm:px-8 sm:py-3 sm:text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRetry}
                                className="min-w-0 flex-1 rounded-full bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground sm:px-8 sm:py-3 sm:text-sm"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ModalShell>
    )
}
