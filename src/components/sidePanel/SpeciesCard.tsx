import { Badge, Box, Card, Inline, Stack, Text } from "../../design-system";
import type { ProprietaryObservation } from "../../types/data";
import {
  formatConfidenceScore,
  formatUnixToDisplayDateTime,
} from "../../lib/formatters";
import type { JSX } from "react";

type SpeciesCardProps = {
  observation: ProprietaryObservation;
  imageUrl: string | null;
};

const getConfidenceTone = (
  confidence: number,
): "success" | "warning" | "info" => {
  if (confidence >= 12) return "success";
  return "warning";
};

export const SpeciesCard = ({
  observation,
  imageUrl,
}: SpeciesCardProps): JSX.Element => {
  return (
    <Card tone="elevated" padding="md">
      <Stack space={16}>
        <Inline align="start" space={12}>
          <Box
            as="div"
            radius="container"
            style={{
              width: 72,
              minWidth: 72,
              height: 72,
              overflow: "hidden",
              backgroundColor: "#d7e6e6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {imageUrl ? (
              <Box
                as="img"
                src={imageUrl}
                alt={observation.commonName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <Text
                role="label"
                tone="muted"
                style={{
                  textAlign: "center",
                  padding: 8,
                }}
              >
                No image
              </Text>
            )}
          </Box>

          <Box
            as="div"
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Stack space={8}>
              <Inline justify="between" align="start" space={8}>
                <Box
                  as="div"
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Text role="bodyLarge">{observation.commonName}</Text>
                </Box>
                <Badge tone={getConfidenceTone(observation.confidence)}>
                  {formatConfidenceScore(observation.confidence)}
                </Badge>
              </Inline>

              <Text role="body" tone="secondary">
                {observation.scientificName}
              </Text>
            </Stack>
          </Box>
        </Inline>

        <Stack space={10}>
          <Inline justify="between" align="centre">
            <Text role="body" tone="secondary">
              Observed at
            </Text>
            <Text role="label">
              {formatUnixToDisplayDateTime(observation.timestamp)}
            </Text>
          </Inline>

          <Inline justify="between" align="centre">
            <Text role="body" tone="secondary">
              File
            </Text>
            <Text role="label">{observation.fileName}</Text>
          </Inline>
        </Stack>
      </Stack>
    </Card>
  );
};
