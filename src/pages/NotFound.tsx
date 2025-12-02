import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const NotFound = () => {
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted relative overflow-hidden">
      {/* Large 404 Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[600px] font-medium text-gray-200 select-none leading-none">
          404
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 px-4">
        {/* Eyebrow */}
        <div className="inline-block px-4 py-1.5 bg-progress/10 rounded-full">
          <span className="text-xs font-normal text-foreground uppercase tracking-wide">
            ERROR 404
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-medium text-foreground">
          Oops! Page not found.
        </h1>

        {/* Description */}
        <p className="text-base text-muted-foreground max-w-md mx-auto">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist anymore.
        </p>

        {/* CTA Button */}
        <Button
          onClick={handleBackToHome}
          className="rounded-full bg-primary hover:bg-primary/90 px-8 py-6 text-base font-medium mt-4"
        >
          Back to Homepage
        </Button>
      </div>
    </div>
  )
}

export default NotFound
