import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolio";

export const Experience = () => {
    const { label, title, items } = portfolioData.experience;

    return (
        <section className="py-20 sm:py-32 bg-background" id="experience">
            <div className="max-w-4xl mx-auto px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 sm:mb-24"
                >
                    {/* Label — tighten letter-spacing on mobile so it doesn't overflow */}
                    <span className="text-secondary font-label text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.5em] block mb-4 px-2 break-words">
                        {label}
                    </span>

                    {/* Title — scale down on mobile */}
                    <h2 className="text-3xl sm:text-5xl font-headline font-black text-white leading-tight break-words">
                        {title}
                    </h2>
                </motion.div>

                {/* Timeline — shift line right on mobile to give more card space */}
                <div className="space-y-10 sm:space-y-16 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-primary before:via-secondary before:to-tertiary before:opacity-30">
                    {items.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative pl-14 sm:pl-16 group"
                        >
                            {/* Timeline dot */}
                            <div className={`absolute left-0 top-0 w-9 h-9 sm:w-10 sm:h-10 bg-black border border-${item.theme} flex items-center justify-center shadow-[0_0_15px_rgba(var(--color-${item.theme}),0.4)] transition-all group-hover:scale-125`}>
                                <div className={`w-2 h-2 bg-${item.theme}`}></div>
                            </div>

                            {/* Card */}
                            <div className={`glass-panel p-5 sm:p-8 ${item.theme === 'tertiary' ? 'border border-tertiary/30' : `neon-border-${item.theme}`} config-theme-${item.theme} relative`}>
                                {item.status && (
                                    <div className="absolute -top-3 right-4 sm:right-6 bg-primary text-white text-[8px] px-3 py-1 font-label tracking-widest">
                                        {item.status}
                                    </div>
                                )}

                                {/* Date */}
                                <span className={`text-${item.theme} font-label text-xs sm:text-sm tracking-widest`}>
                                    {item.date}
                                </span>

                                {/* Role — clamp on mobile */}
                                <h3 className="text-xl sm:text-2xl font-headline font-bold text-white mt-2 leading-snug">
                                    {item.role}
                                </h3>

                                {/* Company */}
                                <p className={`text-${item.theme === 'secondary' ? 'primary' : (item.theme === 'tertiary' ? 'on-surface-variant' : 'secondary')} font-label text-[10px] sm:text-xs uppercase mb-4 sm:mb-6 tracking-widest`}>
                                    {item.company}
                                </p>

                                {/* Description */}
                                <p className="text-on-surface-variant font-body leading-relaxed text-sm sm:text-base">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};