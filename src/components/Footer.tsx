import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolio";
import { reveal, viewport } from "../lib/motion";

export const Footer = () => {
    const { logoPrefix, logoSuffix, copyright, tagline, links } = portfolioData.footer;

    return (
        <footer className="relative w-full pt-16 pb-10 border-t border-primary/20 bg-surface-container-lowest/70">
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <motion.div
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                    className="font-headline font-black tracking-tight text-[clamp(2.5rem,11vw,9rem)] leading-none text-[#d98bff]"
                >
                    {logoPrefix}<span className="text-secondary">{logoSuffix}</span>
                </motion.div>

                <div className="mt-10 flex flex-col md:flex-row justify-between md:items-end gap-8">
                    <div>
                        <p className="text-slate-400 font-label text-[0.6875rem] uppercase tracking-[0.2em] mb-2">{copyright}</p>
                        <p className="text-secondary/80 font-label text-[0.6875rem] uppercase tracking-[0.14em]">{tagline}</p>
                    </div>

                    <div className="flex gap-8">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                className="link-line pb-1 text-slate-400 hover:text-white font-label text-xs uppercase tracking-widest"
                                href={link.href}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
