import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HambergerMenu, CloseCircle } from "iconsax-react";
import { cn } from "@/lib/utils";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Pricing", href: "/pricing" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/faq" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-sm",
                isScrolled ? "py-3" : "py-5"
            )}
        >
            <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img
                        src="/assets/logo-dark.png"
                        alt="Property Eye Logo"
                        className="h-10 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.href;
                        return (
                            <Link
                                key={link.label}
                                to={link.href}
                                className={cn(
                                    "text-primary/40 hover:text-primary font-normal text-sm transition-colors",
                                    isActive && "font-semibold text-primary"
                                )}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden lg:block">
                    <Link to="/request-demo">
                        <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-10 text-sm font-normal">
                            Request a Demo
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-primary"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <CloseCircle size={32} variant="TwoTone" />
                    ) : (
                        <HambergerMenu size={32} variant="Outline" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    "lg:hidden fixed inset-x-0 top-[63px] bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden",
                    isMenuOpen ? "max-h-screen py-6 opacity-100" : "max-h-0 py-0 opacity-0"
                )}
            >
                <div className="container mx-auto px-6 flex flex-col items-center space-y-4">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.href;
                        return (
                            <Link
                                key={link.label}
                                to={link.href}
                                className={cn(
                                    "font-normal text-lg py-3 px-8 rounded-xl transition-all w-full text-center max-w-xs",
                                    isActive
                                        ? "text-primary bg-gray-100 font-medium"
                                        : "text-primary/50 hover:text-primary"
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    <Link to="/request-demo" className="w-full max-w-xs" onClick={() => setIsMenuOpen(false)}>
                        <Button className="bg-primary hover:bg-primary/90 text-white rounded-full w-full h-12 font-normal mt-4">
                            Request a Demo
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
