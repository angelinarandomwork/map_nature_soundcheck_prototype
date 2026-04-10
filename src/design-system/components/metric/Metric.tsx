import { Text } from "../text/Text";
import { Stack } from "../stack/Stack";
import { classNames } from "../../utils/classNames";

type MetricProps = {
    label: string;
    value: string | number;
    delta?: string;
    tone?: "default" | "success" | "warning" | "danger";
    className?: string;
};

export const Metric = ({
    label,
    value,
    delta,
    tone = "default",
    className,
    }: MetricProps) => {
    return (
        <Stack space={8} className={classNames(className)}>
        <Text role="label" tone="muted">
            {label}
        </Text>
        <Text role="subheading">
            {value}
        </Text>
        {delta && (
            <Text
            role="caption"
            className={tone !== "default" ? `stateText-${tone}` : undefined}
            >
            {delta}
            </Text>
        )}
        </Stack>
    );
};