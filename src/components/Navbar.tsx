import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "../data/portfolio";
import { ease } from "../lib/motion";

const plainLabel = (label: string) => label.replace("// ", "");

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

    const elevated = scrolled || menuOpen;

    return (
        <>
            <nav className="fixed top-3 inset-x-0 z-50 px-3">
                <div className={`relative max-w-7xl mx-auto grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-4 px-2 sm:px-5 min-[81.5rem]:px-8 py-2 border transition-colors duration-500 ${elevated ? "bg-background/80 backdrop-blur-md border-white/10" : "bg-transparent border-transparent"}`}>
                    <motion.a
                        href="#hero"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease }}
                        className="justify-self-start text-sm sm:text-base font-bold tracking-[0.1em] text-white font-headline flex items-center gap-1 select-none"
                    >
                        <span className="text-secondary">[</span>
                        {logo.replace("[", "").replace("]", "")}
                        <span className="text-secondary">]</span>
                    </motion.a>

                    <div className="hidden md:flex justify-self-end lg:justify-self-auto items-center gap-1">
                        {links.map((link, idx) => (
                            <motion.a
                                key={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.07, duration: 0.7, ease }}
                                aria-current={active === link.href ? "true" : undefined}
                                className={`relative isolate px-3 lg:px-4 py-2 font-label text-xs tracking-wider uppercase transition-colors duration-300 ${active === link.href ? "text-secondary" : "text-slate-400 hover:text-white"}`}
                                href={link.href}
                            >
                                {plainLabel(link.label)}
                                {active === link.href && (
                                    <motion.span
                                        layoutId="nav-active"
                                        className="absolute inset-0 -z-10 bg-secondary/10 border border-secondary/30"
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
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 320, damping: 24 }}
                        className="group hidden lg:inline-flex justify-self-end btn gap-2 px-4 py-2.5 text-[0.6875rem] text-white border border-primary/60 hover:bg-primary hover:border-primary"
                    >
                        {cta}
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </motion.a>

                    <button
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                        className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 cursor-pointer"
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

                    <motion.div style={{ scaleX: progress }} className="absolute bottom-[-1px] left-0 right-0 h-px origin-left bg-gradient-to-r from-primary via-secondary to-tertiary" />
                </div>
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
                            className="fixed top-[72px] inset-x-3 z-50 md:hidden bg-background border border-white/10 px-5 pt-2 pb-6 flex flex-col gap-5"
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
                                        {plainLabel(link.label)}
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
