import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-primary py-24 text-white">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">

                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="inline-block">
                            <img
                                src="/favicon.ico"
                                alt="Property Eye Logo"
                                className="h-10 w-auto"
                            />
                        </Link>
                        <p className="text-white/60 text-sm max-w-[300px] leading-relaxed">
                            Protecting real estate agencies from commission fraud since 2021.
                        </p>
                    </div>

                    {/* Links Grid for Mobile */}
                    <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-12 md:contents">
                        {/* Product Links */}
                        <div>
                            <h4 className="text-white font-normal text-lg mb-6 md:mb-8 uppercase tracking-wider">Product</h4>
                            <ul className="space-y-4">
                                <li>
                                    <Link to="/pricing" className="text-white hover:text-white transition-colors text-sm">
                                        Pricing
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h4 className="text-white font-normal text-lg mb-6 md:mb-8 uppercase tracking-wider">Company</h4>
                            <ul className="space-y-4">
                                <li>
                                    <Link to="/about" className="text-white hover:text-white transition-colors text-sm">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-white hover:text-white transition-colors text-sm">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/faq" className="text-white hover:text-white transition-colors text-sm">
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal Links */}
                        <div>
                            <h4 className="text-white font-normal text-lg mb-6 md:mb-8 uppercase tracking-wider">Legal</h4>
                            <ul className="space-y-4">
                                <li>
                                    <Link to="/privacy-policy" className="text-white hover:text-white transition-colors text-sm">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/terms-and-conditions" className="text-white hover:text-white transition-colors text-sm">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/cookie-policy" className="text-white hover:text-white transition-colors text-sm">
                                        Cookie Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
