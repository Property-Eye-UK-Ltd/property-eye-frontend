import { Profile } from "iconsax-react"
import { AgencyProfileData } from "@/data/agencyProfileData"

interface AgencyInformationCardProps {
    data: AgencyProfileData
}

export const AgencyInformationCard = ({ data }: AgencyInformationCardProps) => {
    return (
        <div className="rounded-2xl bg-white border border-border p-6 lg:sticky lg:top-4">
            <p className="text-xs text-muted-foreground mb-4">Agency Information</p>
            <div className="grid grid-cols-1 gap-4">
                {/* Agency Logo */}
                <div>
                    <p className="text-xs text-muted-foreground mb-1">Agency Logo</p>
                    {data.logo ? (
                        <img src={data.logo} alt={`${data.name} logo`} className="h-16 w-auto mt-2" />
                    ) : (
                        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mt-2">
                            <Profile size={32} variant="Bulk" className="text-gray-400" />
                        </div>
                    )}
                </div>

                {/* Agency Name */}
                <div>
                    <p className="text-xs text-muted-foreground mb-1">Agency Name</p>
                    <p className="text-sm text-primary">{data.name}</p>
                </div>

                {/* Agency Address */}
                <div>
                    <p className="text-xs text-muted-foreground mb-1">Agency Address</p>
                    <p className="text-sm text-primary">{data.address}</p>
                </div>

                {/* Email */}
                <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="text-sm text-primary">{data.email}</p>
                </div>

                {/* Phone Number */}
                <div>
                    <p className="text-xs text-muted-foreground mb-1">Phone Number</p>
                    <p className="text-sm text-primary">{data.phone}</p>
                </div>
            </div>
        </div>
    )
}
