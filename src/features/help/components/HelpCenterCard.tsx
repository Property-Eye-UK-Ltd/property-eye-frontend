import * as Icons from "iconsax-react"
import { Link } from "react-router-dom"

interface HelpCenterCardProps {
    icon: string
    title: string
    description: string
    link: string
}

export const HelpCenterCard = ({ icon, title, description, link }: HelpCenterCardProps) => {
    // Dynamically get the icon component
    const IconComponent = (Icons as any)[icon] || Icons.InfoCircle

    return (
        <Link to={link} className="block rounded-2xl bg-muted p-6 transition-colors hover:bg-muted/80">
            <div className="space-y-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-[#00072C0D] flex items-center justify-center">
                    <IconComponent size={24} variant="Outline" style={{ color: "var(--progress)" }} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <h3 className="text-base font-medium text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>

                {/* Read More Link */}
                <span
                    className="inline-block text-sm font-normal transition-colors"
                    style={{ color: "var(--progress)" }}
                >
                    Read more
                </span>
            </div>
        </Link>
    )
}
