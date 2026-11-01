import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { ease } from "../lib/motion";

export const CountUp = ({ value, className }: { value: string; className?: string }) => {
    const ref = useRef<HTMLSpanElement | null>(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px" });
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const match = value.match(/^(\d+)(.*)$/);
        const node = ref.current;
        if (!node || !match || !inView || reduceMotion) return;

        const [, digits, suffix] = match;
        const controls = animate(0, Number(digits), {
            duration: 1.8,
            ease,
            onUpdate: (latest) => {
                node.textContent = `${Math.round(latest)}${suffix}`;
            },
        });

        return () => controls.stop();
    }, [inView, reduceMotion, value]);

    return <span ref={ref} className={className}>{value}</span>;
};
