import { motion } from "framer-motion";
import { ease, reveal, stagger, viewport } from "../lib/motion";
import { ScrambleText } from "./ScrambleText";

export const SectionHeading = ({ label, title, className = "" }: { label: string; title: string; className?: string }) => (
    <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className={className}>
        <motion.div variants={reveal} className="flex items-center gap-4 mb-5">
            <span className="h-px w-10 bg-secondary/60"></span>
            <ScrambleText text={label} className="eyebrow" />
        </motion.div>
        <h2 className="section-title">
            <span className="block overflow-hidden pb-1">
                <motion.span
                    className="block"
                    variants={{
                        hidden: { y: "105%" },
                        show: { y: 0, transition: { duration: 1, ease } },
                    }}
                >
                    {title}
                </motion.span>
            </span>
        </h2>
    </motion.div>
);
