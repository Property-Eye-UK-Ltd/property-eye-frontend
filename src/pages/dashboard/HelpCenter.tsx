import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { HelpCenterCard } from "@/features/help/components/HelpCenterCard"
import { helpCenterCards } from "@/data/help-center-data"
import { Button } from "@/components/ui/button"

const HelpCenter = () => {
    const handleContactUs = () => {
        console.log("Contact Us clicked")
    }

    return (
        <DashboardLayout>
            <DynamicPageHeader
                title="Help Center"
                actions={
                    <Button
                        onClick={handleContactUs}
                        className="rounded-full bg-primary hover:bg-primary/90 px-6"
                    >
                        Contact Us
                    </Button>
                }
            />
            <div className="mx-auto w-full max-w-7xl px-6 py-6">
                <DashboardPanel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
        </DashboardLayout>
    )
}

export default HelpCenter
