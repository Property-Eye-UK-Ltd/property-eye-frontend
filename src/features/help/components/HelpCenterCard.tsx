import * as Icons from "iconsax-react"
import { Link } from "react-router-dom"

interface HelpCenterCardProps {
    icon: string
    title: string
    description: string
    link: string
}

export const HelpCenterCard = ({ icon, title, description, link }: HelpCenterCardProps) => {
    const IconComponent = (Icons as any)[icon] || Icons.InfoCircle

    return (
        <Link
            to={link}
            className="block h-full rounded-xl bg-muted p-3 transition-colors hover:bg-muted/80 sm:rounded-2xl sm:p-5 lg:p-6"
        >
            <div className="flex h-full flex-col space-y-2 sm:space-y-3 lg:space-y-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00072C0D] sm:h-11 sm:w-11 lg:h-12 lg:w-12">
                    <IconComponent size={20} variant="Outline" style={{ color: "var(--progress)" }} />
                </div>

                <div className="min-w-0 flex-1 space-y-0.5 sm:space-y-1.5 lg:space-y-2">
                    <h3 className="text-[11px] font-medium leading-tight text-foreground sm:text-base">
                        {title}
                    </h3>
                    <p className="line-clamp-2 text-[10px] leading-snug text-muted-foreground sm:line-clamp-none sm:text-sm sm:leading-relaxed">
                        {description}
                    </p>
                </div>

                <span className="inline-block text-[10px] font-normal text-progress sm:text-sm">
                    Read more
                </span>
            </div>
        </Link>
    )
}
