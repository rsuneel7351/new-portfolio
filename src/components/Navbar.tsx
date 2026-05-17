import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolio";

export const Navbar = () => {
    const { logo, links, cta } = portfolioData.navbar;

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-2xl border-b border-primary/20">
            <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-black tracking-[0.2em] text-primary font-headline flex items-center gap-2"
                >
                    <span className="text-secondary">[</span>{logo.replace('[', '').replace(']', '')}<span className="text-secondary">]</span>
                </motion.div>
                
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
                
                <motion.button 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary hover:bg-white hover:text-primary border border-primary text-white px-6 py-2 font-headline text-xs tracking-widest transition-all duration-300 neon-border-primary"
                >
                    {cta}
                </motion.button>
            </div>
        </nav>
    );
};
