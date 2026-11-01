import type { PointerEvent } from "react";
import type { Variants } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;

export const viewport = { once: true, margin: "-10% 0px" } as const;

export const reveal: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export const stagger = (gap = 0.08, delay = 0): Variants => ({
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

// Writes straight to CSS variables so pointer tracking never re-renders React.
export const trackPointer = (event: PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    target.style.setProperty("--my", `${event.clientY - rect.top}px`);
};
