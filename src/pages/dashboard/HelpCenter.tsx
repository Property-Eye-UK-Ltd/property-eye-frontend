import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { HelpCenterCard } from "@/features/help/components/HelpCenterCard"
import { helpCenterCards } from "@/data/help-center-data"
import { Button } from "@/components/ui/button"

const helpCtaClass =
    "h-9 rounded-full bg-primary px-4 text-sm hover:bg-primary/90 lg:h-10 lg:px-6"

const HelpCenter = () => {
    const handleContactUs = () => {
        console.log("Contact Us clicked")
    }

    return (
        <DashboardLayout>
            <DynamicPageHeader
                title="Help Center"
                actions={
                    <Button onClick={handleContactUs} className={helpCtaClass}>
                        Contact Us
                    </Button>
                }
            />
            <DashboardPageContent className="space-y-3 lg:space-y-4">
                <DashboardPanel compactContent>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3 lg:gap-4">
                        {helpCenterCards.map((card) => (
                            <HelpCenterCard
                                key={card.id}
                                icon={card.icon}
                                title={card.title}
                                description={card.description}
                                link={card.link}
                            />
                        ))}
                    </div>
                </DashboardPanel>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default HelpCenter
