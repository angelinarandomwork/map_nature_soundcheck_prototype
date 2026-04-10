import { toScore } from "../../lib/formatters";
import {
  getBiodiversityScoreBand,
  getBiodiversityScoreLabel,
} from "./scoreBand";
import { Badge, Card, Inline, Stack, Text } from "../../design-system";
import type { Score } from "../../types/components";

export const getScoreBadgeTone = (
  scoreBand: ReturnType<typeof getBiodiversityScoreBand>
): "success" | "warning" | "danger" | "accent" => {
  switch (scoreBand) {
    case "high":
      return "success";
    case "medium":
      return "warning";
    case "low":
      return "danger";
    default:
      return "accent";
  }
};

export const ScoreBadge = ({ label, value }: Score) => {
  const scoreBand = getBiodiversityScoreBand(value);
  const scoreLabel = getBiodiversityScoreLabel(value);
  const badgeTone = getScoreBadgeTone(scoreBand);
const badgeColor = badgeTone === "success" ? `var(--color-text-success)` : `var(--color-text-danger)`
console.log(badgeColor)
  return (
    <Card tone="brutalist" padding="md" style= {{
      backgroundColor: `var(--color-state-${badgeTone})`, 
      borderColor: `${badgeColor}`}}>
      <Stack space={4}>
        <Text role="caption" tone="muted">
          {label}
        </Text>

        <Inline justify="between" align="centre">
          <Text role="cardTitle">{toScore(value)}</Text>
          <Badge tone={badgeTone}>{scoreLabel}</Badge>
        </Inline>
      </Stack>
    </Card>
  );
};