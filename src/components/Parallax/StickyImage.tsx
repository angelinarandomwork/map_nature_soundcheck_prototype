import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { StickyImageProps } from "./types";
import "./parallax.css";

export const IMG_PADDING = 12;

export const StickyImage = ({ imgUrl }: StickyImageProps) => {
    const targetRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <motion.div
        ref={targetRef}
        className="sticky-image"
        style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: `calc(100vh - ${IMG_PADDING * 2}px)`,
            top: `${IMG_PADDING}px`,
            scale,
        }}
        >
        <motion.div
            className="sticky-image-overlay"
            style={{
            opacity,
            }}
        />
        </motion.div>
    );
};