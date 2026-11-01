import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "../data/portfolio";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { reveal, trackPointer, viewport } from "../lib/motion";
import { Icon } from "./Icon";
import { ProjectVisual } from "./ProjectVisual";
import { SectionHeading } from "./SectionHeading";

const { label, title, readout, items } = portfolioData.projects;

// Scroll distance spent per pixel of horizontal travel
const SCROLL_RATIO = 0.8;

const ProjectCard = ({ project, index, progress }: { project: (typeof items)[number]; index: number; progress?: MotionValue<number> }) => {
    const idle = useMotionValue(0);
    const step = 1 / (items.length - 1);
    const shift = useTransform(progress ?? idle, [(index - 1) * step, (index + 1) * step], ["-4%", "4%"]);

    return (
        <article onPointerMove={trackPointer} className={`accent-${project.theme} panel spotlight grid lg:grid-cols-[1.05fr_1fr] h-full`}>
            <div className="hud-tl"></div><div className="hud-tr"></div><div className="hud-bl"></div><div className="hud-br"></div>

            <div className="flex flex-col justify-center gap-4 p-6 md:p-8 lg:p-10 min-w-0">
                <div className="tech-readout">{project.log}</div>
                <div className="flex items-start justify-between gap-4">
                    <h3 className="font-headline font-black text-white text-[clamp(1.25rem,2.4vw,2.1rem)] leading-[1.12] tracking-tight">
                        {project.title}
                    </h3>
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="shrink-0 text-(--accent-text) opacity-70 hover:opacity-100 transition-opacity" aria-label={`Open ${project.title} in new tab`}>
                            <ArrowUpRight className="w-7 h-7" aria-hidden="true" />
                        </a>
                    )}
                </div>
                <p className="text-on-surface-variant text-[0.9375rem] leading-relaxed">{project.description}</p>

                {project.metrics && (
                    <div className="flex flex-wrap gap-8">
                        {project.metrics.map((metric) => (
                            <div key={metric.label} className={`accent-${metric.theme}`}>
                                <span className="block text-2xl font-black font-headline text-(--accent-text)">{metric.value}</span>
                                <span className="tech-readout">{metric.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                {project.features && (
                    <ul className="flex flex-col gap-2">
                        {project.features.map((feature) => (
                            <li key={feature.label} className={`accent-${feature.theme} flex items-center gap-2.5 text-(--accent-text) font-label text-xs tracking-wider`}>
                                <Icon name={feature.icon} className="w-4 h-4" /> {feature.label}
                            </li>
                        ))}
                    </ul>
                )}

                {project.tags && (
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span key={tag.label} className={`chip accent-${tag.theme}`}>{tag.label}</span>
                        ))}
                    </div>
                )}
            </div>

            <ProjectVisual log={project.log} shift={progress ? shift : undefined} />
        </article>
    );
};

const PinnedProjects = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const counterRef = useRef<HTMLSpanElement | null>(null);
    const distance = useMotionValue(0);
    const [scrollLength, setScrollLength] = useState(0);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const measure = () => {
            const travel = Math.max(track.offsetWidth - window.innerWidth, 0);
            distance.set(travel);
            setScrollLength(travel * SCROLL_RATIO);
        };

        const observer = new ResizeObserver(measure);
        observer.observe(track);
        window.addEventListener("resize", measure);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [distance]);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
    const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.35, restDelta: 0.0005 });
    const x = useTransform([progress, distance], ([latest, travel]: number[]) => -latest * travel);

    useMotionValueEvent(progress, "change", (latest) => {
        if (!counterRef.current) return;
        const current = Math.min(Math.round(latest * (items.length - 1)) + 1, items.length);
        counterRef.current.textContent = String(current).padStart(2, "0");
    });

    return (
        <section ref={sectionRef} className="relative" style={{ height: `calc(100vh + ${scrollLength}px)` }} id="projects">
            <div className="sticky top-0 h-screen flex flex-col justify-center gap-5 overflow-hidden pt-16">
                <div className="w-full max-w-7xl mx-auto px-8">
                    <div className="flex justify-between items-end gap-8">
                        <SectionHeading label={label} title={title} className="[&_.section-title]:text-[clamp(1.75rem,3vw,2.75rem)]" />
                        <div className="tech-readout text-right whitespace-pre-line">{readout}</div>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                        <div className="font-label text-xs text-slate-400 tabular-nums">
                            <span ref={counterRef} className="text-secondary">01</span> / {String(items.length).padStart(2, "0")}
                        </div>
                        <div className="relative flex-1 h-px bg-white/10">
                            <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-gradient-to-r from-primary via-secondary to-tertiary" />
                        </div>
                    </div>
                </div>

                <motion.div ref={trackRef} style={{ x }} className="flex gap-6 w-max will-change-transform px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
                    {items.map((project, idx) => (
                        <div key={project.id} className="w-[min(78vw,1000px)] h-[min(calc(100vh-15rem),540px)] shrink-0">
                            <ProjectCard project={project} index={idx} progress={progress} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const StackedProjects = () => (
    <section className="relative py-20" id="projects">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <SectionHeading label={label} title={title} className="mb-10" />
            <div className="grid gap-6">
                {items.map((project, idx) => (
                    <motion.div key={project.id} variants={reveal} initial="hidden" whileInView="show" viewport={viewport}>
                        <ProjectCard project={project} index={idx} />
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export const Projects = () => {
    const pinned = useMediaQuery("(min-width: 1024px)");
    return pinned ? <PinnedProjects /> : <StackedProjects />;
};
