export interface PropertyPartiesData {
  owner: string
  agency: string
  dateWithdrawn: string
  dateSold: string
  soldAmount: string
  soldTo: string
  landRegistry: {
    completionDate: string
    buyerName: string
  }
  transactionMetadata: {
    paymentDate: string
    amount: string
  }
}

interface PropertyPartiesPanelProps {
  data: PropertyPartiesData
}

export const PropertyPartiesPanel = ({ data }: PropertyPartiesPanelProps) => {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">Property & Parties</p>
          <div className="mt-4 grid gap-y-4 gap-x-12 md:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Owner</p>
              <p className="text-sm text-primary">{data.owner}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Agency</p>
              <p className="text-sm text-primary">{data.agency}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Date Withdrawn</p>
              <p className="text-sm text-primary">{data.dateWithdrawn}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Date Sold</p>
              <p className="text-sm text-primary">{data.dateSold}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Sold Amount</p>
              <p className="text-sm text-primary">{data.soldAmount}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Sold To (Buyer)</p>
              <p className="text-sm text-primary">{data.soldTo}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground mb-4">Land Registry</p>
          <div className="grid gap-y-4 gap-x-12 md:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Completion Date</p>
              <p className="text-sm text-primary">{data.landRegistry.completionDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Buyer Name</p>
              <p className="text-sm text-primary">{data.landRegistry.buyerName}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground mb-4">Transaction Metadata</p>
          <div className="grid gap-y-4 gap-x-12 md:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Payment Date</p>
              <p className="text-sm text-primary">{data.transactionMetadata.paymentDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Amount</p>
              <p className="text-sm text-primary">{data.transactionMetadata.amount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}