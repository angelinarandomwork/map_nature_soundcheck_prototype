import type { JSX, ReactNode, RefObject } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import "../components/Parallax/style.css";

const IMAGE_PADDING = 16;

type SectionTone = "green" | "orange";

type ParallaxSectionProps = {
  imageUrl: string;
  eyebrow: string;
  heading: string;
  children: ReactNode;
  containerRef: RefObject<HTMLDivElement | null>;
  tone: SectionTone;
};

export const CitizenSciencePage = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="citizenScienceScrollShell">
      <div ref={containerRef} className="citizenScienceScroll">
        <div className="citizenScienceParallaxPage">
          <ParallaxSection
            containerRef={containerRef}
            tone="green"
            imageUrl="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=80"
            eyebrow="Citizen Science"
            heading="Turn raw bird recordings into useful observations"
          >
            <CitizenScienceIntro />
          </ParallaxSection>

          <ParallaxSection
            containerRef={containerRef}
            tone="orange"
            imageUrl="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
            eyebrow="iNaturalist"
            heading="Upload audio snippets and place them on the map"
          >
            <INaturalistContent />
          </ParallaxSection>

          <ParallaxSection
            containerRef={containerRef}
            tone="green"
            imageUrl="https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1600&q=80"
            eyebrow="eBird and Merlin"
            heading="Build a checklist and attach your own recordings"
          >
            <EBirdContent />
          </ParallaxSection>

          <OtherProjectsCard />
        </div>
      </div>
    </section>
  );
};

const ParallaxSection = ({
  imageUrl,
  eyebrow,
  heading,
  children,
  containerRef,
  tone,
}: ParallaxSectionProps): JSX.Element => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [220, -220]);
  const copyOpacity = useTransform(scrollYProgress, [0.18, 0.5, 0.82], [0, 1, 0]);

  const bodyY = useTransform(scrollYProgress, [0, 1], [120, -80]);
  const bodyOpacity = useTransform(scrollYProgress, [0.12, 0.3, 0.92], [0, 1, 1]);

  return (
    <section
      ref={sectionRef}
      className={`citizenScienceParallaxSection citizenScienceParallaxSection--${tone}`}
      style={{
        paddingLeft: `${IMAGE_PADDING}px`,
        paddingRight: `${IMAGE_PADDING}px`,
      }}
    >
      <div className="citizenScienceParallaxHero">
        <ParallaxImage imageUrl={imageUrl} containerRef={containerRef} />

        <motion.div
          className="citizenScienceParallaxOverlay"
          style={{
            y: copyY,
            opacity: copyOpacity,
          }}
        >
          <p className="citizenScienceParallaxEyebrow">{eyebrow}</p>
          <h2 className="citizenScienceParallaxHeading">{heading}</h2>
        </motion.div>

        <motion.div
          className="citizenScienceParallaxBody citizenScienceParallaxBodyFloating"
          style={{
            y: bodyY,
            opacity: bodyOpacity,
          }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

type ParallaxImageProps = {
  imageUrl: string;
  containerRef: RefObject<HTMLDivElement | null>;
};

const ParallaxImage = ({
  imageUrl,
  containerRef,
}: ParallaxImageProps): JSX.Element => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const mediaOpacity = useTransform(scrollYProgress, [0, 1], [0.18, 0.24]);
  // const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 0.95]);
const overlayOpacity = useTransform(
  scrollYProgress,
  [0.2, 0.25, 1],
  [0.98, 1, 1]
);  return (
    <motion.div
      ref={targetRef}
      className="citizenScienceParallaxImage"
      style={{
        height: `calc(100vh - ${IMAGE_PADDING * 2}px)`,
        top: `${IMAGE_PADDING}px`,
        scale,
      }}
    >
      <motion.div
        className="citizenScienceParallaxImageMedia"
        style={{
          backgroundImage: `url(${imageUrl})`,
          opacity: mediaOpacity,
        }}
      />

      <motion.div
        className="citizenScienceParallaxImageOverlay"
        style={{
          opacity: overlayOpacity,
        }}
      />
    </motion.div>
  );
};


const CitizenScienceIntro = (): JSX.Element => {
  return (
    <div className="citizenScienceContentGrid">
      <div className="citizenScienceContentLead">
        <h3 className="citizenScienceContentTitle">Why contribute recordings?</h3>
        <p className="citizenScienceContentText">
          Raw bird recordings can become useful citizen science records. They can
          be uploaded from your recorder, your phone, or tools such as Merlin Bird ID.
          Once attached to a documented observation, they help strengthen public datasets.
        </p>
      </div>

      <div className="citizenScienceInfoCardGroup">
        <article className="citizenScienceInfoCard">
          <div className="citizenScienceInfoCardIcon">
            <MicRoundedIcon fontSize="inherit" />
          </div>
          <div className="citizenScienceInfoCardBody">
            <h4>What to collect</h4>
            <p>
              Keep the raw audio snippets, timestamps, coordinates, and the species
              suggestion from your model or CSV output.
            </p>
          </div>
        </article>

        <article className="citizenScienceInfoCard">
          <div className="citizenScienceInfoCardIcon">
            <PlaceRoundedIcon fontSize="inherit" />
          </div>
          <div className="citizenScienceInfoCardBody">
            <h4>Why it matters</h4>
            <p>
              A recording with time and place metadata is much more useful than a
              standalone species label. It can support mapping, verification, and future review.
            </p>
          </div>
        </article>

        <article className="citizenScienceInfoCard">
          <div className="citizenScienceInfoCardIcon">
            <CloudUploadRoundedIcon fontSize="inherit" />
          </div>
          <div className="citizenScienceInfoCardBody">
            <h4>Where to submit</h4>
            <p>
              The most relevant places here are iNaturalist, eBird, and Macaulay Library,
              with Merlin-related workflows depending on how the record was created.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

const INaturalistContent = (): JSX.Element => {
  return (
    <div className="citizenScienceContentGrid">
      <div className="citizenScienceContentLead">
        <h3 className="citizenScienceContentTitle">iNaturalist workflow</h3>
        <p className="citizenScienceContentText">
          This is the simplest route for turning individual audio snippets into mapped observations.
        </p>

        <div className="citizenScienceActionRow">
          <a
            className="citizenScienceButton"
            href="https://www.inaturalist.org/"
            target="_blank"
            rel="noreferrer"
          >
            Open iNaturalist


            <OpenInNewRoundedIcon fontSize="small" />

          </a>

          <a
            className="citizenScienceButton citizenScienceButtonSecondary"
            href="https://www.inaturalist.org/observations?subview=map"
            target="_blank"
            rel="noreferrer"
          >
            View map
            <MapRoundedIcon fontSize="small" />
          </a>
        </div>
      </div>

      <div className="citizenScienceStepList">
        <article className="citizenScienceStepCard">
          <span className="citizenScienceStepNumber">01</span>
          <div>
            <h4>Upload the audio</h4>
            <p>
              Log in to iNaturalist and use the green Upload button. Drag your
              <code>.wav</code> snippets onto the page. Each file becomes its own observation card.
            </p>
          </div>
        </article>

        <article className="citizenScienceStepCard">
          <span className="citizenScienceStepNumber">02</span>
          <div>
            <h4>Add the species name</h4>
            <p>
              Enter the common name predicted by your AI. iNaturalist may suggest the
              same bird automatically through its own identification system.
            </p>
          </div>
        </article>

        <article className="citizenScienceStepCard">
          <span className="citizenScienceStepNumber">03</span>
          <div>
            <h4>Set time and place</h4>
            <p>
              Add the exact timestamp from your CSV and pin the coordinates on the map,
              for example <code>12.9695, 77.6198</code>.
            </p>
          </div>
        </article>

        <article className="citizenScienceStepCard">
          <span className="citizenScienceStepNumber">04</span>
          <div>
            <h4>Submit observations</h4>
            <p>
              Review the cards, confirm the metadata, and submit them as separate observations.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

const EBirdContent = (): JSX.Element => {
  return (
    <div className="citizenScienceContentGrid">
      <div className="citizenScienceContentLead">
        <h3 className="citizenScienceContentTitle">eBird, Macaulay Library, and Merlin</h3>
        <p className="citizenScienceContentText">
          eBird is better suited to checklist-based birding records, while Macaulay Library
          is the media repository attached to that ecosystem.
        </p>

        <div className="citizenScienceActionColumn">
          <a
            className="citizenScienceTextLink"
            href="https://forum.inaturalist.org/t/importing-merlin-ids-to-inaturalist/37120/4"
            target="_blank"
            rel="noreferrer"
          >
            Merlin to iNaturalist discussion
          </a>
        </div>
      </div>

      <div className="citizenScienceInfoCardGroup">
        <article className="citizenScienceInfoCard citizenScienceInfoCardNoIcon">
          <div className="citizenScienceInfoCardBody">
            <h4>Create an eBird account</h4>
            <p>
              Set up a free eBird account first so you can create checklists and attach media.
            </p>
          </div>
        </article>

        <article className="citizenScienceInfoCard citizenScienceInfoCardNoIcon">
          <div className="citizenScienceInfoCardBody">
            <h4>Use an incidental checklist</h4>
            <p>
              For a single recording event or opportunistic encounter, submit an incidental
              checklist for the location and date of the recording.
            </p>
          </div>
        </article>

        <article className="citizenScienceInfoCard citizenScienceInfoCardNoIcon">
          <div className="citizenScienceInfoCardBody">
            <h4>Add species from your CSV</h4>
            <p>
              Use your CSV output to add the detected bird species to the checklist carefully.
            </p>
          </div>
        </article>

        <article className="citizenScienceInfoCard citizenScienceInfoCardNoIcon">
          <div className="citizenScienceInfoCardBody">
            <h4>Upload recordings to Macaulay Library</h4>
            <p>
              Attach your audio snippets through the eBird checklist so the supporting media is
              linked to the observation record properly.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

const OtherProjectsCard = (): JSX.Element => {
  return (
    <section className="citizenScienceSupportSection">
      <div className="citizenScienceSupportInner">
        <div>
          <h3 className="citizenScienceContentTitle">Other citizen science projects</h3>
          <p className="citizenScienceContentText">
            If you want a broader example of large-scale public participation in science,
            Zooniverse is a well-known platform with many active projects.
          </p>
        </div>

        <a
          className="citizenScienceButton"
          href="https://www.zooniverse.org/"
          target="_blank"
          rel="noreferrer"
          style={{background: 'var(--peach-strong)', color: 'white'}}
        >
          Zooniverse
          <OpenInNewRoundedIcon fontSize="small" />
        </a>
      </div>
    </section>
  );
};