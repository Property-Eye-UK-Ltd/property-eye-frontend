import { FormEvent, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface EditAmountDialogProps {
    open: boolean
    onClose: () => void
    title: string
    description: string
    initialAmount: number
    isSubmitting?: boolean
    onSubmit: (amount: number) => void
}

export const EditAmountDialog = ({
    open,
    onClose,
    title,
    description,
    initialAmount,
    isSubmitting,
    onSubmit,
}: EditAmountDialogProps) => {
    const [value, setValue] = useState(String(initialAmount))

    useEffect(() => {
        if (open) setValue(String(initialAmount))
    }, [open, initialAmount])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const amount = parseFloat(value)
        if (!Number.isNaN(amount) && amount >= 0) {
            onSubmit(amount)
        }
    }

    return (
        <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Amount (£)</label>
                        <Input
                            type="number"
                            min={0}
                            step="0.01"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
