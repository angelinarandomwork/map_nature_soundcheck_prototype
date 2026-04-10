import { type ComponentPropsWithoutRef, type ComponentPropsWithRef, type ElementType } from "react";


export type AsProp<T extends ElementType> = {
    as?: T;
};

export type PropsToOmit<T extends ElementType, Props> = keyof (AsProp<T> & Props);

export type PolymorphicRef<T extends ElementType> =
    ComponentPropsWithRef<T>["ref"];

export type PolymorphicComponentProps<
    T extends ElementType,
    Props = {},
> = Props &
    AsProp<T> &
    Omit<ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>;

export type PolymorphicComponentPropsWithRef<
    T extends ElementType,
    Props = {},
> = PolymorphicComponentProps<T, Props> & {
    ref?: PolymorphicRef<T>;
};