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
}

interface PropertyPartiesPanelProps {
  data: PropertyPartiesData
  /** Agency portal hides financial / strength signals */
  variant?: "agency" | "default"
}

const fieldLabel = "mb-0.5 text-xs text-muted-foreground"
const fieldValue = "text-xs text-primary sm:text-sm"

export const PropertyPartiesPanel = ({ data, variant = "default" }: PropertyPartiesPanelProps) => {
  const hideFinancialFields = variant === "agency"
  return (
    <div className="rounded-2xl border border-border bg-white p-3 shadow-sm sm:p-4 lg:p-6">
      <div className="space-y-4 sm:space-y-6">
        <div>
          <p className="text-xs text-muted-foreground sm:text-sm">Property & Parties</p>
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3 sm:mt-4 sm:gap-x-6 sm:gap-y-4 md:gap-x-12 lg:grid-cols-2">
            <div>
              <p className={fieldLabel}>Owner</p>
              <p className={fieldValue}>{data.owner}</p>
            </div>
            <div>
              <p className={fieldLabel}>Agency</p>
              <p className={fieldValue}>{data.agency}</p>
            </div>
            <div>
              <p className={fieldLabel}>Date Withdrawn</p>
              <p className={fieldValue}>{data.dateWithdrawn}</p>
            </div>
            <div>
              <p className={fieldLabel}>Date Sold</p>
              <p className={fieldValue}>{data.dateSold}</p>
            </div>
            {!hideFinancialFields && (
              <div>
                <p className={fieldLabel}>Sold Amount</p>
                <p className={fieldValue}>{data.soldAmount}</p>
              </div>
            )}
            <div>
              <p className={fieldLabel}>Sold To (Buyer)</p>
              <p className={fieldValue}>{data.soldTo}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4 sm:pt-6">
          <p className={`${fieldLabel} mb-3 sm:mb-4`}>Land Registry</p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:gap-x-6 sm:gap-y-4 md:gap-x-12">
            <div>
              <p className={fieldLabel}>Completion Date</p>
              <p className={fieldValue}>{data.landRegistry.completionDate}</p>
            </div>
            <div>
              <p className={fieldLabel}>Buyer Name</p>
              <p className={fieldValue}>{data.landRegistry.buyerName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
