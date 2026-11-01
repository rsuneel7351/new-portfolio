import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { portfolioData } from "../data/portfolio";
import { ease } from "../lib/motion";

export const Navbar = () => {
    const { logo, links, cta } = portfolioData.navbar;
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState(links[0].href);

    const { scrollY, scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 });

    useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

    // Highlights whichever section crosses the middle of the viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(`#${entry.target.id}`);
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );

        links.forEach((link) => {
            const section = document.querySelector(link.href);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, [links]);

    // Close menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 border-b transition-colors duration-500 ${scrolled || menuOpen ? "bg-background/85 backdrop-blur-md border-primary/20" : "bg-transparent border-transparent"}`}>
                <div className="flex justify-between items-center px-5 sm:px-8 py-4 max-w-7xl mx-auto">
                    <motion.a
                        href="#hero"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease }}
                        className="text-sm sm:text-lg font-black tracking-[0.18em] text-[#d98bff] font-headline flex items-center gap-1.5 select-none"
                    >
                        <span className="text-secondary">[</span>
                        {logo.replace("[", "").replace("]", "")}
                        <span className="text-secondary">]</span>
                    </motion.a>

                    <div className="hidden md:flex gap-8 items-center">
                        {links.map((link, idx) => (
                            <motion.a
                                key={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.07, duration: 0.7, ease }}
                                aria-current={active === link.href ? "true" : undefined}
                                className={`relative py-1 font-label text-xs tracking-tight uppercase transition-colors duration-300 ${active === link.href ? "text-secondary" : "text-slate-400 hover:text-white"}`}
                                href={link.href}
                            >
                                {link.label}
                                {active === link.href && (
                                    <motion.span
                                        layoutId="nav-active"
                                        className="absolute -bottom-1 left-0 right-0 h-px bg-secondary"
                                        transition={{ type: "spring", stiffness: 380, damping: 36 }}
                                    />
                                )}
                            </motion.a>
                        ))}
                    </div>

                    <motion.a
                        href="#contact"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 320, damping: 24 }}
                        className="hidden md:inline-flex btn btn-primary px-5 py-2.5 text-[0.6875rem]"
                    >
                        {cta}
                    </motion.a>

                    <button
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                        className="md:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 -mr-2 cursor-pointer"
                    >
                        <motion.span
                            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.35, ease }}
                            className="block h-[2px] w-6 bg-secondary origin-center"
                        />
                        <motion.span
                            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.25, ease }}
                            className="block h-[2px] w-6 bg-secondary"
                        />
                        <motion.span
                            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.35, ease }}
                            className="block h-[2px] w-6 bg-secondary origin-center"
                        />
                    </button>
                </div>

                <motion.div style={{ scaleX: progress }} className="absolute bottom-[-1px] left-0 right-0 h-px origin-left bg-gradient-to-r from-primary via-secondary to-tertiary" />
            </nav>

            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-40 bg-black/60 md:hidden"
                            onClick={() => setMenuOpen(false)}
                        />

                        <motion.div
                            key="mobile-menu"
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.4, ease }}
                            className="fixed top-[77px] left-0 right-0 z-50 md:hidden bg-background border-b border-primary/20 px-6 pt-4 pb-8 flex flex-col gap-6"
                        >
                            <div className="flex flex-col">
                                {links.map((link, idx) => (
                                    <motion.a
                                        key={link.href}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05, duration: 0.5, ease }}
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className={`font-label text-sm uppercase py-4 border-b border-primary/10 last:border-0 ${active === link.href ? "text-secondary" : "text-slate-300"}`}
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}
                            </div>

                            <a href="#contact" onClick={() => setMenuOpen(false)} className="btn btn-primary w-full">
                                {cta}
                            </a>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
