import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const GLYPHS = "!<>-_/[]{}=+*^?#";
const DURATION = 900;

export const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
    const ref = useRef<HTMLSpanElement | null>(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px" });
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const node = ref.current;
        if (!node || !inView || reduceMotion) return;

        const start = performance.now();
        let frame = 0;
        const tick = (now: number) => {
            const progress = Math.min((now - start) / DURATION, 1);
            const solved = Math.floor(progress * text.length);
            node.textContent = text.slice(0, solved) + text.slice(solved).replace(/\S/g, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frame);
            node.textContent = text;
        };
    }, [inView, reduceMotion, text]);

    return <span ref={ref} className={className}>{text}</span>;
};
