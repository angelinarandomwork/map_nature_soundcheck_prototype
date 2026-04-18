import {
  useEffect,
  useRef,
  useState,
  type JSX,
  type SyntheticEvent,
} from "react";
import { Box, Tab, Tabs } from "@mui/material";
import FunFacts from "../features/funFactsScroll/FunFacts";
import { WordleGame } from "../features/wordle/WordleGame";
import TabSection from "../components/Tabs/TabSection";
import { QuizGame } from "../features/quiz/QuizGame";
import { CrosswordGame } from "../features/crossword/CrosswordGame";
import "../components/Tabs/Tabs.css";

const CURSOR_SIZE = 24;
const OUTLINE_PADDING = 10;

const tabItems = [
  "Fun Facts",
  "Nature Wordle",
  "Crossword Puzzle",
  "Quiz",
] as const;

const resetCursorStyles = (cursorElement: HTMLDivElement) => {
  cursorElement.style.opacity = "0";
  cursorElement.style.width = `${CURSOR_SIZE}px`;
  cursorElement.style.height = `${CURSOR_SIZE}px`;
  cursorElement.style.borderRadius = `${CURSOR_SIZE}px`;
};

const moveCursorToElement = ({
  containerElement,
  cursorElement,
  targetElement,
}: {
  containerElement: HTMLDivElement;
  cursorElement: HTMLDivElement;
  targetElement: HTMLElement;
}) => {
  const targetRect = targetElement.getBoundingClientRect();
  const containerRect = containerElement.getBoundingClientRect();

  const width = targetRect.width + OUTLINE_PADDING;
  const height = targetRect.height + OUTLINE_PADDING;
  const left = targetRect.left - containerRect.left + targetRect.width / 2;
  const top = targetRect.top - containerRect.top + targetRect.height / 2;

  cursorElement.style.opacity = "1";
  cursorElement.style.width = `${width}px`;
  cursorElement.style.height = `${height}px`;
  cursorElement.style.borderRadius = "calc(var(--radius-4) + 4px)";
  cursorElement.style.left = `${left}px`;
  cursorElement.style.top = `${top}px`;
};

export const LearningPage = (): JSX.Element => {
  const [tabValue, setTabValue] = useState(0);
  const tabsShellRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const containerElement = tabsShellRef.current;
    const cursorElement = cursorRef.current;

    if (!containerElement || !cursorElement) return;

    const tabElements = Array.from(
      containerElement.querySelectorAll<HTMLElement>('[role="tab"]'),
    );

    if (tabElements.length === 0) return;

    const handleEnter = (event: Event) => {
      const targetElement = event.currentTarget;

      if (!(targetElement instanceof HTMLElement)) return;

      moveCursorToElement({
        containerElement,
        cursorElement,
        targetElement,
      });
    };

    const handleLeaveContainer = () => {
      resetCursorStyles(cursorElement);
    };

    tabElements.forEach((tabElement) => {
      tabElement.addEventListener("mouseenter", handleEnter);
      tabElement.addEventListener("focus", handleEnter);
    });

    containerElement.addEventListener("mouseleave", handleLeaveContainer);

    const selectedTabElement = tabElements[tabValue];

    if (selectedTabElement) {
      moveCursorToElement({
        containerElement,
        cursorElement,
        targetElement: selectedTabElement,
      });
    } else {
      resetCursorStyles(cursorElement);
    }

    return () => {
      tabElements.forEach((tabElement) => {
        tabElement.removeEventListener("mouseenter", handleEnter);
        tabElement.removeEventListener("focus", handleEnter);
      });

      containerElement.removeEventListener("mouseleave", handleLeaveContainer);
    };
  }, [tabValue]);

  return (
    <section className="contentPage">
      <div className="contentPageInner">
        <h1 style={{marginBottom: "10px"}}>Learn the Science</h1>
      </div>

      <Box
        ref={tabsShellRef}
        className="animatedTabs"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="solution details tabs"
          variant="scrollable"
          scrollButtons={false}
          className="animatedTabsList"
          sx={{
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          {tabItems.map((label) => (
            <Tab
              key={label}
              label={label}
              disableRipple
              className="animatedTab"
              sx={{
                "&.Mui-selected": {
                  color: "var(--white)",
                },
              }}
            />
          ))}
        </Tabs>

        <div
          ref={cursorRef}
          className="animatedTabsCursor"
          aria-hidden="true"
        />
      </Box>

      <TabSection value={tabValue} index={0}>
        <Box sx={{ paddingTop: 1, paddingRight: 2, paddingLeft: 2 }}>
          <FunFacts />
        </Box>
      </TabSection>

      <TabSection value={tabValue} index={1}>
        <Box sx={{ padding:2 }}>
          <p style={{display: 'flex', justifyContent: 'center', marginBottom: 10}}>
              
    Guess the hidden 5-letter word in up to 6 tries.
  </p>

  <p style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>Use the clues from each guess to find the answer. </p>
          <WordleGame />
        </Box>
      </TabSection>

      <TabSection value={tabValue} index={2}>
        <Box sx={{ paddingTop: 1, paddingRight: 2, paddingLeft: 2 }}>
          <CrosswordGame />
        </Box>
      </TabSection>

      <TabSection value={tabValue} index={3}>
        <Box sx={{ paddingTop: 1, paddingRight: 2, paddingLeft: 2 }}>
          

  <QuizGame />

        </Box>
      </TabSection>
    </section>
  );
};
