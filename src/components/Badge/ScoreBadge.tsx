import { toScore } from "../../lib/formatters";
import { getBiodiversityScoreLabel } from "./scoreBand";
import { Badge, Card, Inline, Stack, Text } from "../../styles";
import type { Score } from "../../types/components";
import { getBiodiversityScoreBand } from "../../scores/getBiodiversityScoreBand";

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
  const badgeColor =
    badgeTone === 'success'
      ? 'var(--green-strong)'
      : badgeTone === 'warning'
        ? 'var(--amber-strong)'
        : 'var(--reddish-strong)'

  return (
    <Card tone="brutalist" padding="md" style= {{
      background: `var(--color-state-${badgeTone})`, 
      borderColor: `${badgeColor}`}}>
      <Stack space={4}>
        <Text role="caption" tone="muted">
          {label}
        </Text>

        <Inline justify="between" align="center">
          <Text role="cardTitle">{toScore(value)}</Text>
          <Badge tone={badgeTone}>{scoreLabel}</Badge>
        </Inline>
      </Stack>
    </Card>
  );
};