import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { portfolioData } from "../data/portfolio";
import { reveal, stagger, trackPointer, viewport } from "../lib/motion";
import { CountUp } from "./CountUp";
import { Icon } from "./Icon";
import { SectionHeading } from "./SectionHeading";

const Word = ({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0.22, 1]);
    return <motion.span style={{ opacity }}>{word} </motion.span>;
};

export const About = () => {
    const { sectionId, label, title, description, stats, nodes } = portfolioData.about;
    const copyRef = useRef<HTMLParagraphElement | null>(null);
    const { scrollYProgress } = useScroll({ target: copyRef, offset: ["start 88%", "end 62%"] });
    const words = description.split(" ");

    return (
        <section className="relative py-24 md:py-36" id="about">
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20">
                    <div className="relative">
                        <div className="absolute -left-2 -top-16 text-secondary/[0.06] text-[9rem] leading-none font-headline font-black select-none pointer-events-none" aria-hidden="true">{sectionId}</div>
                        <SectionHeading label={label} title={title} className="relative mb-10" />
                        <p ref={copyRef} className="relative text-lg md:text-xl text-on-background leading-relaxed border-l-2 border-primary/50 pl-6 md:pl-8">
                            {words.map((word, idx) => (
                                <Word key={idx} word={word} progress={scrollYProgress} range={[idx / words.length, (idx + 4) / words.length]} />
                            ))}
                        </p>
                    </div>

                    <motion.div variants={stagger(0.14)} initial="hidden" whileInView="show" viewport={viewport} className="grid gap-5 content-center">
                        {nodes.map((node) => (
                            <motion.article
                                key={node.id}
                                variants={reveal}
                                onPointerMove={trackPointer}
                                className={`accent-${node.theme} panel panel-lift spotlight p-6 md:p-8`}
                            >
                                <div className="flex items-start gap-5">
                                    <div className="shrink-0 grid place-items-center w-12 h-12 border border-(--accent)/40 bg-(--accent)/10 text-(--accent-text)">
                                        <Icon name={node.icon} className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="tech-readout mb-1.5">{node.id}</div>
                                        <h3 className="text-lg font-headline font-bold text-white mb-2 tracking-wide">{node.title}</h3>
                                        <p className="text-on-surface-variant text-[0.9375rem] leading-relaxed">{node.description}</p>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>

                <motion.dl variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="grid grid-cols-2 lg:grid-cols-4 mt-16 md:mt-24 border-y border-white/10">
                    {stats.map((stat) => (
                        <motion.div key={stat.label} variants={reveal} className="py-8 px-2 lg:px-6 lg:border-l first:border-l-0 border-white/10">
                            <dd><CountUp value={stat.value} className="block text-gradient font-headline font-black text-[clamp(1.5rem,3.2vw,2.75rem)] leading-none whitespace-nowrap" /></dd>
                            <dt className="tech-readout mt-3">{stat.label}</dt>
                        </motion.div>
                    ))}
                </motion.dl>
            </div>
        </section>
    );
};
