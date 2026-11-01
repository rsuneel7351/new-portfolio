import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export const Backdrop = () => {
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 24, restDelta: 0.001 });
    const driftUp = useTransform(progress, [0, 1], ["0%", "-30%"]);
    const driftDown = useTransform(progress, [0, 1], ["0%", "30%"]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
            <motion.div style={{ y: driftUp }} className="glow glow-primary"></motion.div>
            <motion.div style={{ y: driftDown }} className="glow glow-secondary"></motion.div>
            <div className="grid-bg absolute inset-0"></div>
        </div>
    );
};
