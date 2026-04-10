import { Box, Card, Inline, Stack, Text } from "../../design-system";
import styles from "./MapLegend.module.css";

export const MapLegend = () => {
  return (
    <Card  padding="md" style={{ 
      maxWidth: 240, 
      backgroundColor: '#e0f7f7b0',
      border: 'var(--border-default)',
      boxShadow: 'var(--shadow-floating)',}}>
      <Stack space={12}>
        <Text role="featureLabel">Biodiversity bands</Text>

        <Text role="body" tone="secondary">
          What the scores mean...
        </Text>

        <Stack space={4}>
          <Inline justify="between" align="centre">
            <Text role="caption" tone="secondary">
              Low
            </Text>
            <span className={`${styles.swatch} ${styles.low}`} />
          </Inline>

          <Inline justify="between" align="centre">
            <Text role="caption" tone="secondary">
              Moderate
            </Text>
            <span className={`${styles.swatch} ${styles.medium}`} />
          </Inline>

          <Inline justify="between" align="centre">
            <Text role="caption" tone="secondary">
              High
            </Text>
            <span className={`${styles.swatch} ${styles.high}`} />
          </Inline>
        </Stack>
      </Stack>
    </Card>
  );
};