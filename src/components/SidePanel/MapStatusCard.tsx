import type { MapStatusInfo } from "./types"
import { Card, Stack, Text } from "../../styles";

export const MapStatusCard = ({
    isLoadingMapPoints,
    proprietaryDataPointCount,
    pointLabel,
}: MapStatusInfo) => {
    return (
        <Card tone="elevated" padding="md">
            <Stack space={8}>
                <Text role="label" tone="muted">Map status</Text>
                <Text role="body">
                {isLoadingMapPoints
                    ? 'Loading proprietary markers…'
                    : `${proprietaryDataPointCount} proprietary ${pointLabel} ready`}
                </Text>
            </Stack>
        </Card>
    )
}