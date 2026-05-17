import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data/portfolio";

export const Navbar = () => {
    const { logo, links, cta } = portfolioData.navbar;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-2xl border-b border-primary/20">
            <div className="flex justify-between items-center px-6 xs:px-10 sm:px-8 py-4 max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black tracking-[0.05em] xs:tracking-[0.1em] sm:tracking-[0.2em] text-primary font-headline flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
                >
                    <span className="text-secondary">[</span>{logo.replace('[', '').replace(']', '')}<span className="text-secondary">]</span>
                </motion.div>
                
                {/* Desktop Links */}
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
                
                {/* Desktop CTA & Mobile Toggle Row */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Resume Button - Cyan Glow */}
                    <motion.a 
                        href="/suneel_kumar_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden xs:flex items-center gap-1.5 bg-transparent hover:bg-secondary hover:text-black border border-secondary text-secondary px-4 py-2 font-headline text-[10px] sm:text-xs tracking-widest transition-all duration-300 neon-border-secondary cursor-pointer uppercase font-bold"
                    >
                        <span className="material-symbols-outlined text-sm">download</span>
                        RESUME
                    </motion.a>

                    {/* Primary CTA button */}
                    <motion.button 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden sm:block bg-primary hover:bg-white hover:text-primary border border-primary text-white px-5 py-2 font-headline text-xs tracking-widest transition-all duration-300 neon-border-primary cursor-pointer"
                        onClick={() => window.location.href = "#contact"}
                    >
                        {cta}
                    </motion.button>

                    {/* Mobile Hamburger Toggle */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className={`md:hidden text-secondary p-2 focus:outline-none relative flex items-center justify-center border border-secondary/40 hover:bg-secondary/10 cursor-pointer ${isOpen ? 'z-[70]' : 'z-50'}`}
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-xl sm:text-2xl">
                            {isOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Drawer Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Dark backdrop overlay that covers page content behind menu */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 w-full h-[100dvh] bg-black/80 backdrop-blur-md z-40 md:hidden cursor-pointer"
                        />

                        {/* Opaque cyberpunk menu drawer panel - guaranteed 100% height and scrollable if low resolution */}
                        <motion.div 
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", bounce: 0.05, duration: 0.4 }}
                            className="fixed top-0 bottom-0 right-0 w-[80vw] sm:w-[60vw] h-[100dvh] overflow-y-auto bg-[#050a14] z-50 border-l border-primary/20 p-10 sm:p-12 flex flex-col pt-32 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
                        >
                            <div className="hud-tl"></div><div className="hud-bl"></div>
                            <div className="flex flex-col gap-5 sm:gap-6">
                                {links.map((link, idx) => (
                                    <a 
                                        key={idx}
                                        className="text-slate-400 hover:text-secondary transition-colors font-headline text-base sm:text-lg tracking-[0.2em] uppercase py-2.5 sm:py-3 border-b border-white/5" 
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                            <div className="mt-auto pt-10 flex flex-col gap-4">
                                <div className="tech-readout opacity-50 mb-2">UPLINK_READY // SUNEEL.SYS</div>
                                
                                {/* Mobile Resume Link */}
                                <a 
                                    href="/suneel_kumar_resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 bg-transparent hover:bg-secondary hover:text-black border border-secondary text-secondary font-headline text-xs tracking-widest transition-all duration-300 neon-border-secondary cursor-pointer text-center uppercase flex items-center justify-center gap-2 font-bold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="material-symbols-outlined text-sm">download</span> Download Resume
                                </a>

                                <button 
                                    onClick={() => {
                                        setIsOpen(false);
                                        window.location.href = "#contact";
                                    }}
                                    className="w-full py-4 bg-primary hover:bg-white hover:text-primary border border-primary text-white font-headline text-xs tracking-widest transition-all duration-300 neon-border-primary cursor-pointer"
                                >
                                    {cta}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};
