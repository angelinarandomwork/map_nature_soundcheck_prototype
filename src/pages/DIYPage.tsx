import type { JSX } from "react";
import { AccordionSection } from "../components/Accordian/AccordionSection";
import {
  Step3PythonExtract,
  Step4PythonExtract,
  Step5PythonExtract,
  Step6PythonExtract,
} from "../features/pythonExtracts/PythonExtracts";
import {
  buildPreparationSection,
  hardwareSection,
  wiringSection,
} from "../features/lists";
import { HardwareList } from "../features/lists/Hardware";
import {
  ListSectionStepper,
  WiringSectionStepper,
} from "../features/lists/Stepper";
import dhruvDIY from "../assets/dhruvDIY.webp";
import whiteCheekedBarbetClock from "../assets/white-cheeked_barbet_clock.png";
import { AccordionItem } from "../components/Accordian/AccordionItem";

const step6Info = (
  <div>
    <p style={{ margin: "10px" }}>
      <strong>
        (NDSI) = (Biophony - Anthrophony) / (Biophony + Anthrophony)
      </strong>
    </p>
    <p style={{ marginLeft: "20px", marginRight: "20px" }}>
      -1 → environment is dominated by human noise such as traffic or machinery.
    </p>
    <p style={{ marginLeft: "20px", marginRight: "20px" }}>
      +1 → environment is dominated by nature such as birds or insects.
    </p>
    <p style={{ marginLeft: "20px", marginRight: "20px" }}>
      0 → equal balance of both.
    </p>
  </div>
);

export const DIYSetupAccordion = () => {
  return (
    <AccordionSection
      title="DIY Hardware Setup"
      intro={
        <p>
          Step by step process for recording and analysing your own acoustic
          data.
        </p>
      }
    >
      <AccordionItem title="Step 0: Equipment">
        <HardwareList section={hardwareSection} />
      </AccordionItem>
      <AccordionItem title="Step 1: Soldering">
        <ListSectionStepper section={buildPreparationSection} />
      </AccordionItem>
      <AccordionItem title="Step 2: Power and Wiring Setup">
        <WiringSectionStepper section={wiringSection} />
      </AccordionItem>
      <AccordionItem title="Step 3: Arduino IDE Code">
        <Step3PythonExtract />
      </AccordionItem>
      <AccordionItem title="Step 4: Bird Classification Code">
        <Step4PythonExtract />
      </AccordionItem>
      <AccordionItem title="Step 5: Visualisations">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "58%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <p>
              Use this script to generate visual summaries from your own bird
              detection CSV. Your file should contain at least a{" "}
              <code>Timestamp</code> column and a <code>Common_Name</code>{" "}
              column.
            </p>

            <p>
              Before running the script, update <code>CSV_FILE</code> to point
              to your own detections file and change <code>OUTPUT_DIR</code> to
              the folder where you want the generated plots saved.
            </p>

            <p>
              The script converts timestamps into hourly activity, removes
              species with fewer than 3 detections, creates a daily heatmap, and
              then produces a 24-hour clock plot for each remaining species.
            </p>

            <p>
              The example below shows the style of radial activity plot produced
              for a single species.
            </p>

            <div
              style={{
                border: "var(--border-green)",
                borderRadius: "8px",

                padding: "12px",
                background: "var(--greenish-gradient)",
              }}
            >
              <p style={{ marginTop: 0, marginBottom: "8px", fontWeight: 600 }}>
                Minimum CSV structure
              </p>
              <pre
                style={{
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: "14px",
                  lineHeight: 1.5,
                }}
              >
                {`Timestamp,Common_Name
2026-04-13 04:52:10+0530,White-cheeked Barbet
2026-04-13 05:03:41+0530,White-cheeked Barbet
2026-04-13 12:14:08+0530,Red-whiskered Bulbul`}
              </pre>
            </div>

            <figure style={{ margin: 0 }}>
              <img
                src={whiteCheekedBarbetClock}
                alt="Example 24-hour bird activity clock plot for White-cheeked Barbet"
                style={{
                  width: "100%",
                  maxWidth: "520px",
                  height: "auto",
                  border: "var(--border-green)",
                  borderRadius: "8px",
                  display: "block",
                }}
              />
              <figcaption
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  color: "var(--color-text-secondary)",
                }}
              >
                Example output: a 24-hour activity clock showing when a species
                is most active.
              </figcaption>
            </figure>

            <Step5PythonExtract />
          </div>
        </div>
      </AccordionItem>
      <AccordionItem title="Step 6: Normalised Difference Soundscape Index (NDSI) score">
        <p>{step6Info}</p>
        <Step6PythonExtract />
      </AccordionItem>
    </AccordionSection>
  );
};

export const DIYPage = (): JSX.Element => {
  return (
    <section className="contentPage">
      <div className="contentPageInner">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "24px",
          }}
        >
          <div style={{ flex: 2, minWidth: 0 }}>
            <DIYSetupAccordion />
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop: "5%",
              marginLeft: "10%",
            }}
          >
            <img
              src={dhruvDIY}
              alt="DIY hardware setup"
              style={{
                maxWidth: "100%",
                height: "auto",
                scale: 1,
                border: "var(--border-peach)",
                borderRadius: "8px",
                padding: "8px",
              }}
            />
            <img
              src={whiteCheekedBarbetClock}
              alt="Example visualisation using the data"
              style={{
                maxWidth: "100%",
                height: "auto",
                scale: 1,
                marginTop: '20px',
                border: "var(--border-peach)",
                borderRadius: "8px",
                padding: "8px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
