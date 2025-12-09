import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { Button } from "@/components/ui/button"
import { useParams, useNavigate } from "react-router-dom"
import { helpCenterCards } from "@/data/help-center-data"

const HelpArticle = () => {
    const { articleId } = useParams()
    const navigate = useNavigate()

    const handleContactUs = () => {
        console.log("Contact Us clicked")
    }

    // Find the card data based on the URL
    const matchedCard = helpCenterCards.find((card) => card.link.endsWith(articleId || ""))
    const title = matchedCard?.title || "Getting Started"
    const description = matchedCard?.description || "Learn how to login, setup your account, and navigate the main features."

    // Mock content - keep sections static for now as we don't have separate content per article
    const article = {
        title: title,
        lastModified: "Jan 2025",
        description: description,
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
                    <Button
                        onClick={handleContactUs}
                        className="rounded-full bg-primary hover:bg-primary/90 px-6"
                    >
                        Contact Us
                    </Button>
                }
            />
            <div className="mx-auto w-full max-w-7xl px-6 py-6">
                {/* Hero Section */}
                <div className="bg-primary rounded-2xl p-12 text-center mb-8">
                    <p className="text-sm text-white/70 mb-4">Last modified: {article.lastModified}</p>
                    <h1 className="text-4xl font-medium text-white mb-4">{article.title}</h1>
                    <p className="text-white/90 max-w-2xl mx-auto">{article.description}</p>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {article.sections.map((section, index) => (
                        <div key={index} className="space-y-4">
                            <h2 className="text-xl font-medium text-foreground">{section.title}</h2>

                            {section.content.map((paragraph, pIndex) => (
                                <p key={pIndex} className="text-sm text-muted-foreground leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}

                            {section.steps && (
                                <ol className="space-y-2 ml-4">
                                    {section.steps.map((step, sIndex) => (
                                        <li key={sIndex} className="text-sm text-muted-foreground">
                                            {sIndex + 1}. {step}
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default HelpArticle
