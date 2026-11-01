import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Download } from "lucide-react";
import { portfolioData } from "../data/portfolio";
import { ease, reveal, stagger } from "../lib/motion";
import { SignalField } from "./SignalField";

const titleLine = {
    hidden: { y: "108%" },
    show: { y: 0, transition: { duration: 1.2, ease } },
};

const Magnetic = ({ className, children, ...link }: { className: string; children: ReactNode; href: string; target?: string; rel?: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

    const handleMove = (event: PointerEvent<HTMLAnchorElement>) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.28);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div variants={reveal}>
            <motion.a {...link} style={{ x: springX, y: springY }} onPointerMove={handleMove} onPointerLeave={handleLeave} className={`${className} w-full sm:w-auto`}>
                {children}
            </motion.a>
        </motion.div>
    );
};

export const Hero = () => {
    const { status, title, subtitle, highlight, tags, primaryAction, resumeAction, secondaryAction } = portfolioData.hero;
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
    const contentY = useTransform(progress, [0, 1], [0, -120]);
    const contentOpacity = useTransform(progress, [0, 0.7], [1, 0]);
    const fieldY = useTransform(progress, [0, 1], [0, 90]);

    return (
        <section ref={sectionRef} className="relative min-h-svh flex items-center pt-28 pb-24 overflow-hidden" id="hero">
            <motion.div style={{ y: fieldY }} className="absolute inset-0">
                <SignalField className="absolute inset-0 w-full h-full" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/15 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"></div>

            <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8">
                <motion.div variants={stagger(0.12, 0.15)} initial="hidden" animate="show">
                    <motion.div variants={reveal} className="inline-flex items-center gap-3 px-4 py-2 mb-8 border border-secondary/30 bg-surface-container/70 relative">
                        <span className="pulse-dot w-2 h-2 rounded-full bg-tertiary"></span>
                        <span className="text-[0.6875rem] font-label uppercase tracking-[0.22em] text-secondary">{status}</span>
                    </motion.div>

                    <h1 aria-label={title} className="font-headline font-black tracking-tight leading-[1.02] text-white text-[clamp(2.25rem,12vw,8.5rem)] mb-8">
                        <span aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
                            <motion.span variants={titleLine} className="block">{subtitle}</motion.span>
                        </span>
                        <span aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
                            <motion.span variants={titleLine} className="block text-gradient">{highlight}</motion.span>
                        </span>
                    </h1>

                    <motion.ul variants={stagger(0.07)} className="flex flex-wrap gap-2.5 mb-10">
                        {tags.map((tag) => (
                            <motion.li key={tag.text} variants={reveal} className={`chip accent-${tag.type} bg-background text-xs px-3 py-1.5`}>
                                {tag.text}
                            </motion.li>
                        ))}
                    </motion.ul>

                    <motion.div variants={stagger(0.08)} className="flex flex-col sm:flex-row flex-wrap gap-4">
                        <Magnetic className="btn btn-primary" href={primaryAction.href}>
                            {primaryAction.label}
                        </Magnetic>
                        <Magnetic className="btn btn-ghost" href={resumeAction.href}>
                            <Download className="w-4 h-4" aria-hidden="true" />
                            {resumeAction.label}
                        </Magnetic>
                        <Magnetic className="btn btn-ghost border-white/20 text-slate-300 hover:text-white" href={secondaryAction.href}>
                            {secondaryAction.label}
                        </Magnetic>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 1 }}
                className="absolute bottom-6 right-5 sm:right-8 xl:right-[max(2rem,calc((100vw-80rem)/2+2rem))] hidden sm:flex items-center gap-3"
            >
                <div className="tech-readout">SCROLL_TO_DESCEND</div>
                <div className="scroll-cue w-px h-12 bg-gradient-to-b from-secondary to-transparent"></div>
            </motion.div>
        </section>
    );
};
