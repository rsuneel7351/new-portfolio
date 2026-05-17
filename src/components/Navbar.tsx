import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data/portfolio";

export const Navbar = () => {
    const { logo, links, cta } = portfolioData.navbar;
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Close menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Subtle shadow on scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 bg-background/80 backdrop-blur-2xl border-b border-primary/20 transition-shadow duration-300 ${scrolled ? "shadow-md shadow-primary/10" : ""
                    }`}
            >
                <div className="flex justify-between items-center px-5 sm:px-8 py-4 max-w-7xl mx-auto">

                    {/* ── Logo ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-black tracking-[0.2em] text-primary font-headline flex items-center gap-2 select-none"
                    >
                        <span className="text-secondary">[</span>
                        {logo.replace("[", "").replace("]", "")}
                        <span className="text-secondary">]</span>
                    </motion.div>

                    {/* ── Desktop links ── */}
                    <div className="hidden md:flex gap-10 items-center">
                        {links.map((link, idx) => (
                            <motion.a
                                key={idx}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-slate-500 hover:text-secondary transition-colors font-label tracking-tighter text-sm uppercase"
                                href={link.href}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </div>

                    {/* ── Desktop CTA ── */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:block bg-primary hover:bg-white hover:text-primary border border-primary text-white px-6 py-2 font-headline text-xs tracking-widest transition-all duration-300 neon-border-primary"
                    >
                        {cta}
                    </motion.button>

                    {/* ── Hamburger button (mobile only) ── */}
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none"
                    >
                        <motion.span
                            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="block h-[2px] w-6 bg-primary origin-center"
                        />
                        <motion.span
                            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.2 }}
                            className="block h-[2px] w-6 bg-primary"
                        />
                        <motion.span
                            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="block h-[2px] w-6 bg-primary origin-center"
                        />
                    </button>
                </div>
            </nav>

            {/* ── Mobile drawer ── */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                            onClick={() => setMenuOpen(false)}
                        />

                        {/* Slide-down panel */}
                        <motion.div
                            key="mobile-menu"
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="fixed top-[65px] left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-2xl border-b border-primary/20 px-6 pt-6 pb-8 flex flex-col gap-6"
                        >
                            {/* Nav links */}
                            <div className="flex flex-col gap-1">
                                {links.map((link, idx) => (
                                    <motion.a
                                        key={idx}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.07 }}
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-slate-500 hover:text-secondary transition-colors font-label tracking-tighter text-sm uppercase py-3 border-b border-primary/10 last:border-0"
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}
                            </div>

                            {/* CTA */}
                            <motion.button
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: links.length * 0.07 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setMenuOpen(false)}
                                className="w-full bg-primary hover:bg-white hover:text-primary border border-primary text-white px-6 py-3 font-headline text-xs tracking-widest transition-all duration-300 neon-border-primary"
                            >
                                {cta}
                            </motion.button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};