import type { MetricRowProps } from "./types";
import { Inline, Text } from "../../styles";

export const MetricRow = ({ label, value }: MetricRowProps) => (
    <Inline justify="between" align="center">
        <Text role="body" tone="secondary">{label}</Text>

        {typeof value === "string" || typeof value === "number" ? (
            <Text role="label">{value}</Text>
        ) : (
        value
        )}
    </Inline>
);
