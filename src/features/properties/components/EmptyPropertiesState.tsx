import { Buildings } from "iconsax-react"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"

interface EmptyPropertiesStateProps {
    onAddProperty: () => void
}

export const EmptyPropertiesState = ({ onAddProperty }: EmptyPropertiesStateProps) => {
    return (
        <DashboardPanel
            title="Properties"
            description="Track the properties you've submitted for fraud monitoring."
            className="overflow-hidden"
            hasBorder
        >
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Buildings size={28} variant="Bulk" className="text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-foreground">No properties yet</h3>
                <p className="mb-6 max-w-md text-sm text-muted-foreground">
                    Add a property manually or bulk-upload a CSV/PDF to start monitoring your
                    withdrawn and sold listings for fraud.
                </p>
                <button
                    type="button"
                    onClick={onAddProperty}
                    className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    Add your first property
                </button>
            </div>
        </DashboardPanel>
    )
}
