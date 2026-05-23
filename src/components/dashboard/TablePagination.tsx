import { ArrowLeft, ArrowRight } from "iconsax-react"
import { cn } from "@/lib/utils"

export const generatePaginationItems = (
    currentPage: number,
    totalPages: number
): (number | "ellipsis")[] => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
        return [1, 2, 3, "ellipsis", totalPages - 1, totalPages]
    }

    if (currentPage >= totalPages - 2) {
        return [1, 2, 3, "ellipsis", totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages]
}

interface TablePaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const TablePagination = ({ currentPage, totalPages, onPageChange }: TablePaginationProps) => {
    const items = generatePaginationItems(currentPage, totalPages)

    const pageButtonClass = (active: boolean) =>
        cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-colors lg:h-9 lg:w-9 lg:text-sm",
            active ? "border-primary bg-primary text-secondary" : "border-primary text-primary"
        )

    return (
        <div className="border-t border-border px-3 py-3 lg:px-4 lg:py-4">
            <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                <button
                    type="button"
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary bg-white text-primary disabled:cursor-not-allowed disabled:opacity-50 lg:h-9 lg:w-9"
                >
                    <ArrowLeft size={16} variant="Outline" />
                </button>

                <div className="flex max-w-[min(100%,280px)] items-center justify-center gap-1 overflow-hidden">
                    {items.map((item, idx) =>
                        item === "ellipsis" ? (
                            <div
                                key={`ellipsis-${idx}`}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary text-xs text-primary lg:h-9 lg:w-9 lg:text-sm"
                            >
                                …
                            </div>
                        ) : (
                            <button
                                key={item}
                                type="button"
                                onClick={() => onPageChange(item)}
                                className={pageButtonClass(currentPage === item)}
                                aria-label={`Page ${item}`}
                                aria-current={currentPage === item ? "page" : undefined}
                            >
                                {item}
                            </button>
                        )
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary bg-white text-primary disabled:cursor-not-allowed disabled:opacity-50 lg:h-9 lg:w-9"
                >
                    <ArrowRight size={16} variant="Outline" />
                </button>
            </div>
        </div>
    )
}
