
import { OverlayText } from "./OverlayText";
import { IMG_PADDING, StickyImage } from "./StickyImage";
import type { TextParallaxContentProps } from "./types";
import "./style.css";

export const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: TextParallaxContentProps) => {
  return (
    <div
      className="text-parallax-section"
      style={{
        paddingLeft: `${IMG_PADDING}px`,
        paddingRight: `${IMG_PADDING}px`,
      }}
    >
      <div className="text-parallax-hero">
        <StickyImage imgUrl={imgUrl} />
        <OverlayText heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};
