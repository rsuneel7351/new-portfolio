import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { portfolioData } from "../data/portfolio";
import { ease, reveal, trackPointer, viewport } from "../lib/motion";
import { SectionHeading } from "./SectionHeading";

const highlightNumbers = (text: string) =>
    text.split(/(\d[\d,]*[+%]?)/).map((part, idx) =>
        idx % 2 ? <strong key={idx} className="font-semibold text-(--accent-text)">{part}</strong> : part
    );

export const Experience = () => {
    const { label, title, items } = portfolioData.experience;
    const railRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 72%", "end 62%"] });
    const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

    return (
        <section className="relative py-24 md:py-36" id="experience">
            <div className="max-w-5xl mx-auto px-5 sm:px-8">
                <SectionHeading label={label} title={title} className="mb-14 md:mb-20" />

                <div ref={railRef} className="relative grid gap-8 md:gap-12">
                    <div className="absolute left-[11px] md:left-[232px] top-2 bottom-2 w-px bg-white/10">
                        <motion.div style={{ scaleY: progress }} className="absolute inset-0 origin-top bg-gradient-to-b from-primary via-secondary to-tertiary" />
                    </div>

                    {items.map((item) => (
                        <motion.div
                            key={item.date}
                            variants={reveal}
                            initial="hidden"
                            whileInView="show"
                            viewport={viewport}
                            className={`accent-${item.theme} relative grid md:grid-cols-[200px_1fr] gap-x-16 pl-10 md:pl-0`}
                        >
                            <motion.span
                                variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { duration: 0.7, delay: 0.25, ease } } }}
                                className="absolute left-[5px] md:left-[226px] top-2 w-[13px] h-[13px] rounded-full bg-(--accent) ring-4 ring-background"
                            ></motion.span>

                            <div className="md:text-right md:pt-0.5 mb-3 md:mb-0">
                                <div className="font-label text-xs tracking-wider text-(--accent-text)">{item.date}</div>
                                {item.status && (
                                    <div className="mt-2 tech-readout">{item.status}</div>
                                )}
                            </div>

                            <article onPointerMove={trackPointer} className="panel panel-lift spotlight p-6 md:p-8">
                                <h3 className="text-lg md:text-xl font-headline font-bold text-white leading-snug">{item.role}</h3>
                                <p className="font-label text-xs uppercase tracking-wider text-slate-400 mt-1.5 mb-4">{item.company}</p>
                                <p className="text-on-surface-variant leading-relaxed">{highlightNumbers(item.description)}</p>
                            </article>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
