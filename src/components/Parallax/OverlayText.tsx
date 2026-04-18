import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { OverlayCopyProps } from "./types";

export const OverlayText = ({ subheading, heading }: OverlayCopyProps) => {
    const targetRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
    const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

    return (
        <motion.div
            ref={targetRef}
            className="overlay-copy"
            style={{y, opacity}}
        >
        <p className="overlay-subheading">{subheading}</p>
        <p className="overlay-heading">{heading}</p>
        </motion.div>
    );
};