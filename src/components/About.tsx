import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolio";

export const About = () => {
    const { sectionId, label, title, description, stats, nodes } = portfolioData.about;

    return (
        <section className="py-32 bg-background border-t border-secondary/10" id="about">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex-1 space-y-10 relative"
                    >
                        <div className="absolute -left-8 top-0 text-secondary/10 text-9xl font-headline font-black select-none">{sectionId}</div>
                        <div className="relative">
                            <span className="text-secondary font-label text-xs uppercase tracking-[0.5em] block mb-4">{label}</span>
                            <h2 className="text-5xl md:text-6xl font-headline font-bold text-white leading-tight">{title}</h2>
                        </div>
                        <p className="text-xl text-on-surface-variant leading-relaxed font-body border-l-2 border-primary/40 pl-8">
                            {description}
                        </p>
                        <div className="grid grid-cols-2 gap-4 tech-readout">
                            {stats.map((stat, idx) => (
                                <div key={idx}>{stat.label}: {stat.value}</div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="flex-1 grid grid-cols-1 gap-8 w-full">
                        {nodes.map((node, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: idx * 0.2 }}
                                className={`glass-panel p-10 relative group ${node.theme === 'tertiary' ? 'border border-tertiary/40' : `neon-border-${node.theme}`} overflow-hidden`}
                            >
                                <div className="hud-tl"></div><div className="hud-br"></div>
                                <div className="absolute top-2 right-4 tech-readout opacity-30">{node.id}</div>
                                <div className="flex items-center gap-6">
                                    <div className={`p-4 bg-${node.theme}/10 text-${node.theme} border border-${node.theme}/40 shadow-[0_0_15px_rgba(var(--color-${node.theme}),0.3)]`}>
                                        <span className="material-symbols-outlined">{node.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-headline font-bold text-white mb-2 tracking-wider">{node.title}</h3>
                                        <p className="text-on-surface-variant text-sm font-body">{node.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
