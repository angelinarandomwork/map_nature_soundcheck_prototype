import { toFixedCoordinate } from "../../lib/formatters";
import { Box, Inline, Stack, Text } from "../../styles";
import type { SelectedLocationSectionProps } from "./types"

export const SelectedLocationSection = ({
    coordinates,
}: SelectedLocationSectionProps) => {
    if (!coordinates) return null

    return (
    <Box as="section" surface="transparent">
        <Stack space={6}>
            <Inline justify="between" align="center">
                <Text role="featureLabel">Selected location</Text>
            </Inline>
            <Text role="body">{toFixedCoordinate(coordinates.lat)}, {toFixedCoordinate(coordinates.lon)}</Text>
        </Stack>
    </Box>
    )
}
