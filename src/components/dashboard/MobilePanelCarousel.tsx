import { Children, ReactNode, useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { cn } from "@/lib/utils"

interface MobilePanelCarouselProps {
    children: ReactNode
    autoPlayMs?: number
    className?: string
    /** Tailwind breakpoint at which carousel is hidden (desktop layout takes over) */
    hideFrom?: "md" | "lg"
}

export const MobilePanelCarousel = ({
    children,
    autoPlayMs = 8000,
    className,
    hideFrom = "lg",
}: MobilePanelCarouselProps) => {
    const slides = Children.toArray(children)
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: slides.length > 1, align: "start" })
    const [selectedIndex, setSelectedIndex] = useState(0)

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on("select", onSelect)
        emblaApi.on("reInit", onSelect)
        return () => {
            emblaApi.off("select", onSelect)
            emblaApi.off("reInit", onSelect)
        }
    }, [emblaApi, onSelect])

    useEffect(() => {
        if (!emblaApi || slides.length <= 1 || autoPlayMs <= 0) return

        const interval = setInterval(() => {
            emblaApi.scrollNext()
        }, autoPlayMs)

        return () => clearInterval(interval)
    }, [emblaApi, slides.length, autoPlayMs])

    if (slides.length === 0) return null

    return (
        <div className={cn(hideFrom === "md" ? "md:hidden" : "lg:hidden", className)}>
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex touch-pan-y">
                    {slides.map((slide, index) => (
                        <div key={index} className="min-w-0 flex-[0_0_100%]">
                            {slide}
                        </div>
                    ))}
                </div>
            </div>
            {slides.length > 1 && (
                <div className="mt-3 flex items-center justify-center gap-1.5">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            aria-label={`Go to slide ${index + 1}`}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                selectedIndex === index
                                    ? "w-5 bg-primary"
                                    : "w-2 bg-primary/25 hover:bg-primary/40"
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

interface ResponsivePanelGroupProps {
    children: ReactNode
    className: string
    autoPlayMs?: number
}

/** Desktop: CSS grid. Mobile (&lt;lg): swipeable carousel with dots + autoplay. */
export const ResponsivePanelGroup = ({
    children,
    className,
    autoPlayMs = 8000,
}: ResponsivePanelGroupProps) => (
    <>
        <div className={cn(className, "hidden lg:grid")}>{children}</div>
        <MobilePanelCarousel autoPlayMs={autoPlayMs}>{children}</MobilePanelCarousel>
    </>
)
