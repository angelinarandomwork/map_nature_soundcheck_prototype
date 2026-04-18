import { MetricRow } from "./MetricRow";
import type { SourceSummaryProps } from "./types";
import { Badge, Card, Inline, Stack, Text } from "../../styles";

export const SourceSummaryList = ({ summaries }: SourceSummaryProps) => (
    <Stack space={12}>
        <Text role="label" tone="muted">Source summaries</Text>

        {summaries.length === 0 ? (
        <Card tone="elevated" padding="md">
            <Text role="body" tone="secondary">No external source returned observations for this location and time range.</Text>
        </Card>
        ) : (
        summaries.map((summary) => (
            <Card tone="elevated" padding="md" key={summary.source}>
                <Stack space={8}>
                    <Inline justify="between" align="center">
                        <Text role="bodyLarge">{summary.source}</Text>
                        <Badge tone="info">{summary.observationCount} observations</Badge>
                    </Inline>
                    <MetricRow
                        label="Unique species"
                        value={summary.uniqueSpeciesCount}
                    />
                </Stack>
            </Card>
        ))
        )}
    </Stack>
)
