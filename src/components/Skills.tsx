import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolio";
import { reveal, stagger, trackPointer, viewport } from "../lib/motion";
import { Icon } from "./Icon";
import { SectionHeading } from "./SectionHeading";

const splitReadout = (readout: string) => readout.split(", ");

export const Skills = () => {
    const { label, title, description, loadingText, items } = portfolioData.skills;
    const ticker = items.flatMap((skill) => splitReadout(skill.readout));

    return (
        <section className="relative py-24 md:py-36 overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
                    <div className="lg:sticky lg:top-32 lg:self-start">
                        <SectionHeading label={label} title={title} />
                        <motion.p variants={reveal} initial="hidden" whileInView="show" viewport={viewport} className="text-on-surface-variant mt-8 text-lg leading-relaxed">
                            {description}
                        </motion.p>
                        <div className="mt-8 tech-readout caret">{loadingText}</div>
                    </div>

                    <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport} className="grid sm:grid-cols-2 gap-5">
                        {items.map((skill) => (
                            <motion.article
                                key={skill.name}
                                variants={reveal}
                                onPointerMove={trackPointer}
                                className={`accent-${skill.theme} panel panel-lift spotlight p-6`}
                            >
                                <Icon name={skill.icon} className="w-8 h-8 text-(--accent-text) mb-4" />
                                <h3 className="font-headline font-bold tracking-wider text-white mb-4">{skill.name}</h3>
                                <ul className="flex flex-wrap gap-1.5">
                                    {splitReadout(skill.readout).map((entry) => (
                                        <li key={entry} className="chip">{entry}</li>
                                    ))}
                                </ul>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="marquee-mask mt-20 md:mt-28 overflow-hidden" aria-hidden="true">
                <div className="marquee">
                    {[...ticker, ...ticker].map((entry, idx) => (
                        <span key={idx} className="px-6 font-headline font-black text-2xl md:text-4xl text-secondary/15 whitespace-nowrap">
                            {entry}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};
