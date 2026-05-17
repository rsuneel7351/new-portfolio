import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolio";

export const Hero = () => {
    const { status, subtitle, highlight, tags, primaryAction, secondaryAction } = portfolioData.hero;

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden grid-bg" id="hero">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background"></div>
            <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/20 rounded-full blur-[120px] sm:blur-[160px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-secondary/15 rounded-full blur-[120px] sm:blur-[160px]"></div>
            
            <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 text-center w-full">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-surface-container border border-secondary/40 mb-6 sm:mb-8 relative"
                >
                    <div className="hud-tl"></div><div className="hud-tr"></div><div className="hud-bl"></div><div className="hud-br"></div>
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-tertiary shadow-[0_0_10px_#00ff9f]"></span>
                    <span className="text-[9px] sm:text-[10px] font-label uppercase tracking-[0.3em] text-secondary">{status}</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-headline font-black tracking-tighter text-white mb-6 sm:mb-8 leading-none flex flex-col sm:block" 
                >
                    <span className="glitch-text block sm:inline" data-text={subtitle}>{subtitle}</span>{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary text-glow-primary block sm:inline mt-1 sm:mt-0">{highlight}</span>
                </motion.h1>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
                >
                    <div className="h-px w-10 sm:w-20 bg-secondary/30"></div>
                    <p className="text-[10px] sm:text-xs md:text-base lg:text-xl text-on-surface-variant font-label font-light tracking-widest uppercase flex flex-wrap justify-center gap-1">
                        {tags.map((tag, idx) => (
                            <span key={idx} className="whitespace-nowrap">
                                <span className={`text-${tag.type} font-bold`}>{tag.text}</span>
                                {idx < tags.length - 1 && <span className="text-slate-600 ml-1">//</span>}
                            </span>
                        ))}
                    </p>
                    <div className="h-px w-10 sm:w-20 bg-secondary/30"></div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-xs sm:max-w-none mx-auto px-4"
                >
                    {/* Access Projects */}
                    <a className="px-6 py-4 md:px-8 md:py-5 bg-primary text-white font-headline text-xs sm:text-sm tracking-[0.2em] shadow-[0_0_30px_rgba(188,19,254,0.4)] hover:shadow-primary/60 transition-all border border-primary uppercase text-center cursor-pointer" href={primaryAction.href}>
                        {primaryAction.label}
                    </a>
                    
                    {/* View Resume - Cyan Glow */}
                    <a 
                        className="px-6 py-4 md:px-8 md:py-5 bg-transparent hover:bg-secondary hover:text-black text-secondary border border-secondary transition-all font-headline text-xs sm:text-sm tracking-[0.2em] uppercase text-center cursor-pointer neon-border-secondary flex items-center justify-center gap-2 font-bold" 
                        href="/suneel_kumar_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="material-symbols-outlined text-sm sm:text-base">download</span>
                        Download_Resume
                    </a>

                    {/* Contact Operator */}
                    <a className="px-6 py-4 md:px-8 md:py-5 glass-panel text-slate-400 hover:text-white font-headline text-xs sm:text-sm tracking-[0.2em] border border-white/20 hover:bg-white/5 transition-all uppercase text-center cursor-pointer" href={secondaryAction.href}>
                        {secondaryAction.label}
                    </a>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-16 sm:mt-20 flex flex-col items-center gap-2"
                >
                    <div className="tech-readout">SCROLL_TO_DESCEND</div>
                    <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-secondary to-transparent"></div>
                </motion.div>
            </div>
        </section>
    );
};
