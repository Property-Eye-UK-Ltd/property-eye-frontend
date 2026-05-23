import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { Button } from "@/components/ui/button"
import { useParams } from "react-router-dom"
import { helpCenterCards } from "@/data/help-center-data"

const helpCtaClass =
    "h-9 rounded-full bg-primary px-4 text-sm hover:bg-primary/90 lg:h-10 lg:px-6"

const HelpArticle = () => {
    const { articleId } = useParams()

    const handleContactUs = () => {
        console.log("Contact Us clicked")
    }

    const matchedCard = helpCenterCards.find((card) => card.link.endsWith(articleId || ""))
    const title = matchedCard?.title || "Getting Started"
    const description =
        matchedCard?.description ||
        "Learn how to login, setup your account, and navigate the main features."

    const article = {
        title,
        lastModified: "Jan 2025",
        description,
        sections: [
            {
                title: "Creating an Account",
                content: [
                    "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
                    "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
                ],
                steps: [
                    "Sorem ipsum dolor sit amet",
                    "Sorem ipsum dolor sit amet",
                    "Sorem ipsum dolor sit amet",
                    "Sorem ipsum dolor sit amet",
                ],
            },
            {
                title: "Logging In",
                content: [
                    "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
                    "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
                ],
                steps: [
                    "Sorem ipsum dolor sit amet",
                    "Sorem ipsum dolor sit amet",
                    "Sorem ipsum dolor sit amet",
                    "Sorem ipsum dolor sit amet",
                ],
            },
            {
                title: "Dashboard Overview",
                content: [
                    "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
                    "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
                    "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
                    "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
                ],
            },
        ],
    }

    return (
        <DashboardLayout>
            <DynamicPageHeader
                title={article.title}
                breadcrumbs={[
                    { label: "Help Center", href: "/dashboard/help" },
                    { label: article.title },
                ]}
                actions={
                    <Button onClick={handleContactUs} className={helpCtaClass}>
                        Contact Us
                    </Button>
                }
            />
            <DashboardPageContent className="space-y-4 lg:space-y-6">
                <div className="rounded-xl bg-primary px-4 py-6 text-center sm:rounded-2xl sm:px-6 sm:py-8 lg:p-10">
                    <p className="mb-2 text-[10px] text-white/70 sm:mb-3 sm:text-xs lg:text-sm">
                        Last modified: {article.lastModified}
                    </p>
                    <h1 className="mb-2 text-xl font-medium leading-tight text-white sm:mb-3 sm:text-2xl lg:mb-4 lg:text-4xl">
                        {article.title}
                    </h1>
                    <p className="mx-auto max-w-2xl text-xs leading-relaxed text-white/90 sm:text-sm lg:text-base">
                        {article.description}
                    </p>
                </div>

                <div className="space-y-5 sm:space-y-6 lg:space-y-8">
                    {article.sections.map((section, index) => (
                        <div key={index} className="space-y-2 sm:space-y-3 lg:space-y-4">
                            <h2 className="text-base font-medium text-foreground sm:text-lg lg:text-xl">
                                {section.title}
                            </h2>

                            {section.content.map((paragraph, pIndex) => (
                                <p
                                    key={pIndex}
                                    className="text-xs leading-relaxed text-muted-foreground sm:text-sm"
                                >
                                    {paragraph}
                                </p>
                            ))}

                            {section.steps && (
                                <ol className="ml-3 list-decimal space-y-1 sm:ml-4 sm:space-y-1.5">
                                    {section.steps.map((step, sIndex) => (
                                        <li
                                            key={sIndex}
                                            className="text-xs text-muted-foreground sm:text-sm"
                                        >
                                            {step}
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </div>
                    ))}
                </div>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default HelpArticle
