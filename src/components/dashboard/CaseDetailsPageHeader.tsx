import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface CaseDetailsPageHeaderProps {
  caseId: string
  showCloseCase?: boolean
  onCloseCase?: () => void
}

export const CaseDetailsPageHeader = ({
  caseId,
  showCloseCase = false,
  onCloseCase,
}: CaseDetailsPageHeaderProps) => {
  return (
    <div className="bg-white w-full border-b border-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-medium text-foreground">Case Details</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/dashboard/cases">Case Management</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{caseId}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {showCloseCase && (
            <Button
              onClick={onCloseCase}
              className="rounded-full bg-primary text-white hover:text-white hover:bg-primary/70"
            >
              Close case
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
