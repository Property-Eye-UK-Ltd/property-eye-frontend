import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";

const CookieConsentBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem("cookie-consent", "rejected");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <>
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-in-up">
                <div className="mx-auto max-w-7xl">
                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[#00072C]/95 text-white border border-white/10 shadow-2xl backdrop-blur-md">
                        <div className="flex items-start gap-4 flex-1">
                            <div className="p-3 bg-[#FFBD09]/10 rounded-xl text-[#FFBD09] shrink-0">
                                <Cookie className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-base font-semibold text-white">We Value Your Privacy</h4>
                                <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-3xl">
                                    Property Eye uses cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our{" "}
                                    <Link to="/cookie-policy" className="text-[#FFBD09] hover:underline font-medium">
                                        Cookie Policy
                                    </Link>{" "}
                                    for details.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 text-xs md:text-sm font-medium rounded-lg text-white/80 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                Reject Non-Essential
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="px-5 py-2 text-xs md:text-sm font-semibold rounded-lg bg-[#FFBD09] text-[#00072C] hover:bg-[#FFBD09]/90 transition-colors"
                            >
                                Accept All
                            </button>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute top-4 right-4 md:static p-1 text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                                aria-label="Close banner"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CookieConsentBanner;
