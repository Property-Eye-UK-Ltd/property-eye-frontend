import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { StaffMember, staffStatusStyles } from "@/data/teamManagementData"
import { Profile } from "iconsax-react"

interface StaffInformationCardProps {
    staff: Partial<StaffMember> & { profileImage?: string }
}

export const StaffInformationCard = ({ staff }: StaffInformationCardProps) => {
    return (
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <p className="text-sm text-muted-foreground mb-6">Staff Information</p>

            <div className="space-y-6">
                {/* Profile Image */}
                <div>
                    <p className="text-xs text-muted-foreground mb-2">Profile Image</p>
                    <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {staff.profileImage ? (
                            <img src={staff.profileImage} alt={staff.name} className="h-full w-full object-cover" />
                        ) : (
                            <Profile size={40} variant="Bulk" className="text-gray-400" />
                        )}
                    </div>
                </div>

                {/* Staff Name */}
                <div>
                    <p className="text-xs text-muted-foreground mb-1">Staff Name</p>
                    <p className="text-sm font-medium text-foreground">{staff.name}</p>
                </div>

                {/* Email Address */}
                <div>
                    <p className="text-xs text-muted-foreground mb-1">Email Address</p>
                    <p className="text-sm text-foreground">{staff.email}</p>
                </div>

                {/* Role */}
                <div>
                    <p className="text-xs text-muted-foreground mb-1">Role</p>
                    <p className="text-sm text-foreground">{staff.role}</p>
                </div>

                {/* Last Active Date */}
                <div>
                    <p className="text-xs text-muted-foreground mb-1">Last Active Date</p>
                    <p className="text-sm text-foreground">{staff.lastActiveDate}</p>
                </div>

                {/* Status */}
                <div>
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    {staff.status && (
                        <Badge className={cn("rounded-full px-3 py-1 text-xs font-normal", staffStatusStyles[staff.status])}>
                            {staff.status}
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    )
}
