import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useIsDesktop } from "@/hooks/use-desktop"

interface SidebarContextType {
    isCollapsed: boolean
    setIsCollapsed: (collapsed: boolean) => void
    isMobileNavOpen: boolean
    setIsMobileNavOpen: (open: boolean) => void
    isDesktop: boolean
    toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    const isDesktop = useIsDesktop()
    const location = useLocation()

    useEffect(() => {
        setIsMobileNavOpen(false)
    }, [location.pathname])

    useEffect(() => {
        if (isDesktop) {
            setIsMobileNavOpen(false)
        }
    }, [isDesktop])

    const toggleSidebar = () => {
        if (isDesktop) {
            setIsCollapsed((prev) => !prev)
        } else {
            setIsMobileNavOpen((prev) => !prev)
        }
    }

    return (
        <SidebarContext.Provider
            value={{
                isCollapsed,
                setIsCollapsed,
                isMobileNavOpen,
                setIsMobileNavOpen,
                isDesktop,
                toggleSidebar,
            }}
        >
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebarContext = () => {
    const context = useContext(SidebarContext)
    if (context === undefined) {
        throw new Error("useSidebarContext must be used within a SidebarProvider")
    }
    return context
}
