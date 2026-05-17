import { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolio";

export const Skills = () => {
    const { label, title, description, loadingText, items } = portfolioData.skills;
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    return (
        <section className="py-32 bg-surface-container-low overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-secondary/5 blur-[160px] rounded-full"></div>
            
            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-secondary font-label text-xs uppercase tracking-[0.5em] block mb-4">{label}</span>
                        <h2 className="text-4xl md:text-5xl xl:text-6xl font-headline font-black text-white leading-none break-words sm:break-normal">{title}</h2>
                        <p className="text-on-surface-variant mt-10 text-xl font-body leading-relaxed">
                            {description}
                        </p>
                        <div className="mt-12 flex gap-4 tech-readout">
                            <span className="animate-pulse">{loadingText}</span>
                        </div>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {items.map((skill, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`glass-panel ${skill.theme === 'tertiary' ? 'border border-tertiary/40' : `neon-border-${skill.theme}`} group hover:bg-${skill.theme}/5 transition-all relative overflow-hidden`}
                                onMouseEnter={() => setHoveredIdx(idx)}
                                onMouseLeave={() => setHoveredIdx(null)}
                            >
                                <div className="p-8 relative z-10 h-full">
                                    <div className="hud-tl"></div><div className="hud-br"></div>
                                    <span className={`material-symbols-outlined text-${skill.theme} text-4xl mb-4 transition-transform group-hover:scale-110`}>{skill.icon}</span>
                                    <div className="font-headline font-bold text-lg tracking-widest text-white">{skill.name}</div>
                                    <div className="tech-readout mt-2">{skill.readout}</div>
                                </div>
                                
                                {hoveredIdx === idx && (
                                    <>
                                        <div className="p-8 absolute inset-0 text-primary opacity-60 z-20 pointer-events-none" style={{ left: '2px', textShadow: '-2px 0 #bc13fe', clip: 'rect(44px, 450px, 56px, 0)', animation: 'glitch-anim 0.3s infinite linear alternate-reverse' }}>
                                            <div className="hud-tl border-primary"></div><div className="hud-br border-primary"></div>
                                            <span className="material-symbols-outlined text-primary text-4xl mb-4 scale-110">{skill.icon}</span>
                                            <div className="font-headline font-bold text-lg tracking-widest text-primary">{skill.name}</div>
                                            <div className="tech-readout mt-2 text-primary">{skill.readout}</div>
                                        </div>
                                        <div className="p-8 absolute inset-0 text-secondary opacity-60 z-20 pointer-events-none" style={{ left: '-2px', textShadow: '-2px 0 #00f3ff', clip: 'rect(44px, 450px, 56px, 0)', animation: 'glitch-anim2 0.4s infinite linear alternate-reverse' }}>
                                            <div className="hud-tl border-secondary"></div><div className="hud-br border-secondary"></div>
                                            <span className="material-symbols-outlined text-secondary text-4xl mb-4 scale-110">{skill.icon}</span>
                                            <div className="font-headline font-bold text-lg tracking-widest text-secondary">{skill.name}</div>
                                            <div className="tech-readout mt-2 text-secondary">{skill.readout}</div>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
