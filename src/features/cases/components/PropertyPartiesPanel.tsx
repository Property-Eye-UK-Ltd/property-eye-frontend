import { DashboardPanel } from "@/components/dashboard/DashboardPanel"

export interface PropertyPartiesData {
  owner: string
  agent: string
  agency: string
  introducedBuyers: string[]
  landRegistry: {
    completionDate: string
    buyerName: string
  }
  transactionMetadata: {
    paymentDate: string
    recipient: string
    payer: string
    amount: string
  }
}

interface PropertyPartiesPanelProps {
  data: PropertyPartiesData
}

export const PropertyPartiesPanel = ({ data }: PropertyPartiesPanelProps) => {
  return (
    <DashboardPanel title="Property & Parties" hasBorder>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="pb-4 border-b border-border">
            <p className="text-xs text-muted-foreground mb-1">Owner</p>
            <p className="text-sm font-medium text-foreground">{data.owner}</p>
          </div>
          <div className="pb-4 border-b border-border">
            <p className="text-xs text-muted-foreground mb-1">Agent</p>
            <p className="text-sm font-medium text-foreground">{data.agent}</p>
          </div>
          <div className="pb-4 border-b border-border">
            <p className="text-xs text-muted-foreground mb-1">Agency</p>
            <p className="text-sm font-medium text-foreground">{data.agency}</p>
          </div>
          <div className="pb-4 border-b border-border">
            <p className="text-xs text-muted-foreground mb-1">Introduced Buyers</p>
            <div className="flex flex-wrap gap-2">
              {data.introducedBuyers.map((buyer, index) => (
                <p key={index} className="text-sm font-medium text-foreground">
                  {buyer}
                  {index < data.introducedBuyers.length - 1 && ","}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="pb-4 border-b border-border">
            <p className="text-xs text-muted-foreground mb-2">Land Registry</p>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Completion Date</p>
                <p className="text-sm font-medium text-foreground">{data.landRegistry.completionDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Buyer Name</p>
                <p className="text-sm font-medium text-foreground">{data.landRegistry.buyerName}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Transaction Metadata</p>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Payment Date</p>
                <p className="text-sm font-medium text-foreground">{data.transactionMetadata.paymentDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Recipient</p>
                <p className="text-sm font-medium text-foreground">{data.transactionMetadata.recipient}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Payer</p>
                <p className="text-sm font-medium text-foreground">{data.transactionMetadata.payer}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Amount</p>
                <p className="text-sm font-medium text-foreground">{data.transactionMetadata.amount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardPanel>
  )
}

