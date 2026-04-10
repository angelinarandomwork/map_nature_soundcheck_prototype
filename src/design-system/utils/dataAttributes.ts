type DataAttributeValue = string | number | boolean | null | undefined;

type DataAttributesInput = Record<string, DataAttributeValue>;

export const createDataAttributes = (
        attributes: DataAttributesInput
    ): Record<string, string> => {
    return Object.entries(attributes).reduce<Record<string, string>>(
        (result, [key, value]) => {
        if (value === null || value === undefined || value === false) {
            return result;
        }

        result[`data-${toKebabCase(key)}`] = value === true ? "true" : String(value);
        return result;
        },
        {}
    );
};

const toKebabCase = (value: string): string =>
    value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase();