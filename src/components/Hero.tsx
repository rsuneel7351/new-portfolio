import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolio";

export const Hero = () => {
    const { status, title, subtitle, highlight, tags, primaryAction, secondaryAction } = portfolioData.hero;

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden grid-bg" id="hero">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background"></div>
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[160px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[160px]"></div>
            
            <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-4 px-4 py-2 bg-surface-container border border-secondary/40 mb-8 relative"
                >
                    <div className="hud-tl"></div><div className="hud-tr"></div><div className="hud-bl"></div><div className="hud-br"></div>
                    <span className="w-2 h-2 bg-tertiary shadow-[0_0_10px_#00ff9f]"></span>
                    <span className="text-[10px] font-label uppercase tracking-[0.3em] text-secondary">{status}</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-6xl md:text-9xl font-headline font-black tracking-tighter text-white mb-8 leading-none glitch-text" 
                    data-text={title}
                >
                    {subtitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary text-glow-primary">{highlight}</span>
                </motion.h1>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-4 mb-12"
                >
                    <div className="h-px w-20 bg-secondary/30"></div>
                    <p className="text-lg md:text-xl text-on-surface-variant font-label font-light tracking-widest uppercase">
                        {tags.map((tag, idx) => (
                            <span key={idx}>
                                <span className={`text-${tag.type} font-bold`}>{tag.text}</span>
                                {idx < tags.length - 1 && " // "}
                            </span>
                        ))}
                    </p>
                    <div className="h-px w-20 bg-secondary/30"></div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col md:flex-row gap-6 justify-center"
                >
                    <a className="px-10 py-5 bg-primary text-white font-headline text-sm tracking-[0.2em] shadow-[0_0_30px_rgba(188,19,254,0.4)] hover:shadow-primary/60 transition-all border border-primary uppercase" href={primaryAction.href}>
                        {primaryAction.label}
                    </a>
                    <a className="px-10 py-5 glass-panel text-secondary font-headline text-sm tracking-[0.2em] border border-secondary/50 hover:bg-secondary/10 transition-all uppercase" href={secondaryAction.href}>
                        {secondaryAction.label}
                    </a>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-20 flex flex-col items-center gap-2"
                >
                    <div className="tech-readout">SCROLL_TO_DESCEND</div>
                    <div className="w-px h-16 bg-gradient-to-b from-secondary to-transparent"></div>
                </motion.div>
            </div>
        </section>
    );
};
