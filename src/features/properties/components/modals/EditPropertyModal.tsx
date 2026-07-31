import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Buildings, MoneyRecive } from "iconsax-react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PropertyListing, PropertyListingInput, PropertyStatus } from "@/types/properties.types"
import { propertyStatusLabels } from "@/data/properties-data"

interface EditPropertyModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (values: PropertyListingInput) => Promise<void> | void
    listing: PropertyListing | null
    isSubmitting?: boolean
}

const emptyFormValues: PropertyListingInput = {
    address: "",
    postcode: "",
    region: "",
    county: "",
    property_number: "",
    title_number: "",
    client_name: "",
    vendor_name: "",
    status: "withdrawn",
    withdrawn_date: "",
    price: undefined,
    commission: undefined,
    contract_duration: "",
}

const statusOptions: PropertyStatus[] = ["withdrawn", "under_offer", "sold", "flagged"]

export const EditPropertyModal = ({
    open,
    onClose,
    onSubmit,
    listing,
    isSubmitting = false,
}: EditPropertyModalProps) => {
    const [formValues, setFormValues] = useState<PropertyListingInput>(emptyFormValues)
    const [touched, setTouched] = useState(false)

    useEffect(() => {
        if (open && listing) {
            const { id: _id, created_at: _createdAt, ...rest } = listing
            setFormValues(rest)
            setTouched(false)
        } else if (!open) {
            setFormValues(emptyFormValues)
            setTouched(false)
        }
    }, [open, listing])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target
        setFormValues((prev) => ({
            ...prev,
            [name]: type === "number" ? (value === "" ? undefined : Number(value)) : value,
        }))
    }

    const requiredFieldsFilled =
        Boolean(formValues.address) &&
        Boolean(formValues.postcode) &&
        Boolean(formValues.status) &&
        Boolean(formValues.withdrawn_date)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setTouched(true)
        if (!requiredFieldsFilled || isSubmitting) return
        onSubmit(formValues)
    }

    return (
        <ModalShell
            open={open}
            onClose={onClose}
            contentClassName="max-w-3xl rounded-2xl bg-white pb-0 pt-0 sm:rounded-3xl"
        >
            <form
                onSubmit={handleSubmit}
                className="flex max-h-[min(85dvh,100%)] flex-col overflow-hidden rounded-2xl bg-white sm:rounded-3xl"
            >
                <div className="shrink-0 bg-white px-4 py-4 pr-12 text-left sm:px-6 sm:py-6 sm:pr-6">
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Edit Property</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Update the details of this property. Fields marked with * are required.
                    </p>
                </div>

                <div className="overflow-y-auto bg-muted px-4 py-4 scrollbar-super-thin sm:px-6 sm:py-8">
                    <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                        <section>
                            <div className="mb-4 flex items-center gap-2">
                                <Buildings size={18} variant="Bulk" className="text-primary" />
                                <h3 className="text-sm font-semibold text-foreground">Property Details</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Address *</label>
                                    <Input
                                        type="text"
                                        name="address"
                                        value={formValues.address}
                                        onChange={handleInputChange}
                                        className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                                    />
                                    {touched && !formValues.address && (
                                        <p className="text-xs text-red-600">Address is required</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Postcode *</label>
                                        <Input
                                            type="text"
                                            name="postcode"
                                            value={formValues.postcode}
                                            onChange={handleInputChange}
                                            className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                                        />
                                        {touched && !formValues.postcode && (
                                            <p className="text-xs text-red-600">Postcode is required</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Region</label>
                                        <Input
                                            type="text"
                                            name="region"
                                            value={formValues.region}
                                            onChange={handleInputChange}
                                            className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">County</label>
                                        <Input
                                            type="text"
                                            name="county"
                                            value={formValues.county}
                                            onChange={handleInputChange}
                                            className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Property Number</label>
                                        <Input
                                            type="text"
                                            name="property_number"
                                            value={formValues.property_number}
                                            onChange={handleInputChange}
                                            className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Title Number</label>
                                    <Input
                                        type="text"
                                        name="title_number"
                                        value={formValues.title_number}
                                        onChange={handleInputChange}
                                        className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                                    />
                                </div>
                            </div>
                        </section>

                        <hr className="my-6 border-border" />

                        <section>
                            <div className="mb-4 flex items-center gap-2">
                                <MoneyRecive size={18} variant="Bulk" className="text-primary" />
                                <h3 className="text-sm font-semibold text-foreground">Transaction Details</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Purchaser Name</label>
                                        <Input
                                            type="text"
                                            name="client_name"
                                            value={formValues.client_name}
                                            onChange={handleInputChange}
                                            className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Vendor Name</label>
                                        <Input
                                            type="text"
                                            name="vendor_name"
                                            value={formValues.vendor_name}
                                            onChange={handleInputChange}
                                            className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Status *</label>
                                        <Select
                                            value={formValues.status}
                                            onValueChange={(value) =>
                                                setFormValues((prev) => ({
                                                    ...prev,
                                                    status: value as PropertyStatus,
                                                }))
                                            }
                                        >
                                            <SelectTrigger className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm">
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statusOptions.map((status) => (
                                                    <SelectItem key={status} value={status}>
                                                        {propertyStatusLabels[status]}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">
                                            Withdrawn Date *
                                        </label>
                                        <Input
                                            type="date"
                                            name="withdrawn_date"
                                            value={formValues.withdrawn_date}
                                            onChange={handleInputChange}
                                            className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                                        />
                                        {touched && !formValues.withdrawn_date && (
                                            <p className="text-xs text-red-600">Withdrawn date is required</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Price</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                                £
                                            </span>
                                            <Input
                                                type="number"
                                                name="price"
                                                value={formValues.price ?? ""}
                                                onChange={handleInputChange}
                                                className="h-12 rounded-xl border border-border bg-transparent pl-8 pr-4 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Commission</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                                £
                                            </span>
                                            <Input
                                                type="number"
                                                name="commission"
                                                value={formValues.commission ?? ""}
                                                onChange={handleInputChange}
                                                className="h-12 rounded-xl border border-border bg-transparent pl-8 pr-4 text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Contract Duration</label>
                                    <Input
                                        type="text"
                                        name="contract_duration"
                                        value={formValues.contract_duration}
                                        onChange={handleInputChange}
                                        className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                                    />
                                </div>
                            </div>
                        </section>
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
                            type="submit"
                            disabled={isSubmitting}
                            className="min-w-0 flex-1 rounded-full bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground disabled:opacity-60 sm:px-8 sm:py-3 sm:text-sm"
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </form>
        </ModalShell>
    )
}
