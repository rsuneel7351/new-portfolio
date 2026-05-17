import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { portfolioData } from "../data/portfolio";

export const Projects = () => {
    const { label, title, readout, items } = portfolioData.projects;
    const targetRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const x = useTransform(smoothProgress, [0, 1], ["0%", `-${((items.length - 1) * 100) / items.length}%`]);

    return (
        <section ref={targetRef} className="relative bg-surface-container-low" id="projects">
            
            {/* Desktop Horizontal Scroll Layout */}
            <div className="hidden md:block h-[300vh]">
                <div className="sticky top-0 h-screen flex flex-col overflow-hidden pt-32">
                    <div className="w-full max-w-7xl mx-auto px-8 mb-10 shrink-0">
                        <div className="flex justify-between items-end">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-tertiary font-label text-xs uppercase tracking-[0.5em] block mb-4">{label}</span>
                                <h2 className="text-5xl font-headline font-black text-white">{title}</h2>
                            </motion.div>
                            <div className="tech-readout text-right whitespace-pre-line">
                                {readout}
                            </div>
                        </div>
                    </div>

                    {/* Animated horizontal track */}
                    <motion.div style={{ x }} className="flex gap-8 px-8 pb-32 h-full items-start w-max">
                        {items.map((project, idx) => (
                            <div 
                                key={idx}
                                className={`w-[85vw] md:w-[70vw] lg:w-[60vw] max-w-[1000px] h-[75%] max-h-[600px] flex-shrink-0 bg-black relative group overflow-hidden ${project.theme === 'tertiary' ? 'border border-tertiary/30' : `neon-border-${project.theme}`}`}
                            >
                                <div className="hud-tl"></div><div className="hud-tr"></div><div className="hud-bl"></div><div className="hud-br"></div>
                                
                                <img 
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 opacity-30 group-hover:opacity-60 saturate-0 group-hover:saturate-100 absolute inset-0" 
                                    src={project.image} 
                                    alt={project.title}
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-10 md:p-12 flex flex-col justify-end pointer-events-none">
                                    <div className="pointer-events-auto">
                                        {project.log && <div className="tech-readout mb-4">{project.log}</div>}
                                        {project.tags && !project.log && (
                                            <div className="flex flex-wrap gap-4 mb-6">
                                                {project.tags.map((tag, tIdx) => (
                                                    <span key={tIdx} className={`px-4 py-1 border border-${tag.theme} text-${tag.theme} text-[10px] font-label uppercase tracking-widest bg-${tag.theme}/10`}>
                                                        {tag.label}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex items-start gap-4 mb-4">
                                            <h3 className={`text-4xl md:text-5xl lg:text-6xl ${project.titleGlow ? `text-glow-${project.titleGlow}` : ''} font-headline font-black tracking-tighter text-white`}>
                                                {project.title}
                                            </h3>
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className={`opacity-60 hover:opacity-100 transition-opacity text-${project.theme || 'primary'} mt-2`} aria-label={`Open ${project.title} in new tab`}>
                                                    <span className="material-symbols-outlined text-3xl md:text-4xl">open_in_new</span>
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-on-surface-variant max-w-2xl text-sm md:text-base leading-relaxed mb-8 font-body">
                                            {project.description}
                                        </p>
                                        
                                        {project.metrics && (
                                            <div className="flex flex-wrap items-center gap-10">
                                                {project.metrics.map((metric, mIdx) => (
                                                    <div key={mIdx} className="space-y-1">
                                                        <span className={`block text-3xl font-black text-${metric.theme} font-headline`}>{metric.value}</span>
                                                        <span className={`text-[8px] font-label text-${metric.theme === 'primary' ? 'secondary' : 'primary'} uppercase tracking-widest`}>{metric.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {project.features && (
                                            <div className="flex flex-wrap gap-8">
                                                {project.features.map((feature, fIdx) => (
                                                    <span key={fIdx} className={`flex items-center gap-3 text-${feature.theme} font-label text-sm uppercase tracking-widest`}>
                                                        <span className="material-symbols-outlined">{feature.icon}</span> {feature.label}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        
                                        {project.tags && project.log && (
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {project.tags.map((tag, tIdx) => (
                                                    <span key={tIdx} className="px-2 py-1 bg-surface-container border border-white/10 text-white text-[9px] font-label">
                                                        {tag.label}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Mobile Vertical Stack Layout */}
            <div className="md:hidden py-24 px-6 border-t border-secondary/10 flex flex-col gap-10">
                <div className="mb-4">
                    <span className="text-tertiary font-label text-xs uppercase tracking-[0.5em] block mb-2">{label}</span>
                    <h2 className="text-4xl font-headline font-black text-white">{title}</h2>
                </div>
                <div className="flex flex-col gap-8 w-full">
                    {items.map((project, idx) => (
                        <div 
                            key={idx}
                            className={`w-full min-h-[380px] bg-black relative group overflow-hidden ${project.theme === 'tertiary' ? 'border border-tertiary/30' : `neon-border-${project.theme}`}`}
                        >
                            <div className="hud-tl"></div><div className="hud-tr"></div><div className="hud-bl"></div><div className="hud-br"></div>
                            
                            <img 
                                className="w-full h-full object-cover transition-all duration-1000 opacity-25 absolute inset-0" 
                                src={project.image} 
                                alt={project.title}
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 flex flex-col justify-end">
                                <div>
                                    {project.log && <div className="tech-readout mb-3">{project.log}</div>}
                                    {project.tags && !project.log && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {project.tags.map((tag, tIdx) => (
                                                <span key={tIdx} className={`px-2 py-1 border border-${tag.theme} text-${tag.theme} text-[8px] font-label uppercase bg-${tag.theme}/10`}>
                                                    {tag.label}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className={`text-2xl ${project.titleGlow ? `text-glow-${project.titleGlow}` : ''} font-headline font-bold text-white leading-tight`}>
                                            {project.title}
                                        </h3>
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className={`text-${project.theme || 'primary'}`} aria-label={`Open ${project.title} in new tab`}>
                                                <span className="material-symbols-outlined text-xl">open_in_new</span>
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-slate-400 text-xs leading-relaxed mb-4 font-body">
                                        {project.description}
                                    </p>
                                    
                                    {project.metrics && (
                                        <div className="flex flex-wrap items-center gap-6">
                                            {project.metrics.map((metric, mIdx) => (
                                                <div key={mIdx} className="space-y-0.5">
                                                    <span className={`block text-xl font-black text-${metric.theme} font-headline`}>{metric.value}</span>
                                                    <span className={`text-[7px] font-label text-${metric.theme === 'primary' ? 'secondary' : 'primary'} uppercase tracking-widest`}>{metric.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {project.features && (
                                        <div className="flex flex-wrap gap-4">
                                            {project.features.map((feature, fIdx) => (
                                                <span key={fIdx} className={`flex items-center gap-2 text-${feature.theme} font-label text-[10px] uppercase tracking-widest`}>
                                                    <span className="material-symbols-outlined text-xs">{feature.icon}</span> {feature.label}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {project.tags && project.log && (
                                        <div className="flex flex-wrap gap-1.5 mt-3">
                                            {project.tags.map((tag, tIdx) => (
                                                <span key={tIdx} className="px-2 py-0.5 bg-surface-container border border-white/10 text-white text-[8px] font-label">
                                                    {tag.label}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
