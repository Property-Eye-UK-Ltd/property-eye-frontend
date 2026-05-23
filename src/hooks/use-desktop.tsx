import * as React from "react"

/** Matches Tailwind `lg` — persistent sidebar layout */
export const DESKTOP_BREAKPOINT = 1024

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
    const onChange = () => setIsDesktop(mql.matches)
    mql.addEventListener("change", onChange)
    setIsDesktop(mql.matches)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isDesktop ?? false
}
