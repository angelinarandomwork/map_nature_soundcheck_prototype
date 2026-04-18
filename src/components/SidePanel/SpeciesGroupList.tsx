import { Stack, Card, Text } from "../../styles";
import { SpeciesGroupCard } from "../SpeciesCards/SpeciesGroupCard";
import type { SpeciesGroupListInfo } from "./types";

export const SpeciesGroupList = ({
    groups,
    imageMap,
    loadingMap,
    emptyMessage,
}: SpeciesGroupListInfo) => (
    <Stack space={12}>
    <Text role="label" tone="muted">Species groups</Text>

    {groups.length === 0 ? (
        <Card tone="elevated" padding="md">
            <Text role="body" tone="secondary">
            {emptyMessage}
            </Text>
        </Card>
    ) : (
        groups.map((group) => (
            <SpeciesGroupCard
            key={group.scientificName}
            group={group}
            imageUrl={imageMap[group.scientificName] ?? null}
            isImageResolving={loadingMap[group.scientificName] ?? false}
            />
        ))
    )}
    </Stack>
)
